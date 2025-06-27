import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { ActionReducer, provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { authReducer } from './auth/auth.reducers';
import { todosReducer } from './todo/todo.reducer';
import { AuthEffects } from './auth/auth.effects';
import { TodoEffects } from './todo/todo.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideStore({
      auth:authReducer,
      todo:todosReducer
    }),
    provideEffects([AuthEffects, TodoEffects]),
    provideHttpClient()
  ]
};
