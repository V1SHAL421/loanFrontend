import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../core/authentication/supabase.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [SupabaseService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  fb = inject(FormBuilder)
  router = inject(Router)
  supabase = inject(SupabaseService)
  signUpForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(6)],
    confirmPassword: ['', Validators.required]
  })
  errorMessage: string | null = null
  loading = false

  onSubmit(): void {
    this.loading = true
    const rawForm = this.signUpForm.getRawValue()
    if (rawForm.password !== rawForm.confirmPassword) {
      this.errorMessage = "Passwords do not match"
      return
    }
    // Need to return an observable for subscribe method
    this.supabase.signUp(rawForm.email, rawForm.username, rawForm.password).subscribe(
      result => {
        if (result.error) {
          this.errorMessage = result.error.message
        } else {
          this.router.navigateByUrl('/login')
        }
      }
    )
    this.loading = false
  }
}