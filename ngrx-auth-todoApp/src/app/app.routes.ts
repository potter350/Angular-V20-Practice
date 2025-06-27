import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'register',
        loadComponent : ()=> import('./components/register/register').then(c => c.Register)
    },
    {
        path:'login',
        loadComponent: ()=>import('./components/login/login').then(c => c.Login)
    },
    {
        path:'todos',
        loadComponent: ()=>import('./components/todo/todo').then(c => c.Todo)
    }
];
