import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, asyncScheduler, scheduled } from 'rxjs';
import { User } from '../shared/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // private apiUrl = 'http://localhost:8080/user'
  private apiUrl = `${environment.API_URL}/user`
  // 172.22.0.2 172.19.0.2 
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
