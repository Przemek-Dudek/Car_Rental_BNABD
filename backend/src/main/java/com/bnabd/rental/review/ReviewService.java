package com.bnabd.rental.review;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewResponse addReview(ReviewRequest request) {
        Review review = Review.builder()
                .reservationId(request.getReservationId())
                .rating(request.getRating())
                .createdDateTime(request.getCreatedDateTime())
                .build();

        Review savedReview = reviewRepository.save(review);
        return mapToReviewResponse(savedReview);
    }

    public ReviewResponse editReview(ReviewRequest request) {
        Review review = reviewRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("Review not found with id: " + request.getId()));

        review.setReservationId(request.getReservationId());
        review.setRating(request.getRating());
        review.setCreatedDateTime(request.getCreatedDateTime());

        Review updatedReview = reviewRepository.save(review);
        return mapToReviewResponse(updatedReview);
    }

    public ReviewResponse getById(int reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Review not found with id: " + reviewId));

        return mapToReviewResponse(review);
    }

    public ReviewResponse deleteReview(ReviewRequest request) {
        Review review = reviewRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("Review not found with id: " + request.getId()));

        reviewRepository.delete(review);
        return mapToReviewResponse(review);
    }

    public List<ReviewResponse> getByReservationId(Integer reservationId) {
        List<Review> reviews = reviewRepository.findByReservationId(reservationId);

        return reviews.stream()
                .map(this::mapToReviewResponse)
                .collect(Collectors.toList());
    }

    private ReviewResponse mapToReviewResponse(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .reservationId(review.getReservationId())
                .rating(review.getRating())
                .createdDateTime(review.getCreatedDateTime())
                .build();
    }
}