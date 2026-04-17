import { createReducer, on } from '@ngrx/store';
import * as UiActions from '../actions/ui.actions';
import { ThemeMode } from '../actions/ui.actions';

export interface UiState {
  theme: ThemeMode;
}

export const initialUiState: UiState = {
  theme: 'light'
};

export const uiReducer = createReducer(
  initialUiState,
  on(UiActions.loadThemeSuccess, (state, { theme }) => ({
    ...state,
    theme
  })),
  on(UiActions.setTheme, (state, { theme }) => ({
    ...state,
    theme
  }))
);
