import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Loan } from '../../shared/loan.interface';
import { LoanService } from '../../services/loan.service';
import { Observable, catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [RouterLink, CommonModule, MatCardModule],
  providers: [LoanService],
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.css'
})
export class LoanComponent {
  loanService = inject(LoanService)

  // Observable
  myObservable = new Observable((observer) => {
    observer.next([1, 2, 3, 4])
  })

  // Observer
  retrieveUsers() {
    this.myObservable.subscribe((data: any) => {
      this.loans = data
    });
  }

  loans: Loan[] = []

  ngOnInit() {
    this.loanService.getLoanPeriod("12").pipe(
      catchError(error => {
        console.error(error)
        return of([])
      })
    ).subscribe( (data: any) => {
      {
        this.loans = data
      }
    })
  }

}
