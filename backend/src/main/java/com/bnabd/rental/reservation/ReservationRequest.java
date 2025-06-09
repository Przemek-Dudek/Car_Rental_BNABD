package com.bnabd.rental.reservation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationRequest {
    private Integer id;
    private Integer customerId;
    private Integer carId;
    private String startDate;
    private String endDate;
    private Double totalPrice;
    private ReservationStatus status;
}
