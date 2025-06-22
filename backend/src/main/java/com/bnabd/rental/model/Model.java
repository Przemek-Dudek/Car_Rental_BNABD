package com.bnabd.rental.model;

import com.bnabd.rental.car.Car;
import com.bnabd.rental.reservation.Reservation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;
    @ManyToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

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
