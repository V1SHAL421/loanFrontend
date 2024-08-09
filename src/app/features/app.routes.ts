import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoanComponent } from './loan/loan.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'loan', component: LoanComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent},
    { path: 'user-details', component: UserDetailsComponent, canActivate: [AuthGuard]}
    // { path: '**', component: NotFoundComponent }
];
