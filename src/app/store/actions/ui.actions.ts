import { createAction, props } from '@ngrx/store';

export type ThemeMode = 'light' | 'dark';

export const loadTheme = createAction('[UI] Load Theme');

export const loadThemeSuccess = createAction(
  '[UI] Load Theme Success',
  props<{ theme: ThemeMode }>()
);

export const setTheme = createAction(
  '[UI] Set Theme',
  props<{ theme: ThemeMode }>()
);
