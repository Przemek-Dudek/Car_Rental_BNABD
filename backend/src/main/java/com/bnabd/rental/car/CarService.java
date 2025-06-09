package com.bnabd.rental.car;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarService {
    private final CarRepository carRepository;

    public CarResponse addCar(CarRequest request) {
        Car car = Car.builder()
                .brand(request.getBrand())
                .model(request.getModel())
                .year(request.getYear())
                .plateNumber(request.getPlateNumber())
                .pricePerDay(request.getPricePerDay())
                .status(CarStatus.AVAILABLE)
                .segment(request.getSegment())
                .build();

        Car savedCar = carRepository.save(car);

        return mapToCarResponse(savedCar);
    }

    public CarResponse editCar(CarRequest request) {
        Car car = carRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("Car not found with id: " + request.getId()));

        car.setBrand(request.getBrand());
        car.setModel(request.getModel());
        car.setYear(request.getYear());
        car.setPlateNumber(request.getPlateNumber());
        car.setPricePerDay(request.getPricePerDay());
        car.setSegment(request.getSegment());

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
                .brand(car.getBrand())
                .model(car.getModel())
                .year(String.valueOf(car.getYear()))
                .plateNumber(car.getPlateNumber())
                .pricePerDay(String.valueOf(car.getPricePerDay()))
                .status(car.getStatus().name())
                .segment(car.getSegment().name())
                .build();
    }
}
