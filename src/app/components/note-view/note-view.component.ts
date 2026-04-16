import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-view',
  imports: [NgIf, RouterLink],
  templateUrl: './note-view.component.html',
  styleUrl: './note-view.component.scss'
})
export class NoteViewComponent implements OnInit {
  note: Note | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.note = null;
      return;
    }

    const notes = JSON.parse(localStorage.getItem('notes') || '[]') as Note[];
    this.note = notes.find((entry) => entry.id === id) ?? null;
  }
}
