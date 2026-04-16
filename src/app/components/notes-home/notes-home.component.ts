import { Component } from '@angular/core';
import { NoteFormComponent } from '../note-form/note-form.component';
import { NoteListComponent } from '../note-list/note-list.component';

@Component({
  selector: 'app-notes-home',
  imports: [NoteFormComponent, NoteListComponent],
  templateUrl: './notes-home.component.html'
})
export class NotesHomeComponent {}
