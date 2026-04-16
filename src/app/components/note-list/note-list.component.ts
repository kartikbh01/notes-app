// note-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Note } from '../../models/note.model';
import { selectAllNotes } from '../../store/selectors/note.selectors';
import { deleteNote, loadNotes } from '../../store/actions/note.actions';
import { NgFor } from '@angular/common'; // Or import CommonModule
import { AsyncPipe } from '@angular/common';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
    imports: [NgFor, NgIf, AsyncPipe, RouterLink], // Add required template directives here

})
export class NoteListComponent implements OnInit {

  notes$: Observable<Note[]>;

  constructor(private store: Store) {
    this.notes$ = this.store.select(selectAllNotes);
  }

  ngOnInit() {
    this.store.dispatch(loadNotes());
  }

  delete(id: string) {
    this.store.dispatch(deleteNote({ id }));
  }
}