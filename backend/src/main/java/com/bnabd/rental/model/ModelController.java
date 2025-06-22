package com.bnabd.rental.model;

import com.bnabd.rental.car.CarResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rental/models")
@RequiredArgsConstructor
public class ModelController {
    private final ModelService modelService;

    @PostMapping("/available")
    public ResponseEntity<List<CarResponse>> getAvailableCars(@RequestBody ModelRequest request) {
        return ResponseEntity.ok(modelService.getAvailableCars(request));
    }
}
