package com.bnabd.rental.payment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequest {
    private Integer id;
    private Integer payerId;
    private Integer reservationId;
    private String paymentDate;
    private Double paymentAmount;
    private PaymentStatus status;
}
