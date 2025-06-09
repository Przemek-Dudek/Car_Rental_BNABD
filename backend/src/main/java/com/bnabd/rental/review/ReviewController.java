package com.bnabd.rental.review;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rental/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(@RequestBody ReviewRequest reviewRequest) {
        return ResponseEntity.ok(reviewService.addReview(reviewRequest));
    }

    @PutMapping
    public ResponseEntity<ReviewResponse> editReview(@RequestBody ReviewRequest reviewRequest) {
        return ResponseEntity.ok(reviewService.editReview(reviewRequest));
    }

    @GetMapping
    public ResponseEntity<ReviewResponse> getReviewById(@RequestParam Integer reviewId) {
        return ResponseEntity.ok(reviewService.getById(reviewId));
    }

    @DeleteMapping
    public ResponseEntity<ReviewResponse> deleteReview(@RequestBody ReviewRequest reviewRequest) {
        return ResponseEntity.ok(reviewService.deleteReview(reviewRequest));
    }

    @GetMapping("/reservation")
    public ResponseEntity<List<ReviewResponse>> getReviewsByReservationId(@RequestParam Integer reservationId) {
        return ResponseEntity.ok(reviewService.getByReservationId(reservationId));
    }
}