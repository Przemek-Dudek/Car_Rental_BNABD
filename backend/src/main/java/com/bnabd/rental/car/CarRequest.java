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
    private Integer id;
    private int year;
    private String plateNumber;
    private Double pricePerDay;
    private CarStatus status;
    private String imageLink;
    private String endOfInspectionDate;
    private String endOfInsuranceDate;
}
