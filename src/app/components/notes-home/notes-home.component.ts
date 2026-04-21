import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NoteFormComponent } from '../note-form/note-form.component';
import { NoteListComponent } from '../note-list/note-list.component';
import { ThemeMode } from '../../store/actions/ui.actions';
import { selectTheme } from '../../store/selectors/ui.selectors';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-notes-home',
  imports: [NoteFormComponent, NoteListComponent, AsyncPipe, NavbarComponent],
  templateUrl: './notes-home.component.html',
  styleUrl: './notes-home.component.scss'
})
export class NotesHomeComponent implements OnInit {
  isFormModalOpen = false;
  readonly theme$: Observable<ThemeMode>;

  constructor(private store: Store) {
    this.theme$ = this.store.select(selectTheme);
  }

  ngOnInit() {
  }

  openFormModal(): void {
    this.isFormModalOpen = true;
  }

  closeFormModal(): void {
    this.isFormModalOpen = false;
  }
}
