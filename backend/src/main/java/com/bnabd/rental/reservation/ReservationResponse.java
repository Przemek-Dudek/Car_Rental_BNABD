package com.bnabd.rental.reservation;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationResponse {
    @JsonProperty("id")
    private Integer id;
    @JsonProperty("customer_id")
    private Integer customerId;
    @JsonProperty("car_id")
    private Integer carId;
    @JsonProperty("start_date")
    private String startDate;
    @JsonProperty("end_date")
    private String endDate;
    @JsonProperty("total_price")
    private Double totalPrice;
    @JsonProperty("status")
    private String status;
}