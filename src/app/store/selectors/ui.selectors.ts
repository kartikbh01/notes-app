import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from '../reducers/ui.reducer';

export const selectUiState = createFeatureSelector<UiState>('ui');

export const selectTheme = createSelector(
  selectUiState,
  (state) => state.theme
);
