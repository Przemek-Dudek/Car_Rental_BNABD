package com.bnabd.rental.reservation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findByUserId(Integer userId);
    List<Reservation> findByModelId(Integer modelId);
}
