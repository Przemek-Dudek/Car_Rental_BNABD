package com.bnabd.rental.reservation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;

    public ReservationResponse addReservation(ReservationRequest request) {
        Reservation reservation = Reservation.builder()
                .modelId(request.getModelId())
                .userId(request.getCustomerId())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .totalPrice(request.getTotalPrice())
                .status(request.getStatus())
                .build();

        Reservation savedReservation = reservationRepository.save(reservation);
        return mapToReservationResponse(savedReservation);
    }

    public ReservationResponse editReservation(ReservationRequest request) {
        Reservation reservation = reservationRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found with id: " + request.getId()));

        reservation.setModelId(request.getModelId());
        reservation.setUserId(request.getCustomerId());
        reservation.setStartDate(request.getStartDate());
        reservation.setEndDate(request.getEndDate());
        reservation.setTotalPrice(request.getTotalPrice());
        reservation.setStatus(request.getStatus());

        Reservation updatedReservation = reservationRepository.save(reservation);
        return mapToReservationResponse(updatedReservation);
    }

    public ReservationResponse getById(Integer reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found with id: " + reservationId));

        return mapToReservationResponse(reservation);
    }

    public ReservationResponse deleteReservation(ReservationRequest request) {
        Reservation reservation = reservationRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found with id: " + request.getId()));

        reservationRepository.delete(reservation);
        return mapToReservationResponse(reservation);
    }

    public List<ReservationResponse> getByCustomerId(Integer customerId) {
        List<Reservation> reservations = reservationRepository.findByUserId(customerId);
        return reservations.stream()
                .map(this::mapToReservationResponse)
                .collect(Collectors.toList());
    }

    public List<ReservationResponse> getByModelId(Integer modelId) {
        List<Reservation> reservations = reservationRepository.findByModelId(modelId);
        return reservations.stream()
                .map(this::mapToReservationResponse)
                .collect(Collectors.toList());
    }

    private ReservationResponse mapToReservationResponse(Reservation reservation) {
        return ReservationResponse.builder()
                .id(reservation.getId())
                .modelId(reservation.getModelId())
                .customerId(reservation.getUserId())
                .startDate(reservation.getStartDate())
                .endDate(reservation.getEndDate())
                .totalPrice(reservation.getTotalPrice())
                .status(String.valueOf(reservation.getStatus()))
                .build();
    }
}