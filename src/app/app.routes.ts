import { Routes } from '@angular/router';
import { NoteEditComponent } from './components/note-edit/note-edit.component';
import { NoteViewComponent } from './components/note-view/note-view.component';
import { NotesHomeComponent } from './components/notes-home/notes-home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: NotesHomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'notes/:id',
    component: NoteViewComponent
  },
  {
    path: 'notes/:id/edit',
    component: NoteEditComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
