package com.bnabd.rental.model;

import com.bnabd.rental.car.Car;
import com.bnabd.rental.reservation.Reservation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "model")
public class Model {
    @Id
    @GeneratedValue
    private Integer id;

    @OneToMany(mappedBy = "model", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Car> cars;
    @OneToMany(mappedBy = "model", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reservation> reservations;

    private String brand;
    private String model;
    private CarSegment segment;
    private String imageLink;
    private Double pricePerDay;
    private Double maxDailyDistance;
    private Double penaltyForExceedingKilometers;
}

enum CarSegment {
    A, B, C, D, E, F, J, M
}
