package com.bnabd.rental.car;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CarResponse {
    CarResponse(String response) {
        errorMessage = response;
    }

    @JsonProperty("id")
    private Integer id;
    @JsonProperty("year")
    private String year;
    @JsonProperty("plate_number")
    private String plateNumber;
    @JsonProperty("status")
    private String status;
    @JsonProperty("modelId")
    private String modelId;
    @JsonProperty("modelName")
    private String modelName;
    @JsonProperty("segment")
    private String segment;
    @JsonProperty("end_of_inspection_date")
    private String endOfInspectionDate;
    @JsonProperty("end_of_insurance_date")
    private String endOfInsuranceDate;
    @JsonProperty("error_message")
    private String errorMessage;
}
