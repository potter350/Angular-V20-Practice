import { Injectable } from '@angular/core';
import { Contact } from '../models/models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private delay = 1000;
  private contacts: Contact[] = [
    {
      id: '1',
      name: 'Bibbye Gutcher',
      phone: '885-131-9176',
      email: 'bgutcher0@smh.com.au',
    },
    {
      id: '2',
      name: 'John Smith',
      phone: '555-123-4567',
      email: 'john.smith@email.com',
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      phone: '555-234-5678',
      email: 'sarah.j@email.com',
    },
    {
      id: '4',
      name: 'Michael Williams',
      phone: '555-345-6789',
      email: 'mwilliams@email.com',
    },
    {
      id: '5',
      name: 'Emma Brown',
      phone: '555-456-7890',
      email: 'emma.b@email.com',
    },
    {
      id: '6',
      name: 'James Davis',
      phone: '555-567-8901',
      email: 'james.d@email.com',
    },
    {
      id: '7',
      name: 'Lisa Garcia',
      phone: '555-678-9012',
      email: 'lisa.g@email.com',
    },
    {
      id: '8',
      name: 'David Miller',
      phone: '555-789-0123',
      email: 'david.m@email.com',
    },
    {
      id: '9',
      name: 'Jennifer Wilson',
      phone: '555-890-1234',
      email: 'jwilson@email.com',
    },
    {
      id: '10',
      name: 'Robert Taylor',
      phone: '555-901-2345',
      email: 'rtaylor@email.com',
    },
    {
      id: '11',
      name: 'Maria Martinez',
      phone: '555-012-3456',
      email: 'maria.m@email.com',
    },
    {
      id: '12',
      name: 'Daniel Anderson',
      phone: '555-123-7890',
      email: 'dan.a@email.com',
    },
    {
      id: '13',
      name: 'Patricia Thomas',
      phone: '555-234-8901',
      email: 'pat.t@email.com',
    },
    {
      id: '14',
      name: 'Kevin Lee',
      phone: '555-345-9012',
      email: 'kevin.l@email.com',
    },
    {
      id: '15',
      name: 'Nancy White',
      phone: '555-456-0123',
      email: 'nancy.w@email.com',
    },
    {
      id: '16',
      name: 'Christopher Moore',
      phone: '555-567-1234',
      email: 'chris.m@email.com',
    },
    {
      id: '17',
      name: 'Amanda Jackson',
      phone: '555-678-2345',
      email: 'amanda.j@email.com',
    },
    {
      id: '18',
      name: 'Joseph Martin',
      phone: '555-789-3456',
      email: 'joe.m@email.com',
    },
    {
      id: '19',
      name: 'Michelle Thompson',
      phone: '555-890-4567',
      email: 'michelle.t@email.com',
    },
    {
      id: '20',
      name: 'Ryan Rodriguez',
      phone: '555-901-5678',
      email: 'ryan.r@email.com',
    },
    {
      id: '21',
      name: 'Sandra Lewis',
      phone: '555-012-6789',
      email: 'sandra.l@email.com',
    },
  ];

// generating uniqurid by finding max then + 1 return as string
  private generateUniqueId():string {
      let existingIds = this.contacts.map((c)=> parseInt(c.id) ) 
      let maxId = Math.max(...existingIds)
      return (maxId + 1).toString()
  }

  private simulateDelay():Promise<Contact>{
     return new Promise((resolve)=> setTimeout(resolve, this.delay))
  }

  async listContacts():Promise<Contact[]> {
    await this.simulateDelay()
    return this.contacts
  }

  async addContact(contact:Contact):Promise<Contact> {
    await this.simulateDelay()
    let newContact = {
       ...contact,
       id : this.generateUniqueId()
    }
     this.contacts.unshift(newContact)
     return newContact
  }

  async deleteContact(id:string):Promise<Contact[]>{
    this.simulateDelay()
    this.contacts = this.contacts.filter((c)=>c.id !== id)
    return this.contacts
  }

  async updateContact(contact:Contact):Promise<Contact>{
     this.simulateDelay()
     const index = this.contacts.findIndex((c)=> c.id === contact.id )
     if(index == -1 ){
      throw new Error('contact not found')
     }
     this.contacts[index] = contact
     return contact
  }

  async getContact(id:string):Promise<Contact>{
     await this.simulateDelay()
     let contact = this.contacts.find((c)=> c.id == id)
      if(!contact ){
      throw new Error('contact not found')
     }
     return contact
  }



}
