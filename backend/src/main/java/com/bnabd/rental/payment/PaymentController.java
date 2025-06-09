package com.bnabd.rental.payment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rental/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<PaymentResponse> createPayment(@RequestBody PaymentRequest paymentRequest) {
        return ResponseEntity.ok(paymentService.addPayment(paymentRequest));
    }

    @PutMapping
    public ResponseEntity<PaymentResponse> editPayment(@RequestBody PaymentRequest paymentRequest) {
        return ResponseEntity.ok(paymentService.editPayment(paymentRequest));
    }

    @GetMapping
    public ResponseEntity<PaymentResponse> getPaymentById(@RequestParam Integer paymentId) {
        return ResponseEntity.ok(paymentService.getById(paymentId));
    }

    @DeleteMapping
    public ResponseEntity<PaymentResponse> deletePayment(@RequestBody PaymentRequest paymentRequest) {
        return ResponseEntity.ok(paymentService.deletePayment(paymentRequest));
    }

    @GetMapping("/reservation/{reservationId}")
    public ResponseEntity<List<PaymentResponse>> getPaymentsByReservationId(@PathVariable Integer reservationId) {
        return ResponseEntity.ok(paymentService.getByReservationId(reservationId));
    }

    @GetMapping("/payer/{payerId}")
    public ResponseEntity<List<PaymentResponse>> getPaymentsByPayerId(@PathVariable Integer payerId) {
        return ResponseEntity.ok(paymentService.getByPayerId(payerId));
    }
}