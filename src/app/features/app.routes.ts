import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoanComponent } from './loan/loan.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent)},
    { path: 'loan', loadComponent: () => import('./loan/loan.component').then((c) => c.LoanComponent), canActivate: [AuthGuard] },
    { path: 'signup', loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent)},
    { path: 'user-details', loadComponent: () => import('./user-details/user-details.component').then((c) => c.UserDetailsComponent), canActivate: [AuthGuard]}
    // { path: '**', component: NotFoundComponent }
];
