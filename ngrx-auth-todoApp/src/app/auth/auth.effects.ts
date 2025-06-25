// Core Angular and NgRx imports
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import * as fromAuth from './auth.actions'
import { catchError, exhaustMap, map, of, tap } from "rxjs";

// Marks this class as injectable so Angular can use it
@Injectable()
export class AuthEffects {

  // Injecting required services using Angular's inject() function
  private actions$ = inject(Actions);          // Observable of all dispatched actions
  private authService = inject(AuthService);   // Our custom service for calling APIs
  private router = inject(Router);             // Angular service for navigation

  // 🔁 Effect: Handles user registration
  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuth.registerUser), // Listen for 'registerUser' action
      exhaustMap(action =>           // Ignore future calls until this finishes (avoids duplicate requests)
        this.authService.registerUser(action.credentials).pipe( // Call API
          map(user => fromAuth.registerSuccess({ user })),      // If success, dispatch 'registerSuccess' with user data
          catchError(error => of(fromAuth.registerFailure(error))) // If error, dispatch 'registerFailure'
        )
      )
    )
  );

  // ✅ Effect: After successful registration, show alert and redirect to login
  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuth.registerSuccess), // Listen for success action
      tap(() => {
        alert('Registration is successful');   // Show message
        this.router.navigate(['/login']);      // Navigate to login page
      })
    ),
    { dispatch: false } // This effect does not dispatch a new action
  );

  // 🔁 Effect: Handles user login
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuth.loginUser), // Listen for login action
      exhaustMap(action =>
        this.authService.loginUser(action.credentials).pipe( // Call login API
          map(authResponse => fromAuth.loginSuccess({ authResponse })), // On success, dispatch loginSuccess
          catchError(error => of(fromAuth.loginFailure(error)))         // On failure, dispatch loginFailure
        )
      )
    )
  );

  // ✅ Effect: After successful login, navigate to the "todos" page
  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuth.loginSuccess),     // When login is successful
      tap(() => this.router.navigate(['/todos'])) // Redirect to the /todos page
    ),
    { dispatch: false } // No action is dispatched from this effect
  );

  // 🔁 Effect: On logout, navigate user to login page
  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuth.logout), // Listen for logout action
      tap(() => this.router.navigate(['/login'])) // Redirect to login page
    ),
    { dispatch: false } // This effect also just performs a side effect (navigation)
  );
}






// Concept	Meaning
// createEffect()	Defines a function that listens to certain actions and performs side tasks (side effects)
// ofType(...)	Filters for specific actions only (like registerUser)
// exhaustMap()	Prevents multiple API calls at once by ignoring new ones until the current one finishes
// map(...)	Used to transform a successful response into a new action
// catchError(...)	Used to catch any API errors and dispatch a failure action
// tap(...)	Used to perform an action (like navigation or alert) without dispatching a new action
// { dispatch: false }	Tells NgRx that this effect is only for side effects and won’t send any action back to the store