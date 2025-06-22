import { Component, inject, resource, signal } from '@angular/core';
import { ContactService } from '../../services/contact-service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listcontact',
  imports: [MatListModule,MatButtonModule,MatIconModule,RouterModule],
  templateUrl: './listcontact.html',
  styleUrl: './listcontact.scss'
})
export class Listcontact {

  apiService = inject(ContactService)
  contactResource = resource({
     loader : () => this.apiService.listContacts()
  })
 
  deleteContact(contactId:string){
   
  }
  console(){
    console.log('contactResource.value()',this.contactResource.value())
  }

}
