import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, asyncScheduler, scheduled } from 'rxjs';
import { Loan } from '../shared/loan.interface';

@Injectable({
  providedIn: 'root'
})
export class LoanService {


  private apiUrl = `${environment.API_URL}/loan`

  http = inject(HttpClient)
  

  getLoanAmount(amount: string): Observable<Loan[]> {
    const promise = this.http.get<Loan[]>(`${this.apiUrl}/amount/${amount}`)
    return scheduled(promise, asyncScheduler)
  }

  getLoanPeriod(loanPeriod: string): Observable<Loan> {
    const promise = this.http.get<Loan>(`${this.apiUrl}/${loanPeriod}`)
    return scheduled(promise, asyncScheduler)
  }

}
