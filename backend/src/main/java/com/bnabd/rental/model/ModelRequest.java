package com.bnabd.rental.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModelRequest {
    private Integer modelId;
    private String startDate;
    private String endDate;
}
