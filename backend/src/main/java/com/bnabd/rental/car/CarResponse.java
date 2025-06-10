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
    @JsonProperty("id")
    private Integer id;
    @JsonProperty("brand")
    private String brand;
    @JsonProperty("model")
    private String model;
    @JsonProperty("year")
    private String year;
    @JsonProperty("plate_number")
    private String plateNumber;
    @JsonProperty("price_per_day")
    private String pricePerDay;
    @JsonProperty("status")
    private String status;
    @JsonProperty("segment")
    private String segment;
    @JsonProperty("image_link")
    private String imageLink;
    @JsonProperty("end_of_inspection_date")
    private String endOfInspectionDate; // New field
    @JsonProperty("end_of_insurance_date")
    private String endOfInsuranceDate;  // New field
}
