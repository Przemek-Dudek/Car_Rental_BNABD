package com.bnabd.rental.review;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {
    @JsonProperty("id")
    private Integer id;
    @JsonProperty("reservation_id")
    private Integer reservationId;
    @JsonProperty("rating")
    private Integer rating;
    @JsonProperty("created_date_time")
    private String createdDateTime;
}