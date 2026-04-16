import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Note } from '../../models/note.model';
import { updateNote } from '../../store/actions/note.actions';

@Component({
  selector: 'app-note-edit',
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './note-edit.component.html',
  styleUrl: './note-edit.component.scss'
})
export class NoteEditComponent implements OnInit {
  noteId = '';
  title = '';
  content = '';
  noteExists = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.noteExists = false;
      return;
    }

    this.noteId = id;
    const notes = JSON.parse(localStorage.getItem('notes') || '[]') as Note[];
    const note = notes.find((entry) => entry.id === id);

    if (!note) {
      this.noteExists = false;
      return;
    }

    this.noteExists = true;
    this.title = note.title;
    this.content = note.content;
  }

  save(): void {
    if (!this.noteExists || !this.noteId) {
      return;
    }

    const updatedNote: Note = {
      id: this.noteId,
      title: this.title.trim(),
      content: this.content.trim()
    };

    this.store.dispatch(updateNote({ note: updatedNote }));
    this.router.navigateByUrl('/');
  }
}
