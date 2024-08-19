import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable, Subscription, catchError, of } from 'rxjs';
import { User } from '../../shared/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [UserService],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  userService = inject(UserService)
  // subscription = inject(Subscription)
  users: User[] = [];

  // In RxJS, the observable emits data and the observer uses the data
  // In order to use the data emitted by the observable, the observer has to subscribe to it
  // Then the observer can be notified that the observable has emitted data and receives the data
  
  // Observable
  myObservable = new Observable((observer) => {
    observer.next([1, 2, 3, 4])
  })

  // Observer
  retrieveUsers() {
    this.myObservable.subscribe((data: any) => {
      this.users = data
    });
  }

  ngOnInit() {
    // this.subscription
    this.userService.getUsers().pipe(
      catchError(error => {
        console.error("Failed to retrieve users", error)
        return of([])
      })
    ).subscribe( (data: User[]) => { // Subscribes to the Observable returned by the pipe() function
      {
        console.log(`The data returned from getUsers is: ${JSON.stringify(data)}`)
        this.users = data
      }
    })
  }
}
