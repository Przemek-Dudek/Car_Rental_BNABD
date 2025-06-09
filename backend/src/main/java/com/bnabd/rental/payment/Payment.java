package com.bnabd.rental.payment;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue
    private Integer id;

    private Integer payerId;
    private Integer reservationId;
    private String paymentDate;
    private Double paymentAmount;
    private PaymentStatus status;
}

enum PaymentStatus {
    PENDING,
    PAID,
    FAILED,
    CANCELLED
}
