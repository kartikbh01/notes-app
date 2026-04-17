import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { noteReducer } from './store/reducers/note.reducer'; // Import your reducer
import { NoteEffects } from './store/effects/note.effects';
import { uiReducer } from './store/reducers/ui.reducer';
import { UiEffects } from './store/effects/ui.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideStore({ notes: noteReducer, ui: uiReducer }), 
    provideEffects(NoteEffects, UiEffects),
    provideStoreDevtools({ 
      maxAge: 25, 
      logOnly: !isDevMode() 
    })
  ]
};