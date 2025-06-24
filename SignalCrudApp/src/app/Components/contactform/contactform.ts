import { Component, input, linkedSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Contact } from '../../models/models/contact.model';

@Component({
  selector: 'app-contactform',
  imports: [FormsModule,MatButtonModule,MatInputModule,MatFormFieldModule,RouterLink],
  templateUrl: './contactform.html',
  styleUrl: './contactform.scss'
})
export class Contactform {
 
  title = input<string>('')  // signal input declaration to receive
  contact = input<Contact>()

  //linkedsignal is also like computed signal depends on signal but it can have its function and not readonly.
  name = linkedSignal(() => this.contact()?.name ?? '' )
  email = linkedSignal(() => this.contact()?.email ?? '' )
  mobile = linkedSignal(() => this.contact()?.phone ?? '' )

  save = output<Contact>()

  onFormSubmit(){
    
    this.save.emit({
      id : this.contact()?.id ?? '',
      name : this.name(),
      email : this.email(),
      phone : this.mobile()
    })
  }
}
