import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Note } from '../../models/note.model';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-note-view',
  imports: [NgIf, RouterLink, NavbarComponent],
  templateUrl: './note-view.component.html',
  styleUrl: './note-view.component.scss'
})
export class NoteViewComponent implements OnInit {
  note: Note | null = null;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.note = null;
      return;
    }

    const user = await this.authService.getCurrentUser();
    const userId = user ? user.$id : 'guest';
    const notes = JSON.parse(localStorage.getItem(`notes_${userId}`) || '[]') as Note[];
    this.note = notes.find((entry) => entry.id === id) ?? null;
  }
}
