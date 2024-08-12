import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, asyncScheduler, scheduled } from 'rxjs';
import { User } from '../shared/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://localhost:8080/user'
  http = inject(HttpClient)

  getUsers(): Observable<User[]> {
    const promise = this.http.get<User[]>(`${this.apiUrl}/users`)
    return scheduled(promise, asyncScheduler)
  }

  getUserByName(name: string): Observable<User> {
    const promise = this.http.get<User>(`${this.apiUrl}/${name}`)
    return scheduled(promise, asyncScheduler)
  }

  getUserByAge(age: string): Observable<User> {
    const promise = this.http.get<User>(`${this.apiUrl}/age/${age}`)
    return scheduled(promise, asyncScheduler)
  }

}
