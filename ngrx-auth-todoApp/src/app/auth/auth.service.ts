// Import necessary modules and functions
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, switchMap, throwError } from "rxjs";
import { AuthResponse, User } from "./auth.model";
import { v4 as uuidv4 } from 'uuid'; // Generates unique user ID

@Injectable({
  providedIn: 'root' // Makes this service available globally in the app
})
export class AuthService {
  // Inject the HttpClient to make HTTP calls
  private http = inject(HttpClient);

  // URL to your mock API (e.g., json-server or backend)
  private userUrl = 'http://localhost:3000/users';

  /**
   * Register a new user
   * @param credentials - name, email, password
   * @returns Observable<User> - newly registered user (excluding password)
   */
  registerUser(credentials: { name: string, email: string, password: string }): Observable<User> {
    // Create a new user object (excluding password)
    const newUser = {
      id: uuidv4(),                    // Generate unique ID for user
      name: credentials.name,
      email: credentials.email
    };

    // Combine password into the object to store in DB
    const userToSave = { ...newUser, password: credentials.password };

    // Step 1: Check if the email already exists in DB
    return this.http.get<User[]>(`${this.userUrl}?email=${credentials.email.toLowerCase()}`).pipe(
      switchMap(existingUser => {
        // If user exists, throw error
        if (existingUser.length > 0) {
          return throwError(() => new Error('Email already exist in db'));
        }

        // Step 2: If not exists, save new user to the DB
        return this.http.post<User>(this.userUrl, userToSave).pipe(
          // Only return public user info (without password)
          map(() => newUser)
        );
      }),
      // Handle errors in both GET and POST calls
      catchError(this.handleError)
    );
  }

  /**
   * Login a user by email and password
   * @param credentials - email and password
   * @returns Observable<AuthResponse> - user (without password) and mock access token
   */
  loginUser(credentials: { email: string, password: string }): Observable<AuthResponse> {
    // Attempt to find a user with matching email & password
    return this.http.get<any[]>(`${this.userUrl}?email=${credentials.email.toLowerCase()}&password=${credentials.password}`).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];

          // Destructure to remove password before returning
          const { password, ...userWithoutPassword } = user;

          // Return user data + mock token
          return {
            user: userWithoutPassword,
            accessToken: `mocktoken-${user.id}-${new Date().getTime()}`
          };
        } else {
          // If no matching user found, throw error
          throw new Error('Invalid Email or Password');
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Handles any HTTP or logic errors
   * @param error - error object from catchError
   * @returns Observable<never> - throws error for subscribers
   */
  private handleError(error: any): Observable<never> {
    console.error('AuthService Error:', error); // Log to console for debugging

    let errorMessage = 'An unknown error occurred during authentication.';

    // Use custom error message if available
    if (error.message) {
      errorMessage = error.message;
    } else if (error.status) {
      errorMessage = `Server error: ${error.status}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
