package com.bnabd.rental.note;

import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;

    public NoteResponse addNote(NoteRequest request) {
        Note note = Note.builder()
                .reservationId(request.getReservationId())
                .authorId(request.getAuthorId())
                .content(request.getContent())
                .createdDateTime(request.getCreatedDateTime())
                .build();

        Note savedNote = noteRepository.save(note);
        return mapToNoteResponse(savedNote);
    }

    public NoteResponse editNote(NoteRequest request) {
        Note note = noteRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("Note not found with id: " + request.getId()));

        note.setAuthorId(request.getAuthorId());
        note.setReservationId(request.getReservationId());
        note.setContent(request.getContent());
        note.setCreatedDateTime(request.getCreatedDateTime());

        Note updatedNote = noteRepository.save(note);
        return mapToNoteResponse(updatedNote);
    }

    public NoteResponse getById(Integer noteId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new IllegalArgumentException("Note not found with id: " + noteId));

        return mapToNoteResponse(note);
    }

    public NoteResponse deleteNote(NoteRequest request) {
        Note note = noteRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("Note not found with id: " + request.getId()));

        noteRepository.delete(note);
        return mapToNoteResponse(note);
    }

    public List<NoteResponse> getByReservationId(Integer reservationId) {
        return noteRepository.findByReservationId(reservationId)
                .stream()
                .map(this::mapToNoteResponse)
                .collect(Collectors.toList());
    }

    public List<NoteResponse> getByAuthorId(Integer authorId) {
        return noteRepository.findByAuthorId(authorId)
                .stream()
                .map(this::mapToNoteResponse)
                .collect(Collectors.toList());
    }

    private NoteResponse mapToNoteResponse(Note note) {
        return NoteResponse.builder()
                .id(note.getId())
                .authorId(note.getAuthorId())
                .reservationId(note.getReservationId())
                .content(note.getContent())
                .createdDateTime(note.getCreatedDateTime())
                .build();
    }
}