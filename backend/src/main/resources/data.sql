-- data.sql
-- Spring Boot will execute this file at startup.
-- Note: We are using ordinal values for enum columns.

-- Insert Car rows (12 cars, 3 for each of 4 different models)
INSERT INTO car (id, year, plate_number, status, end_of_inspection_date, end_of_insurance_date)
VALUES
    -- Toyota Corolla Cars (CarStatus: AVAILABLE = 0)
    (1, 2015, 'TOY-001', 0, '2025-12-31', '2025-12-31'),
    (2, 2016, 'TOY-002', 0, '2025-12-31', '2025-12-31'),
    (3, 2017, 'TOY-003', 0, '2025-12-31', '2025-12-31'),

    -- Honda Civic Cars (CarStatus: AVAILABLE = 0; UNAVAILABLE = 1)
    (4, 2018, 'HON-001', 0, '2024-06-30', '2024-06-30'),
    (5, 2019, 'HON-002', 1, '2024-06-30', '2024-06-30'),
    (6, 2020, 'HON-003', 0, '2024-06-30', '2024-06-30'),

    -- Ford Focus Cars (CarStatus: AVAILABLE = 0; UNAVAILABLE = 1)
    (7, 2018, 'FOR-001', 0, '2026-03-15', '2026-03-15'),
    (8, 2019, 'FOR-002', 0, '2026-03-15', '2026-03-15'),
    (9, 2020, 'FOR-003', 1, '2026-03-15', '2026-03-15'),

    -- BMW 3 Series Cars (CarStatus: AVAILABLE = 0)
    (10, 2021, 'BMW-001', 0, '2027-05-20', '2027-05-20'),
    (11, 2022, 'BMW-002', 0, '2027-05-20', '2027-05-20'),
    (12, 2021, 'BMW-003', 0, '2027-05-20', '2027-05-20');

--------------------------------------------------------------------------------
-- Insert Model rows (12 models linking one car each)
-- Note: For the segment column we use the ordinal value:
--   Toyota Corolla & Honda Civic -> 'C' which is 2
--   Ford Focus -> 'B' which is 1
--   BMW 3 Series -> 'E' which is 4
-- Initially, reservation_id is NULL.
INSERT INTO model (id, car_id, reservation_id, brand, model, segment, image_link, price_per_day, max_daily_distance, penalty_for_exceeding_kilometers)
VALUES
    -- Toyota Corolla (models 1-3)
    (1, 1, NULL, 'Toyota', 'Corolla', 2, 'http://example.com/corolla.jpg', 40.0, 300.0, 0.15),
    (2, 2, NULL, 'Toyota', 'Corolla', 2, 'http://example.com/corolla.jpg', 40.0, 300.0, 0.15),
    (3, 3, NULL, 'Toyota', 'Corolla', 2, 'http://example.com/corolla.jpg', 40.0, 300.0, 0.15),

    -- Honda Civic (models 4-6)
    (4, 4, NULL, 'Honda', 'Civic', 2, 'http://example.com/civic.jpg', 42.0, 350.0, 0.12),
    (5, 5, NULL, 'Honda', 'Civic', 2, 'http://example.com/civic.jpg', 42.0, 350.0, 0.12),
    (6, 6, NULL, 'Honda', 'Civic', 2, 'http://example.com/civic.jpg', 42.0, 350.0, 0.12),

    -- Ford Focus (models 7-9)
    (7, 7, NULL, 'Ford', 'Focus', 1, 'http://example.com/focus.jpg', 38.0, 320.0, 0.10),
    (8, 8, NULL, 'Ford', 'Focus', 1, 'http://example.com/focus.jpg', 38.0, 320.0, 0.10),
    (9, 9, NULL, 'Ford', 'Focus', 1, 'http://example.com/focus.jpg', 38.0, 320.0, 0.10),

    -- BMW 3 Series (models 10-12)
    (10, 10, NULL, 'BMW', '3 Series', 4, 'http://example.com/bmw3.jpg', 70.0, 400.0, 0.20),
    (11, 11, NULL, 'BMW', '3 Series', 4, 'http://example.com/bmw3.jpg', 70.0, 400.0, 0.20),
    (12, 12, NULL, 'BMW', '3 Series', 4, 'http://example.com/bmw3.jpg', 70.0, 400.0, 0.20);

--------------------------------------------------------------------------------
-- Insert Reservation rows for selected models
-- We reserve models 2 (Toyota Corolla), 5 (Honda Civic), and 11 (BMW 3 Series).
-- For ReservationStatus, CONFIRMED = 1.
INSERT INTO reservation (id, user_id, model_id, start_date, end_date, total_distance_covered, total_price, status)
VALUES
    (1, 101, 2, '2025-07-01', '2025-07-10', 120.0, 480.0, 1),
    (2, 102, 5, '2025-08-05', '2025-08-15', 150.0, 630.0, 1),
    (3, 103, 11, '2025-09-10', '2025-09-20', 200.0, 700.0, 1);

-- Update the corresponding Model rows with the new reservation IDs
UPDATE model SET reservation_id = 1 WHERE id = 2;
UPDATE model SET reservation_id = 2 WHERE id = 5;
UPDATE model SET reservation_id = 3 WHERE id = 11;

--------------------------------------------------------------------------------
-- Insert sample Note rows
INSERT INTO note (id, reservation_id, author_id, content, created_date_time)
VALUES
    (1, 1, 201, 'Customer requested GPS upgrade', '2025-06-15T10:00:00'),
    (2, 2, 202, 'Need additional driver service', '2025-07-10T14:30:00'),
    (3, 3, 203, 'Reservation changed due to schedule conflict', '2025-08-20T16:00:00'),
    (4, 1, 204, 'First note for reservation 1', '2025-06-16T09:30:00');

--------------------------------------------------------------------------------
-- Insert sample Payment rows
-- For PaymentStatus, PAID = 1 and CANCELLED = 3.
INSERT INTO payment (id, payer_id, reservation_id, payment_date, payment_amount, status)
VALUES
    (1, 101, 1, '2025-06-20', 480.0, 1),
    (2, 102, 2, '2025-07-15', 630.0, 1),
    (3, 103, 3, '2025-08-25', 700.0, 1),
    (4, 104, 2, '2025-07-18', 630.0, 3);

--------------------------------------------------------------------------------
-- Insert sample Review rows
INSERT INTO review (id, reservation_id, rating, created_date_time)
VALUES
    (1, 1, 5, '2025-07-15T12:00:00'),
    (2, 2, 4, '2025-08-10T09:00:00');

COMMIT;