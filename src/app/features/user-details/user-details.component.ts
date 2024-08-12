import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { catchError, of } from 'rxjs';
import { User } from '../../shared/user.interface';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterLink],
  providers: [UserService],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  userService = inject(UserService)
  users: User[] = [];

  retrieveUsers() {
    this.userService.getUsers().pipe(
      catchError(error => {
        console.error("Failed to retrieve users", error)
        return of([])
      })
    ).subscribe( (data: User[]) => {
      {
        this.users = data
      }
    })
  }
}
