import { Component, computed, effect, inject, resource, signal } from '@angular/core';
import { ContactService } from '../../services/contact-service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-listcontact',
  imports: [MatProgressSpinnerModule,MatListModule,MatButtonModule,MatIconModule,RouterModule],
  templateUrl: './listcontact.html',
  styleUrl: './listcontact.scss'
})
export class Listcontact {
  deleting = signal(false)
  apiService = inject(ContactService)
  contactResource = resource({
     loader : () => this.apiService.listContacts()
  })


  loading = computed(
    () => this.deleting() || this.contactResource.isLoading()
  )
 
   async deleteContact(contactId:string){
    
    this.deleting.set(true)
    await this.apiService.deleteContact(contactId)
    this.deleting.set(false)
    return this.contactResource.reload()

  }

  
  console(){
    console.log('contactResource.value()',this.contactResource.value())
  }

}
