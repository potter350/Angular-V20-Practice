import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.model";
import * as fromAuth from "./auth.reducers";

// createFeatureSelector is to get whole state 
export const selectAuthState = createFeatureSelector<AuthState>(fromAuth.authFeatureKey)

//createselector is to get specific state
export const selectUser = createSelector(
    selectAuthState,
    (state) => state.user
)

export const selectToken = createSelector(
    selectAuthState,
    (state) => state.token
) 

export const selectIsLoading = createSelector(
    selectAuthState,
    (state)=> state.isLoading
)

export const selectIsLoggedin = createSelector(
    selectAuthState,
    (state) => state.isLoggedIn
)

export const selectAuthError = createSelector(
    selectAuthState,
    (state) => state.error
)

export const selectUserId = createSelector(
    selectUser,
    (user) => user?.id
)