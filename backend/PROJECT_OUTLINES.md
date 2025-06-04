# Założenia projektowe

**System umożliwiający wypożyczanie samochodów klientom, zarządzanie flotą i rejestrację rezerwacji przez administratorów.**  
**BACKEND:** Java, Spring Boot, Spring Security  
**FRONTEND:** TypeScript, React

---

## Role użytkowników i ich funkcjonalności

### 1. Użytkownik niezalogowany
- Przeglądanie listy dostępnych samochodów  
- Przeglądanie szczegółów samochodu, dostępność też  
- Możliwość rejestracji  
- Możliwość logowania  

### 2. Klient (zalogowany użytkownik)
- Logowanie  
- Przeglądanie dostępnych samochodów (z możliwością filtrowania, sortowania)  
- Rezerwacja samochodu  
- Przeglądanie i anulowanie swoich rezerwacji  
- Podgląd historii wypożyczeń  

### 3. Administrator
- Zarządzanie samochodami (dodawanie, edycja, usuwanie)  
- Zarządzanie użytkownikami  
- Zatwierdzanie / anulowanie rezerwacji  
- Przegląd statystyk (np. liczba wypożyczeń w miesiącu, najczęściej wypożyczane modele)  
- Możliwość przedłużenia okresu wypożyczenia  
- Możliwość przeglądania historii rezerwacji danego użytkownika i notatki użytkowników  
- Przegląd floty i ich ubezpieczeń, z przypominaniem końca  

---

## Główne encje

### Users
- `id` (PK)  
- `username`  
- `email`  
- `password` (haszowane)  
- `role` (ADMIN / CLIENT / NOT_LOGGED_IN)  
- `created_at`  

### Cars
- `id` (PK)  
- `make` (marka)  
- `model`  
- `year`  
- `plate_number`  
- `price_per_day`  
- `status` (AVAILABLE / RENTED / INACTIVE)  
- `przeglad wazny koniec`  
- `ubezpieczenie koniec`  

### Reservations
- `id` (PK)  
- `user_id` (FK → User)  
- `car_id` (FK → Car)  
- `start_date`  
- `end_date`  
- `status` (PENDING / CONFIRMED / CANCELLED / COMPLETED)  
- `total_price`  

### Payments
- `id` (PK)  
- `reservation_id` (FK → Reservation)  
- `payment_date`  
- `amount`  
- `status` (PAID / FAILED)  

### Reviews
- `id` (PK)  
- `user_id` (FK → User)  
- `car_id` (FK → Car)  
- `rating` (1-5)  
- `comment`  

### Notes
- `id` (PK)  
- `reservation_id` (FK → Reservation)  
- `author_id` (FK → User) — użytkownik, który dodał notatkę (najczęściej administrator)  
- `content` — treść notatki  
- `created_at` — data i czas utworzenia notatki (automatycznie ustawiana)  

---

## Moduły frontendu

- **Logowanie i rejestracja**  
- **Panel klienta** (lista aut, rezerwacje, historia)  
- **Panel administratora** (zarządzanie flotą, użytkownikami, statystyki)  
- **Komponent statystyk dla administratora**