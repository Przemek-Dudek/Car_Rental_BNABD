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
        // Parse the requested date range.
        System.out.println(request);
        LocalDate requestStart = LocalDate.parse(request.getStartDate());
        LocalDate requestEnd = LocalDate.parse(request.getEndDate());

        // Retrieve models.
        List<Model> models;
        if (request.getModelId() != null) {
            // Get the specified model.
            Optional<Model> optionalModel = modelRepository.findById(request.getModelId());
            if (optionalModel.isEmpty()) {
                return new ArrayList<>();
            }
            models = List.of(optionalModel.get());
        } else {
            // If no modelId is provided, get all models.
            models = modelRepository.findAll();
        }

        // If a segment filter is provided (and not empty), only retain models with the matching segment.
        if (request.getSegment() != null && !request.getSegment().trim().isEmpty()) {
            models = models.stream()
                    .filter(m -> m.getSegment().toString().equals(request.getSegment()))
                    .collect(Collectors.toList());
        }

        // Aggregate available cars from all selected models.
        List<Car> finalAvailableCars = models.stream()
                // For each model, get its cars.
                .flatMap(model -> model.getCars().stream()
                        // Only consider cars whose status is AVAILABLE.
                        .filter(car -> car.getStatus() == CarStatus.AVAILABLE)
                        // And check that there is no overlapping reservation for this car.
                        .filter(car -> {
                            boolean isReserved = model.getReservations().stream()
                                    .filter(reservation -> reservation.getCar() != null
                                            && reservation.getCar().getId().equals(car.getId())
                                            && reservation.getStatus() != ReservationStatus.CANCELLED)
                                    .anyMatch(reservation -> {
                                        LocalDate resStart = LocalDate.parse(reservation.getStartDate());
                                        LocalDate resEnd = LocalDate.parse(reservation.getEndDate());
                                        // There is an overlap if the reservation period intersects the requested period.
                                        return !(resEnd.isBefore(requestStart) || resStart.isAfter(requestEnd));
                                    });
                            return !isReserved;
                        }))
                .collect(Collectors.toList());

        // Map the eligible Car entities to CarResponse DTOs.
        return finalAvailableCars.stream()
                .map(car -> CarResponse.builder()
                        .id(car.getId())
                        .year(String.valueOf(car.getYear()))
                        .modelId(String.valueOf(car.getModel().getId()))
                        .modelName(car.getModel().getModel())
                        .segment(String.valueOf(car.getModel().getSegment()))
                        .plateNumber(car.getPlateNumber())
                        .status(String.valueOf(car.getStatus()))
                        .build())
                .collect(Collectors.toList());
    }
}
