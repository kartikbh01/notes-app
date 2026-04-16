// note-form.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addNote } from '../../store/actions/note.actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  imports: [FormsModule]
})
export class NoteFormComponent {
  title:string = '';
  content:string = '';

  constructor(private store: Store) {}

  addNote() {
    const note = {
      id: crypto.randomUUID(),
      title: this.title,
      content: this.content
    };

    // dispatch add note action
    this.store.dispatch(addNote({ note }));

    // reset fields
    this.title = '';
    this.content = '';
  }
}