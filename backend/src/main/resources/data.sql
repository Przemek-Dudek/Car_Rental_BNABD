-- data.sql
-- Spring Boot will execute this file at startup.
-- Note: We are using ordinal values for enum columns.

-- *************************************************************
-- STEP 1: Insert MODEL rows (one row per distinct car model)
-- *************************************************************
INSERT INTO model (id, brand, model, segment, image_link, price_per_day, max_daily_distance, penalty_for_exceeding_kilometers)
VALUES
    (1, 'Toyota', 'Corolla', 2, 'http://example.com/corolla.jpg', 40.0, 300.0, 0.15),
    (2, 'Honda', 'Civic', 2, 'http://example.com/civic.jpg', 42.0, 350.0, 0.12),
    (3, 'Ford', 'Focus', 1, 'http://example.com/focus.jpg', 38.0, 320.0, 0.10),
    (4, 'BMW', '3 Series', 4, 'http://example.com/bmw3.jpg', 70.0, 400.0, 0.20);

-- *************************************************************
-- STEP 2: Insert CAR rows (each car points to a Model via model_id)
-- *************************************************************
-- Toyota Corolla Cars (Model id = 1)
INSERT INTO car (id, year, plate_number, status, end_of_inspection_date, end_of_insurance_date, model_id)
VALUES
    (1, 2015, 'TOY-001', 0, '2025-12-31', '2025-12-31', 1),
    (2, 2016, 'TOY-002', 0, '2025-12-31', '2025-12-31', 1),
    (3, 2017, 'TOY-003', 0, '2025-12-31', '2025-12-31', 1);

-- Honda Civic Cars (Model id = 2)
INSERT INTO car (id, year, plate_number, status, end_of_inspection_date, end_of_insurance_date, model_id)
VALUES
    (4, 2018, 'HON-001', 0, '2024-06-30', '2024-06-30', 2),
    (5, 2019, 'HON-002', 1, '2024-06-30', '2024-06-30', 2),
    (6, 2020, 'HON-003', 0, '2024-06-30', '2024-06-30', 2);

-- Ford Focus Cars (Model id = 3)
INSERT INTO car (id, year, plate_number, status, end_of_inspection_date, end_of_insurance_date, model_id)
VALUES
    (7, 2018, 'FOR-001', 0, '2026-03-15', '2026-03-15', 3),
    (8, 2019, 'FOR-002', 0, '2026-03-15', '2026-03-15', 3),
    (9, 2020, 'FOR-003', 1, '2026-03-15', '2026-03-15', 3);

-- BMW 3 Series Cars (Model id = 4)
INSERT INTO car (id, year, plate_number, status, end_of_inspection_date, end_of_insurance_date, model_id)
VALUES
    (10, 2021, 'BMW-001', 0, '2027-05-20', '2027-05-20', 4),
    (11, 2022, 'BMW-002', 0, '2027-05-20', '2027-05-20', 4),
    (12, 2021, 'BMW-003', 0, '2027-05-20', '2027-05-20', 4);

-- *************************************************************
-- STEP 3: Insert RESERVATION rows (each reservation references a Model and a Car)
-- *************************************************************
-- In this example, we reserve:
--   - Toyota Corolla: Reserve Car id = 2 (Model id = 1)
--   - Honda Civic: Reserve Car id = 4 (Model id = 2)
--   - BMW 3 Series: Reserve Car id = 11 (Model id = 4)
INSERT INTO reservation (id, user_id, model_id, car_id, start_date, end_date, total_distance_covered, total_price, status)
VALUES
    (1, 101, 1, 2, '2025-07-01', '2025-07-10', 120.0, 480.0, 1),
    (2, 102, 2, 4, '2025-08-05', '2025-08-15', 150.0, 630.0, 1),
    (3, 103, 4, 11, '2025-09-10', '2025-09-20', 200.0, 700.0, 1);

-- *************************************************************
-- STEP 4: Insert sample NOTE rows
-- *************************************************************
INSERT INTO note (id, reservation_id, author_id, content, created_date_time)
VALUES
    (1, 1, 201, 'Customer requested GPS upgrade', '2025-06-15T10:00:00'),
    (2, 2, 202, 'Need additional driver service', '2025-07-10T14:30:00'),
    (3, 3, 203, 'Reservation changed due to schedule conflict', '2025-08-20T16:00:00'),
    (4, 1, 204, 'First note for reservation 1', '2025-06-16T09:30:00');

-- *************************************************************
-- STEP 5: Insert sample PAYMENT rows
-- *************************************************************
-- For PaymentStatus, PAID = 1 and CANCELLED = 3.
INSERT INTO payment (id, payer_id, reservation_id, payment_date, payment_amount, status)
VALUES
    (1, 101, 1, '2025-06-20', 480.0, 1),
    (2, 102, 2, '2025-07-15', 630.0, 1),
    (3, 103, 3, '2025-08-25', 700.0, 1),
    (4, 104, 2, '2025-07-18', 630.0, 3);

-- *************************************************************
-- STEP 6: Insert sample REVIEW rows
-- *************************************************************
INSERT INTO review (id, reservation_id, rating, created_date_time)
VALUES
    (1, 1, 5, '2025-07-15T12:00:00'),
    (2, 2, 4, '2025-08-10T09:00:00');

COMMIT;

SELECT setval('model_seq', (SELECT COALESCE(MAX(id), 0) FROM model) + 1, true);
SELECT setval('car_seq', (SELECT COALESCE(MAX(id), 0) FROM car) + 1, true);
SELECT setval('reservation_seq', (SELECT COALESCE(MAX(id), 0) FROM reservation) + 1, true);
SELECT setval('note_seq', (SELECT COALESCE(MAX(id), 0) FROM note) + 1, true);
SELECT setval('payment_seq', (SELECT COALESCE(MAX(id), 0) FROM payment) + 1, true);
SELECT setval('review_seq', (SELECT COALESCE(MAX(id), 0) FROM review) + 1, true);