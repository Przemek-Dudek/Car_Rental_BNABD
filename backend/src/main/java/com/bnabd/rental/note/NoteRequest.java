package com.bnabd.rental.note;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoteRequest {
    private Integer id;
    private Integer reservationId;
    private Integer authorId;
    private String content;
    private String createdDateTime;
}
