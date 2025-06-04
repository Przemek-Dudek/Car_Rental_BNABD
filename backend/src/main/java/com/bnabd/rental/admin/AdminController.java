package com.bnabd.rental.admin;

import com.bnabd.rental.car.CarRequest;
import com.bnabd.rental.car.CarResponse;
import com.bnabd.rental.car.CarService;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final CarService carService; // ✅ Inject CarService

    @GetMapping
    @PreAuthorize("hasAuthority('admin:read')")
    public String get() {
        return "GET:: admin controller";
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin:create')")
    @Hidden
    public String post() {
        return "POST:: admin controller";
    }

    @PutMapping
    @PreAuthorize("hasAuthority('admin:update')")
    @Hidden
    public String put() {
        return "PUT:: admin controller";
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('admin:delete')")
    @Hidden
    public String delete() {
        return "DELETE:: admin controller";
    }

    @PostMapping("/cars")
    @PreAuthorize("hasAuthority('admin:create')")
    public ResponseEntity<CarResponse> addCar(@RequestBody CarRequest request) {
        return ResponseEntity.ok(carService.addCar(request));
    }
}