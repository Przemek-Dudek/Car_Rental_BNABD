package com.bnabd.rental.payment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public PaymentResponse addPayment(PaymentRequest paymentRequest) {
        Payment payment = Payment.builder()
                .paymentDate(paymentRequest.getPaymentDate())
                .paymentAmount(paymentRequest.getPaymentAmount())
                .status(paymentRequest.getStatus())
                .paymentAmount(paymentRequest.getPaymentAmount())
                .build();

        Payment savedPayment = paymentRepository.save(payment);
        return mapToPaymentResponse(savedPayment);
    }
    
    public PaymentResponse editPayment(PaymentRequest paymentRequest) {
        Payment payment = paymentRepository.findById(paymentRequest.getId())
                .orElseThrow(() -> new IllegalArgumentException("Payment not found with id: " + paymentRequest.getId()));

        payment.setReservationId(paymentRequest.getReservationId());
        payment.setPaymentDate(paymentRequest.getPaymentDate());
        payment.setPaymentAmount(paymentRequest.getPaymentAmount());
        payment.setStatus(paymentRequest.getStatus());

        Payment updatedPayment = paymentRepository.save(payment);
        return mapToPaymentResponse(updatedPayment);
    }

    public PaymentResponse getById(Integer paymentId) {
        Payment Payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalArgumentException("Payment not found with id: " + paymentId));

        return mapToPaymentResponse(Payment);
    }
    
    public PaymentResponse deletePayment(PaymentRequest paymentRequest) {
        Payment Payment = paymentRepository.findById(paymentRequest.getId())
                .orElseThrow(() -> new IllegalArgumentException("Payment not found with id: " + paymentRequest.getId()));

        paymentRepository.delete(Payment);
        return mapToPaymentResponse(Payment);
    }

    public List<PaymentResponse> getByReservationId(Integer reservationId) {
        return paymentRepository.findByReservationId(reservationId)
                .stream()
                .map(this::mapToPaymentResponse)
                .collect(Collectors.toList());
    }

    public List<PaymentResponse> getByPayerId(Integer payerId) {
        return paymentRepository.findByPayerId(payerId)
                .stream()
                .map(this::mapToPaymentResponse)
                .collect(Collectors.toList());
    }

    private PaymentResponse mapToPaymentResponse(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .reservationId(payment.getReservationId())
                .paymentAmount(payment.getPaymentAmount())
                .paymentDate(payment.getPaymentDate())
                .status(String.valueOf(payment.getStatus()))
                .build();
    }
}