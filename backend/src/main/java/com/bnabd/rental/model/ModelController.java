package com.bnabd.rental.model;

import com.bnabd.rental.car.CarResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rental/models")
@RequiredArgsConstructor
public class ModelController {
    ModelService modelService;

    @GetMapping("/available")
    public ResponseEntity<List<CarResponse>> getAvailableCars(@RequestBody ModelRequest request) {
        return ResponseEntity.ok(modelService.getAvailableCars(request));
    }
}
