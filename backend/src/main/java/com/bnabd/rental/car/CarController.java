package com.bnabd.rental.car;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rental/cars")
@RequiredArgsConstructor
public class CarController {
    private final CarService carService;

    @PostMapping
    public ResponseEntity<CarResponse> addCar(@RequestBody CarRequest car) {
        return ResponseEntity.ok(carService.addCar(car));
    }

    @PutMapping
    public ResponseEntity<CarResponse> updateCar(@RequestBody CarRequest carRequest) {
        return ResponseEntity.ok(carService.editCar(carRequest));
    }

    @DeleteMapping
    public ResponseEntity<CarResponse> deleteCar(@RequestBody CarRequest carRequest) {
        return ResponseEntity.ok(carService.deleteCar(carRequest));
    }

    @GetMapping
    public ResponseEntity<CarResponse> getCarById(@RequestParam Integer carId) {
        return ResponseEntity.ok(carService.getById(carId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CarResponse>> getAllCars() {
        return ResponseEntity.ok(carService.getAllCars());
    }
}
