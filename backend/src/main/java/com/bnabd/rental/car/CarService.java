package com.bnabd.rental.car;

import com.bnabd.rental.reservation.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarService {
    private final CarRepository carRepository;

    public CarResponse addCar(CarRequest request) throws Exception {
        Car car = Car.builder()
                .year(request.getYear())
                .plateNumber(request.getPlateNumber())
                .status(CarStatus.AVAILABLE)
                .endOfInspectionDate(request.getEndOfInspectionDate())
                .endOfInsuranceDate(request.getEndOfInsuranceDate())
                .build();

        if (!validateCar(car)) {
            throw new Exception("Car validation failed");
        }

        Car savedCar = carRepository.save(car);
        return mapToCarResponse(savedCar);
    }

    public CarResponse editCar(CarRequest request) {
        Car car = carRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("Car not found with id: " + request.getId()));

        car.setYear(request.getYear());
        car.setPlateNumber(request.getPlateNumber());
        car.setEndOfInspectionDate(request.getEndOfInspectionDate());
        car.setEndOfInsuranceDate(request.getEndOfInsuranceDate());

        Car updatedCar = carRepository.save(car);
        return mapToCarResponse(updatedCar);
    }

    public CarResponse getById(Integer carId) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car not found with id: " + carId));

        return mapToCarResponse(car);
    }

    public CarResponse deleteCar(CarRequest request) {
        Car car = carRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("Car not found with id: " + request.getId()));
        carRepository.delete(car);

        return mapToCarResponse(car);
    }

    public List<CarResponse> getAllCars() {
        return carRepository.findAll().stream()
                .map(this::mapToCarResponse)
                .collect(Collectors.toList());
    }

    private CarResponse mapToCarResponse(Car car) {
        return CarResponse.builder()
                .id(car.getId())
                .year(String.valueOf(car.getYear()))
                .plateNumber(car.getPlateNumber())
                .status(car.getStatus().name())
                .endOfInspectionDate(car.getEndOfInspectionDate())
                .endOfInsuranceDate(car.getEndOfInsuranceDate())
                .build();
    }

    private boolean validateCar(Car car) {
        if (!validateDate(car.getEndOfInspectionDate()) || !validateDate(car.getEndOfInsuranceDate())) {
            return false;
        }

        LocalDate inspectionDate = LocalDate.parse(car.getEndOfInspectionDate());
        LocalDate insuranceDate = LocalDate.parse(car.getEndOfInsuranceDate());

        return !inspectionDate.isAfter(insuranceDate);
    }

    private boolean validateDate(String date) {
        String regex = "\\d{4}-\\d{2}-\\d{2}";

        if (!date.matches(regex)) {
            return false;
        }

        try {
            LocalDate.parse(date);
            return true;
        } catch (DateTimeParseException e) {
            return false;
        }
    }
}
