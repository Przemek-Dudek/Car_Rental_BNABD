package com.bnabd.rental.payment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    List<Payment> findByPayerId(Integer payerId);
    List<Payment> findByReservationId(Integer reservationId);
}
