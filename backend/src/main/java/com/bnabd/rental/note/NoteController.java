package com.bnabd.rental.note;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rental/notes")
@RequiredArgsConstructor
public class NoteController {
    private final NoteService noteService;

    @PostMapping
    public ResponseEntity<NoteResponse> createNote(@RequestBody NoteRequest noteRequest) {
        return ResponseEntity.ok(noteService.addNote(noteRequest));
    }

    @PutMapping
    public ResponseEntity<NoteResponse> editNote(@RequestBody NoteRequest noteRequest) {
        return ResponseEntity.ok(noteService.editNote(noteRequest));
    }

    @GetMapping
    public ResponseEntity<NoteResponse> getNoteById(@RequestParam Integer noteId) {
        return ResponseEntity.ok(noteService.getById(noteId));
    }

    @DeleteMapping
    public ResponseEntity<NoteResponse> deleteNote(@RequestBody NoteRequest noteRequest) {
        return ResponseEntity.ok(noteService.deleteNote(noteRequest));
    }

    @GetMapping("/reservation/{reservationId}")
    public ResponseEntity<List<NoteResponse>> getNotesByReservationId(@PathVariable Integer reservationId) {
        return ResponseEntity.ok(noteService.getByReservationId(reservationId));
    }

    @GetMapping("/author/{authorId}")
    public ResponseEntity<List<NoteResponse>> getNotesByAuthorId(@PathVariable Integer authorId) {
        return ResponseEntity.ok(noteService.getByAuthorId(authorId));
    }
}