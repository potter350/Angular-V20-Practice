
// take state , based on action change state - reducers

import { createReducer, on } from "@ngrx/store";
import { AuthState } from "./auth.model";
import * as AuthActions from './auth.actions'

export const authFeatureKey = 'auth';

//defining initial state
export const initialState : AuthState = {
    user: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null
}

export const authReducer = createReducer(
    initialState,

    on( AuthActions.registerUser, (state) => ({
        ...state,
        isLoading:false,
        error:null
    }) ),

    on( AuthActions.registerSuccess, (state, {user}) => ({
        ...state,
        isLoading:false,
        error:null
    }) ),

    on(AuthActions.registerFailure, (state, {error}) => ({
        ...state,
        isLoading:false,
        error : error?.message || 'Registration Failed'
    })),

    on(AuthActions.loginUser, (state )=>({
        ...state,
        isLoading: true,
        error: null
    }) ),

    on(AuthActions.loginSuccess, (state, {authResponse}) =>({
        ...state,
        user : authResponse.user,
        isLoading:false,
        isLoggedIn : true,
        token : authResponse.accessToken,
        error : null
    })),

    on(AuthActions.loginFailure, (state, {error}) =>({
        ...state,
        user : null,
        isLoading:false,
        isLoggedIn : false,
        token : null,
         error : error?.message || 'Login Failed'
    })),

    on(AuthActions.logout, () =>({
        ...initialState
    }) )





    




)

