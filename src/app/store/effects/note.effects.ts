// store/effects/note.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as NoteActions from '../actions/note.actions';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class NoteEffects {
  private readonly actions$ = inject(Actions);
  loadNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActions.loadNotes),
      map(() => {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        return NoteActions.loadNotesSuccess({ notes });
      })
    )
  );

  saveNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        NoteActions.addNote,
        NoteActions.updateNote,
        NoteActions.deleteNote
      ),
      tap((action: any) => {
        const current = JSON.parse(localStorage.getItem('notes') || '[]');

        let updated = current;

        if (action.note) {
          const exists = current.find((n: any) => n.id === action.note.id);
          updated = exists
            ? current.map((n: any) => n.id === action.note.id ? action.note : n)
            : [...current, action.note];
        }

        if (action.id) {
          updated = current.filter((n: any) => n.id !== action.id);
        }

        localStorage.setItem('notes', JSON.stringify(updated));
      })
    ),
    { dispatch: false }
  );
}