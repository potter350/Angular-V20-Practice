
// creating user
export interface User{
    id:string;
    name:string;
    email:string;
}

// logging in
export interface AuthResponse{
    user : User;
    accessToken: string;
}

//after sometime to check user is logged in or not
export interface AuthState{
    user: User | null;
    token:string | null;
    isLoggedIn: boolean | null;
    isLoading:boolean | null;
    error: string | null;
}