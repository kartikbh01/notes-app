// note-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { addNote } from '../../store/actions/note.actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss',
  imports: [FormsModule]
})
export class NoteFormComponent {
  @Output() submitted = new EventEmitter<void>();
  title:string = '';
  content:string = '';

  constructor(private store: Store) {}

  addNote() {
    if (!this.title.trim() && !this.content.trim()) {
      return;
    }

    const note = {
      id: crypto.randomUUID(),
      title: this.title.trim(),
      content: this.content.trim()
    };

    // dispatch add note action
    this.store.dispatch(addNote({ note }));

    // reset fields
    this.title = '';
    this.content = '';
    this.submitted.emit();
  }
}