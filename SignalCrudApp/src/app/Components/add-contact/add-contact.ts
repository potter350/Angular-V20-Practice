import { Component, inject, signal } from '@angular/core';
import { Contactform } from '../contactform/contactform';
import { Contact } from '../../models/models/contact.model';
import { ContactService } from '../../services/contact-service';
import { Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-contact',
  imports: [Contactform,MatProgressSpinnerModule],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.scss'
})
export class AddContact {
  titleValue = 'Add New Contact'
  apiService = inject(ContactService)
  router = inject(Router)

  saving = signal(false)

  

  savingContact(contact:Contact){
    this.saving.set(true)
    this.apiService.addContact(contact)
    this.saving.set(false)
    this.router.navigate(['/'])
  }
}
