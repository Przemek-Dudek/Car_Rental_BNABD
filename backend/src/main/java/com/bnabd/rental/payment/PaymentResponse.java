package com.bnabd.rental.payment;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponse {
    @JsonProperty("id")
    private Integer id;
    @JsonProperty("reservation_id")
    private Integer reservationId;
    @JsonProperty("payment_date")
    private String paymentDate;
    @JsonProperty("payment_amount")
    private Double paymentAmount;
    @JsonProperty("status")
    private String status;
}