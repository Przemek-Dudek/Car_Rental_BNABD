package com.bnabd.rental.reservation;

import com.bnabd.rental.car.Car;
import com.bnabd.rental.car.CarRepository;
import com.bnabd.rental.car.CarStatus;
import com.bnabd.rental.model.Model;
import com.bnabd.rental.model.ModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final ModelRepository modelRepository;
    private final CarRepository carRepository;

    public ReservationResponse addReservation(ReservationRequest request) {
        // Retrieve the model.
        System.out.println(request);
        Model model = modelRepository.findById(request.getModelId())
                .orElseThrow(() -> new IllegalArgumentException("Model not found with id: " + request.getModelId()));

        // Parse the requested date range.
        LocalDate requestStart = LocalDate.parse(request.getStartDate());
        LocalDate requestEnd = LocalDate.parse(request.getEndDate());

        if (requestStart.isAfter(requestEnd)) {
            throw new IllegalArgumentException("Start date must be before end date.");
        }

        // Find the first available car from this model that is marked as AVAILABLE and has no overlapping reservations.
        Optional<Car> availableCar = model.getCars().stream()
                .filter(car -> car.getStatus() == CarStatus.AVAILABLE)
                .filter(car -> {
                    // Instead of relying solely on model.getReservations(), query the reservation repository
                    // for all reservations for this car that aren't cancelled.
                    List<Reservation> overlappingReservations = reservationRepository.findAll().stream()
                            .filter(reservation -> reservation.getCar() != null
                                    && reservation.getCar().getId().equals(car.getId())
                                    && reservation.getStatus() != ReservationStatus.CANCELLED)
                            .filter(reservation -> {
                                LocalDate resStart = LocalDate.parse(reservation.getStartDate());
                                LocalDate resEnd = LocalDate.parse(reservation.getEndDate());
                                // Check for an overlap.
                                return !(resEnd.isBefore(requestStart) || resStart.isAfter(requestEnd));
                            })
                            .toList();
                    return overlappingReservations.isEmpty();
                })
                .filter(car -> {
                    LocalDate inspectionEnd = LocalDate.parse(car.getEndOfInspectionDate());
                    LocalDate insuranceEnd = LocalDate.parse(car.getEndOfInsuranceDate());
                    return inspectionEnd.isAfter(requestEnd) && insuranceEnd.isAfter(requestEnd);
                })
                .findFirst();

        if (availableCar.isEmpty()) {
            throw new IllegalStateException("No available car found for model "
                    + model.getBrand() + " " + model.getModel() + " in the requested date range.");
        }

        // Build and save the reservation.
        Reservation reservation = Reservation.builder()
                .model(model)
                .car(availableCar.get())
                .userId(request.getCustomerId())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .totalPrice(request.getTotalPrice())
                .status(request.getStatus())
                .build();

        Reservation savedReservation = reservationRepository.save(reservation);
        return mapToReservationResponse(savedReservation);
    }

    public ReservationResponse editReservation(ReservationRequest request) {
        // Fetch the existing reservation.
        Reservation reservation = reservationRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found with id: " + request.getId()));

        // Retrieve the model.
        Model model = modelRepository.findById(request.getModelId())
                .orElseThrow(() -> new IllegalArgumentException("Model not found with id: " + request.getModelId()));

        LocalDate requestStart = LocalDate.parse(request.getStartDate());
        LocalDate requestEnd = LocalDate.parse(request.getEndDate());

        if (requestStart.isAfter(requestEnd)) {
            throw new IllegalArgumentException("Start date must be before end date.");
        }

        // Try to keep the current car if possible.
        Car currentCar = reservation.getCar();
        boolean currentCarSuitable = currentCar != null
                && currentCar.getStatus() == CarStatus.AVAILABLE
                && reservationRepository.findAll().stream()
                .filter(r -> !r.getId().equals(reservation.getId()))
                .filter(r -> r.getCar() != null && r.getCar().getId().equals(currentCar.getId())
                        && r.getStatus() != ReservationStatus.CANCELLED)
                .noneMatch(r -> {
                    LocalDate resStart = LocalDate.parse(r.getStartDate());
                    LocalDate resEnd = LocalDate.parse(r.getEndDate());
                    return !(resEnd.isBefore(requestStart) || resStart.isAfter(requestEnd));
                });

        if (!currentCarSuitable) {
            // If the current car is not available for the updated period, search for another.
            Optional<Car> availableCar = model.getCars().stream()
                    .filter(car -> car.getStatus() == CarStatus.AVAILABLE)
                    .filter(car -> {
                        // Query for overlapping reservations for this car.
                        List<Reservation> overlappingReservations = reservationRepository.findAll().stream()
                                .filter(r -> !r.getId().equals(reservation.getId()))
                                .filter(r -> r.getCar() != null && r.getCar().getId().equals(car.getId())
                                        && r.getStatus() != ReservationStatus.CANCELLED)
                                .filter(r -> {
                                    LocalDate resStart = LocalDate.parse(r.getStartDate());
                                    LocalDate resEnd = LocalDate.parse(r.getEndDate());
                                    return !(resEnd.isBefore(requestStart) || resStart.isAfter(requestEnd));
                                })
                                .collect(Collectors.toList());
                        return overlappingReservations.isEmpty();
                    })
                    .findFirst();

            if (availableCar.isEmpty()) {
                throw new IllegalStateException("No available car found for model "
                        + model.getBrand() + " " + model.getModel() + " in the updated date range.");
            }
            reservation.setCar(availableCar.get());
        }

        // Update rest of the reservation fields.
        reservation.setModel(model);
        reservation.setUserId(request.getCustomerId());
        reservation.setStartDate(request.getStartDate());
        reservation.setEndDate(request.getEndDate());
        reservation.setTotalPrice(request.getTotalPrice());
        reservation.setStatus(request.getStatus());

        Reservation updatedReservation = reservationRepository.save(reservation);
        return mapToReservationResponse(updatedReservation);
    }

    public ReservationResponse getById(Integer reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found with id: " + reservationId));

        return mapToReservationResponse(reservation);
    }

    public ReservationResponse deleteReservation(ReservationRequest request) {
        Reservation reservation = reservationRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found with id: " + request.getId()));

        reservationRepository.delete(reservation);
        return mapToReservationResponse(reservation);
    }

    public List<ReservationResponse> getByCustomerId(Integer customerId) {
        List<Reservation> reservations = reservationRepository.findByUserId(customerId);
        return reservations.stream()
                .map(this::mapToReservationResponse)
                .collect(Collectors.toList());
    }

    public List<ReservationResponse> getByModelId(Integer modelId) {
        List<Reservation> reservations = reservationRepository.findByModelId(modelId);
        return reservations.stream()
                .map(this::mapToReservationResponse)
                .collect(Collectors.toList());
    }

    private ReservationResponse mapToReservationResponse(Reservation reservation) {
        return ReservationResponse.builder()
                .id(reservation.getId())
                .modelId(reservation.getModel().getId())
                .carId(reservation.getCar().getId())
                .customerId(reservation.getUserId())
                .startDate(reservation.getStartDate())
                .endDate(reservation.getEndDate())
                .totalPrice(reservation.getTotalPrice())
                .status(String.valueOf(reservation.getStatus()))
                .build();
    }
}