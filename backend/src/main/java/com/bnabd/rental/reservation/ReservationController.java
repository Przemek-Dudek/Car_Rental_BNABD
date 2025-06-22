package com.bnabd.rental.reservation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rental/reservations")
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<ReservationResponse> createReservation(@RequestBody ReservationRequest paymentRequest) {
        return ResponseEntity.ok(reservationService.addReservation(paymentRequest));
    }

    @PutMapping
    public ResponseEntity<ReservationResponse> editReservation(@RequestBody ReservationRequest paymentRequest) {
        return ResponseEntity.ok(reservationService.editReservation(paymentRequest));
    }

    @GetMapping
    public ResponseEntity<ReservationResponse> getReservationById(@RequestParam Integer reservationId) {
        return ResponseEntity.ok(reservationService.getById(reservationId));
    }

    @DeleteMapping
    public ResponseEntity<ReservationResponse> deleteReservation(@RequestBody ReservationRequest paymentRequest) {
        return ResponseEntity.ok(reservationService.deleteReservation(paymentRequest));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<ReservationResponse>> getReservationsByCustomerId(@PathVariable Integer customerId) {
        return ResponseEntity.ok(reservationService.getByCustomerId(customerId));
    }

    @GetMapping("/model/{modelId}")
    public ResponseEntity<List<ReservationResponse>> getReservationsByModelId(@PathVariable Integer modelId) {
        return ResponseEntity.ok(reservationService.getByModelId(modelId));
    }
}