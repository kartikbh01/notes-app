import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { loadTheme } from './store/actions/ui.actions';
import { selectTheme } from './store/selectors/ui.selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'notes-app';
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.store.dispatch(loadTheme());

    this.store
      .select(selectTheme)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((theme) => {
        document.body.classList.toggle('theme-dark', theme === 'dark');
        document.body.classList.toggle('theme-light', theme === 'light');
      });
  }
}
