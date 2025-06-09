package com.bnabd.rental.review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequest {
    private Integer id;
    private Integer reservationId;
    private Integer rating;
    private String createdDateTime;
}
