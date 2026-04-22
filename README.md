# Notes App

This is a Notes Application built using **Angular** on the frontend and **Appwrite** for the backend. The app allows users to register, login, create, view, edit, and securely manage their personal notes.

## Appwrite

The project integrates **Appwrite**, an open-source Backend-as-a-Service (BaaS), to handle core backend functionalities like user authentication and database operations. 

The Appwrite SDK is configured centrally in `src/app/lib/appwrite.ts`:
- **Client**: Establishes the connection to the Appwrite server using the endpoint and project ID stored in environment variables.
- **Account**: Manages authentication, user sessions, and account details.
- **Databases**: Manages data persistence for notes.

## Authentication Methods in Appwrite

Appwrite's `Account` service exposes various methods to handle user authentication out-of-the-box:
- `account.create(userId, email, password, name)`: Registers a new user.
- `account.createEmailPasswordSession(email, password)`: Authenticates a user and starts a secure session (Login).
- `account.deleteSession('current')`: Terminates the current active session (Logout).
- `account.get()`: Retrieves the details of the currently authenticated user.

## Authentication Service (`AuthService`)

To keep components clean and maintainable, authentication logic is abstracted into an Angular service at `src/app/services/auth/auth.service.ts`. This service acts as a wrapper around the Appwrite SDK.

### Implemented Methods:
- **`register(email, password, name)`**: Creates a new user account with a uniquely generated ID using `ID.unique()`.
- **`login(email, password)`**: Logs the user in by creating an email/password session.
- **`logout()`**: Destroys the current user session, effectively logging them out.
- **`getCurrentUser()`**: Attempts to fetch the current user's profile. If successful, it returns the user object; if it fails (e.g., no active session), it gracefully returns `null`.

## Route Protection (`AuthGuard`)

To ensure that only authenticated users can access specific pages (like viewing or editing notes), the application uses an Angular Route Guard located at `src/app/guards/auth/auth.guard.ts`.

The `authGuard` is implemented as a `CanActivateFn`:
1. It injects the `AuthService` and Angular `Router`.
2. It calls `authService.getCurrentUser()` to verify if a valid session exists.
3. If a user is authenticated, it returns `true`, permitting navigation to the requested route.
4. If no user is authenticated, it prevents access and redirects the user to the `/login` page by returning a `UrlTree`.

## Application Routes (`app.routes.ts`)

The routing configuration in `src/app/app.routes.ts` defines the navigation structure of the app and dictates which routes are public and which are private.

### Route Breakdown:
- **`/` (Notes Home)**: Renders the `NotesHomeComponent`. **Protected** by `authGuard`.
- **`/login`**: Renders the `LoginComponent`. Publicly accessible.
- **`/register`**: Renders the `RegisterComponent`. Publicly accessible.
- **`/notes/:id`**: Renders the `NoteViewComponent` to display a specific note. **Protected** by `authGuard`.
- **`/notes/:id/edit`**: Renders the `NoteEditComponent` to modify an existing note. **Protected** by `authGuard`.
- **`**` (Wildcard)**: Acts as a fallback, redirecting any invalid or unknown URLs back to the home route.
