import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import * as UiActions from '../actions/ui.actions';

@Injectable()
export class UiEffects {
  private readonly actions$ = inject(Actions);

  loadTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UiActions.loadTheme),
      map(() => {
        const storedTheme = localStorage.getItem('theme') || "dark";
        const theme = storedTheme === 'dark' ? 'dark' : 'light';
        return UiActions.loadThemeSuccess({ theme });
      })
    )
  );

  saveTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UiActions.setTheme),
        tap(({ theme }) => {
          localStorage.setItem('theme', theme);
        })
      ),
    { dispatch: false }
  );
}
