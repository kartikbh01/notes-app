# Bug Fixes and Improvements

This document outlines the recent bug fixes and improvements made to the application, specifically focusing on authentication flows and user-specific data isolation.

## 1. Restricting Access to Authentication Routes
**Issue:** Authenticated users were able to access the `/login` and `/register` pages, which could lead to confusion and incorrect application state.

**Fix:** Implemented a `loggedOutGuard` that checks if a user is currently logged in. If they are, it redirects them to the home page (`/`). This guard is applied to both the login and register routes.

**Code Snippet (`app.routes.ts` & `loggedOutGuard`):**
```typescript
// src/app/guards/logged-out/logged-out.guard.ts
export const loggedOutGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const user = await authService.getCurrentUser();
    if (user) {
      return router.createUrlTree(['/']); // Redirect to home if logged in
    } else {
      return true; // Allow access to login/register
    }
  } catch (error) {
    return true;
  }
};

// src/app/app.routes.ts
export const routes: Routes = [
  // ... other routes
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loggedOutGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loggedOutGuard]
  }
];
```

## 2. Handling Registration Errors (Existing User)
**Issue:** When a user attempted to register with an email that was already in use, the error was only logged to the console, and the user received no visual feedback.

**Fix:** Added an `errorMessage` property to the component to display user-friendly error messages in the UI. If the Appwrite API returns a `409` conflict error, a specific message is shown.

**Code Snippet (`register.component.ts`):**
```typescript
async onSubmit() {
  this.errorMessage = null;
  if (this.registerForm.valid) {
    this.isLoading = true;
    try {
      const { email, password, name } = this.registerForm.value;
      const user = await this.authService.register(email, password, name);
      this.router.navigate(['/login']);
    } catch (e: any) {
      console.error(e);
      if (e.code === 409 || (e.message && e.message.includes('already exists'))) {
        this.errorMessage = 'A user with the same email already exists. Please log in instead.';
      } else {
        this.errorMessage = e.message || 'An error occurred during registration. Please try again.';
      }
    } finally {
      this.isLoading = false;
    }
  }
}
```

## 3. Displaying Invalid Login Credentials Errors
**Issue:** Similar to the registration issue, invalid login attempts did not show an error message in the UI, leaving the user unaware of why the login failed.

**Fix:** Captured the `401 Unauthorized` error during login and displayed an appropriate error message to the user.

**Code Snippet (`login.component.ts`):**
```typescript
async onSubmit() {
  this.errorMessage = null;
  if (this.loginForm.valid) {
    this.isLoading = true;
    try {
      const { email, password } = this.loginForm.value;
      const result = await this.authService.login(email, password);
      this.router.navigate(['/']);
    } catch (e: any) {
      console.error(e);
      if (e.code === 401 || (e.message && e.message.includes('Invalid credentials'))) {
        this.errorMessage = 'Invalid credentials. Please check the email and password.';
      } else {
        this.errorMessage = e.message || 'An error occurred during login. Please try again.';
      }
    } finally {
      this.isLoading = false;
    }
  }
}
```

**Template Error Display (`login.component.html` & `register.component.html`):**
```html
<div class="form-error" *ngIf="errorMessage">
  {{ errorMessage }}
</div>
```

## 4. Preventing Duplicate Authentication Requests
**Issue:** Users could click the "Sign In" or "Sign Up" button multiple times while the API request was in progress, potentially triggering multiple identical requests.

**Fix:** Introduced an `isLoading` boolean state. When the form is submitted, `isLoading` is set to `true`, which disables the submit button and displays a CSS loading spinner. Once the request completes (success or failure in the `finally` block), it's set back to `false`.

**Code Snippet (`login.component.html` & `register.component.html`):**
```html
<div class="form-actions">
  <button type="submit" class="btn-primary" [disabled]="loginForm.invalid || isLoading">
    <span *ngIf="isLoading" class="spinner"></span>
    <span>{{ isLoading ? 'Signing In...' : 'Sign In' }}</span>
    <div class="btn-glow"></div>
  </button>
</div>
```

## 5. Persisting User-Specific Notes
**Issue:** Notes were stored globally in `localStorage` under a single `notes` key, meaning all users sharing the browser would see the same notes.

**Fix:** Updated the NgRx `NoteEffects` to dynamically construct the `localStorage` key using the current user's unique `$id` (e.g., `notes_12345`). This ensures complete data isolation between different authenticated users.

**Code Snippet (`note.effects.ts`):**
```typescript
loadNotes$ = createEffect(() =>
  this.actions$.pipe(
    ofType(NoteActions.loadNotes),
    concatMap(() => from(this.authService.getCurrentUser()).pipe(
      map((user) => {
        const userId = user ? user.$id : 'guest';
        // Fetch notes using user-specific key
        const notes = JSON.parse(localStorage.getItem(`notes_${userId}`) || '[]');
        return NoteActions.loadNotesSuccess({ notes });
      })
    ))
  )
);

saveNotes$ = createEffect(() =>
  this.actions$.pipe(
    ofType(NoteActions.addNote, NoteActions.updateNote, NoteActions.deleteNote),
    concatMap((action: any) => from(this.authService.getCurrentUser()).pipe(
      tap((user) => {
        const userId = user ? user.$id : 'guest';
        const current = JSON.parse(localStorage.getItem(`notes_${userId}`) || '[]');
        
        let updated = current;
        // ... (CRUD logic to modify the 'updated' array) ...
        
        // Save back using user-specific key
        localStorage.setItem(`notes_${userId}`, JSON.stringify(updated));
      })
    ))
  ),
  { dispatch: false }
);
```
