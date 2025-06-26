import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectIsLoggedin } from "./auth.selector";
import { map, take } from "rxjs";


export const authGuard : CanActivateFn = (state,route) => {
  
    const store = inject(Store)
    const router = inject(Router)

    return store.select(selectIsLoggedin).pipe(
        take(1),
        map(isLoggedIn  => {
            if(isLoggedIn){
                return true;
            }else{
                router.navigate(['/login'])
                return false;
            }
        })
    )
}