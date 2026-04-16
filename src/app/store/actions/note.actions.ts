// store/actions/note.actions.ts
import { createAction, props } from '@ngrx/store';
import { Note } from '../../models/note.model';

export const addNote = createAction(
  '[Note] Add',
  props<{ note: Note }>()
);

export const updateNote = createAction(
  '[Note] Update',
  props<{ note: Note }>()
);

export const deleteNote = createAction(
  '[Note] Delete',
  props<{ id: string }>()
);

export const loadNotes = createAction('[Note] Load');

export const loadNotesSuccess = createAction(
  '[Note] Load Success',
  props<{ notes: Note[] }>()
);