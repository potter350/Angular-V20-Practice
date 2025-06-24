import { Component, computed, inject, input, resource, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Contact } from '../../models/models/contact.model';
import { ContactService } from '../../services/contact-service';
import { Contactform } from '../contactform/contactform';

@Component({
  selector: 'app-edit-contact',
  imports: [Contactform,MatProgressSpinnerModule],
  templateUrl: './edit-contact.html',
  styleUrl: './edit-contact.scss'
})
export class EditContact {
  titleValue = 'Edit Existing Contact'
  apiService = inject(ContactService)
  router = inject(Router)
   id = input.required<string>()

  saving = signal(false)

  contactResource = resource({
     loader : () => this.apiService.getContact(this.id())
  })

  loading = computed(
      () =>  this.contactResource.isLoading() || this.saving()
  )

  async updateContact(contact:Contact){
    this.saving.set(true)
    await this.apiService.updateContact(contact)
    this.saving.set(false)
    this.router.navigate(['/'])
  }

}
