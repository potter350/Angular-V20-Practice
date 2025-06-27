import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as authSelector from './../../auth/auth.selector'
import * as authActions from './../../auth/auth.actions'
import {FormsModule , NgForm} from '@angular/forms'
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private store = inject(Store)
  isLoading$ : Observable<boolean | null> = this.store.select(authSelector.selectIsLoading)
  isError$ : Observable< string | null> = this.store.select(authSelector.selectAuthError)

  onSubmitForm(form: NgForm){
      if(form.invalid){
        return
      }
      const {email, password} = form.value
      this.store.dispatch(authActions.loginUser( { credentials :{email, password}} ))
  }
}
