// store/effects/note.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as NoteActions from '../actions/note.actions';
import { tap, map, concatMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
@Injectable()
export class NoteEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);

  loadNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActions.loadNotes),
      concatMap(() => from(this.authService.getCurrentUser()).pipe(
        map((user) => {
          const userId = user ? user.$id : 'guest';
          const notes = JSON.parse(localStorage.getItem(`notes_${userId}`) || '[]');
          return NoteActions.loadNotesSuccess({ notes });
        })
      ))
    )
  );

  saveNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        NoteActions.addNote,
        NoteActions.updateNote,
        NoteActions.deleteNote
      ),
      concatMap((action: any) => from(this.authService.getCurrentUser()).pipe(
        tap((user) => {
          const userId = user ? user.$id : 'guest';
          const current = JSON.parse(localStorage.getItem(`notes_${userId}`) || '[]');

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

          localStorage.setItem(`notes_${userId}`, JSON.stringify(updated));
        })
      ))
    ),
    { dispatch: false }
  );
}