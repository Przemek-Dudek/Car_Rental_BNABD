package com.bnabd.rental.car;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CarRequest {
    private String brand;
    private String model;
    private int year;
    private String plateNumber;
    private Double pricePerDay;
    private CarStatus status;
    private CarSegment segment;
}
