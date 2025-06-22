import { Routes } from '@angular/router';
import { AddContact } from './Components/add-contact/add-contact';
import { EditContact } from './Components/edit-contact/edit-contact';
import { Listcontact } from './Components/listcontact/listcontact';

export const routes: Routes = [
    {
        path:'',
        component:Listcontact,
        pathMatch:'full'
    }
    ,{
        path:'add',
        component:AddContact,
        pathMatch:'full'
    }
    ,{
        path:'edit/:id',
        component:EditContact
    }
];
