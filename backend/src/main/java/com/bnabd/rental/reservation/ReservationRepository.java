package com.bnabd.rental.reservation;

import com.bnabd.rental.payment.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findByCustomerId(Integer customerId);
    List<Reservation> findByCarId(Integer carId);
}
