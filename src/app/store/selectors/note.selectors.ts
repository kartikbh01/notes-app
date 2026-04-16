// store/selectors/note.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NoteState } from '../reducers/note.reducer';

export const selectNoteState =
  createFeatureSelector<NoteState>('notes');

export const selectAllNotes = createSelector(
  selectNoteState,
  (state) => state.notes
);