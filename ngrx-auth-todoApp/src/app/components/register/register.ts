import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as authSelector from './../../auth/auth.selector'
import * as authActions from './../../auth/auth.actions'
import {FormsModule ,NgForm} from '@angular/forms'
@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private store = inject(Store)

  isLoading$ : Observable<boolean | null> = this.store.select(authSelector.selectIsLoading)
  isError$ : Observable<string | null> = this.store.select(authSelector.selectAuthError)

  constructor(){
    this.isError$.subscribe(err => {
      console.log('isError$',err)
    })
  }

  onSubmitForm(form : NgForm){
      if(form.invalid){
         return
      }
      const {name, email, password} = form.value
      this.store.dispatch(authActions.registerUser({credentials : {name, email, password} }))
  }
  
}
