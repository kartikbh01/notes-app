import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ThemeMode, setTheme } from '../../store/actions/ui.actions';
import { selectTheme } from '../../store/selectors/ui.selectors';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @Input() showAddNote = true;
  @Output() addNoteClick = new EventEmitter<void>();

  isUserDropdownOpen = false;
  user: any = null;
  readonly theme$: Observable<ThemeMode>;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {
    this.theme$ = this.store.select(selectTheme);
  }

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();
  }

  // for avatar (Kartik -> K)
  getUserInitials(): string {
    if (this.user?.name) {
      return this.user.name.charAt(0).toUpperCase();
    }
    return this.user?.email?.charAt(0).toUpperCase() || 'U';
  }

  toggleUserDropdown(): void {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleTheme(isDarkMode: boolean): void {
    this.store.dispatch(setTheme({ theme: isDarkMode ? 'dark' : 'light' }));
  }
}
