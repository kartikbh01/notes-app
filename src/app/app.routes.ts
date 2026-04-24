import { Routes } from '@angular/router';
import { NoteEditComponent } from './components/note-edit/note-edit.component';
import { NoteViewComponent } from './components/note-view/note-view.component';
import { NotesHomeComponent } from './components/notes-home/notes-home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth/auth.guard';
import { loggedOutGuard } from './guards/logged-out/logged-out.guard';

export const routes: Routes = [
  {
    path: '',
    component: NotesHomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loggedOutGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loggedOutGuard]
  },
  {
    path: 'notes/:id',
    component: NoteViewComponent,
    canActivate: [authGuard]
  },
  {
    path: 'notes/:id/edit',
    component: NoteEditComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
