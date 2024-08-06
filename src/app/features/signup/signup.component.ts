import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
  loading = false
  readonly signUpForm: FormGroup
  constructor(private readonly supabase: SupabaseService) {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  async submitForm(): Promise<void> {

    try {
      if (this.signUpForm.value.password != this.signUpForm.value.confirmPassword) {
        throw new Error("Passwords do not match")
    }
      this.loading = true
      const { error } = await this.supabase.signUp(
        this.signUpForm.value.email ?? '',
        this.signUpForm.value.password ?? ''
      )
      if (error) throw error
      alert('Sign up is successful')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
      else {
        console.error('Unexpected error occurred', error)
        alert(`Unexpected error occurred: ${error}`)
      }
    } finally {
      this.signUpForm.reset()
      this.loading = false
    }
  }
}
