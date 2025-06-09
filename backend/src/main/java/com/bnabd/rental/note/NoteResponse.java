package com.bnabd.rental.note;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoteResponse {
    @JsonProperty("id")
    private Integer id;
    @JsonProperty("reservation_id")
    private Integer reservationId;
    @JsonProperty("author_id")
    private Integer authorId;
    @JsonProperty("content")
    private String content;
    @JsonProperty("created_date_time")
    private String createdDateTime;
}