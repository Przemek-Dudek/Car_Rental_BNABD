package com.bnabd.rental.car;

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
@Table(name = "car")
public class Car {
    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;

    private int year;
    private String plateNumber;
    private CarStatus status;
    private String endOfInspectionDate;
    private String endOfInsuranceDate;
}