package com.bnabd.rental.note;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Integer> {
    List<Note> findByReservationId(Integer reservationId);
    List<Note> findByAuthorId(Integer authorId);
}