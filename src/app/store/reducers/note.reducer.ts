// store/reducers/note.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as NoteActions from '../actions/note.actions';
import { Note } from '../../models/note.model';


// Holds the entire app state
// A global immutable object.
export interface NoteState {
  notes: Note[];
}

export const initialState: NoteState = {
  notes: []
};

export const noteReducer = createReducer(
  initialState,

  on(NoteActions.loadNotesSuccess, (state, { notes }) => ({
    ...state,
    notes
  })),

  on(NoteActions.addNote, (state, { note }) => ({
    ...state,
    notes: [...state.notes, note]
  })),

  on(NoteActions.updateNote, (state, { note }) => ({
    ...state,
    notes: state.notes.map(n => n.id === note.id ? note : n)
  })),

  on(NoteActions.deleteNote, (state, { id }) => ({
    ...state,
    notes: state.notes.filter(n => n.id !== id)
  }))
);