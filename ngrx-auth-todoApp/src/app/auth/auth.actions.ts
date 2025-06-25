
// explain / define actions in auth
import { createAction, props } from '@ngrx/store';
import { AuthResponse, User } from './auth.model';

//actionName = createAction( ' [source] event ', props<{}>() )

export const registerUser = createAction(
   '[Auth Page] Register User',
    props<{ credentials:{name:string,email:string,password:string} }>()
)

export const registerSuccess = createAction(
    '[Auth Api] Register User Success',
    props<{user:User}>()
)

export const registerFailure = createAction(
    '[Auth Api] Register User Failure',
    props<{error:any}>()
)

export const loginUser = createAction(
    '[Auth Login Page] User Logging In',
    props< {credentials :{email:string, password:string}} >()
)

export const loginSuccess = createAction(
    '[Auth Api] User Login Success',
    props<{authResponse : AuthResponse}>()
)

export const loginFailure = createAction(
    '[Auth Api] User Login Failure',
    props<{ error : any }>()
)

export const logout = createAction(
    '[App Logout] User Logout'
)