package com.bnabd.rental.model;

import com.bnabd.rental.car.CarResponse;
import com.bnabd.rental.car.CarStatus;
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

        if (model.getCar().getStatus() != CarStatus.AVAILABLE) {
            return new ArrayList<>();
        }

        if (model.getReservation() != null) {
            LocalDate resStart = LocalDate.parse(model.getReservation().getStartDate());
            LocalDate resEnd = LocalDate.parse(model.getReservation().getEndDate());
            if (!(resEnd.isBefore(requestStart) || resStart.isAfter(requestEnd))) {
                return new ArrayList<>();
            }
        }

        CarResponse response = CarResponse.builder()
                .id(model.getCar().getId())
                .year(String.valueOf(model.getCar().getYear()))
                .plateNumber(model.getCar().getPlateNumber())
                .status(String.valueOf(model.getCar().getStatus()))
                .build();

        return List.of(response);
    }
}
