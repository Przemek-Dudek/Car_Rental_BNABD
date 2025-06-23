package com.bnabd.rental.model;

import com.bnabd.rental.car.Car;
import com.bnabd.rental.car.CarResponse;
import com.bnabd.rental.car.CarStatus;
import com.bnabd.rental.reservation.ReservationStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModelService {
    private final ModelRepository modelRepository;

    public List<CarResponse> getAvailableCars(ModelRequest request) {
        Optional<Model> optionalModel = modelRepository.findById(request.getModelId());
        if (optionalModel.isEmpty()) {
            return new ArrayList<>();
        }
        Model model = optionalModel.get();

        LocalDate requestStart = LocalDate.parse(request.getStartDate());
        LocalDate requestEnd = LocalDate.parse(request.getEndDate());

        List<Car> availableCars = model.getCars().stream()
                .filter(car -> car.getStatus() == CarStatus.AVAILABLE)
                .toList();

        List<Car> finalAvailableCars = availableCars.stream()
                .filter(car -> {
                    boolean isReserved = model.getReservations().stream()
                            .filter(reservation -> reservation.getCar() != null
                                    && reservation.getCar().getId().equals(car.getId())
                                    && reservation.getStatus() != ReservationStatus.CANCELLED)
                            .anyMatch(reservation -> {
                                LocalDate resStart = LocalDate.parse(reservation.getStartDate());
                                LocalDate resEnd = LocalDate.parse(reservation.getEndDate());
                                return !(resEnd.isBefore(requestStart) || resStart.isAfter(requestEnd));
                            });
                    return !isReserved;
                })
                .toList();

        return finalAvailableCars.stream()
                .map(car -> CarResponse.builder()
                        .id(car.getId())
                        .year(String.valueOf(car.getYear()))
                        .plateNumber(car.getPlateNumber())
                        .status(String.valueOf(car.getStatus()))
                        .build())
                .collect(Collectors.toList());
    }
}
