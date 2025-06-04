package com.bnabd.rental.car;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "car")
public class Car {
    @Id
    @GeneratedValue
    private Integer id;

    private String brand;
    private String model;
    private int year;
    private String plateNumber;
    private Double pricePerDay;
    private CarStatus status;
    private CarSegment segment;
}

enum CarStatus {
    AVAILABLE,
    UNAVAILABLE
}

enum CarSegment {
    A, B, C, D, E, F, J, M
}
