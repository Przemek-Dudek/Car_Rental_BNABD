package com.bnabd.rental.reservation;

import com.bnabd.rental.car.Car;
import com.bnabd.rental.model.Model;
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
@Table(name = "reservation")
public class Reservation {
    @Id
    @GeneratedValue
    private Integer id;

    private Integer userId;

    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    private String startDate;
    private String endDate;
    private Double totalDistanceCovered;

    private Double totalPrice;
    private ReservationStatus status;
}
