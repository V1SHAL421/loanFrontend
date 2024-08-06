import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../../core/authentication/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  providers: [SupabaseService], // Created by Angular's dependency injection system
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 readonly signInForm: FormGroup
  
  constructor(
    private readonly supabase: SupabaseService,
  ) {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  loading = false


  async submitForm(): Promise<void> {
    try {
      this.loading = true
      const { error } = await this.supabase.signIn(
        this.signInForm.value.email ?? '',
        this.signInForm.value.password ?? ''
      )
      if (error) throw error
      alert('Sign in is successful')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
      else {
        console.error('Unexpected error occurred', error)
        alert(`Unexpected error occurred: ${error}`)
      }
    } finally {
      this.signInForm.reset()
      this.loading = false
    }



    
    //   if (this.signInForm.valid) {
  //     this.loading = true
  //     try {

  //         const {error} = await this.supabase.signIn(this.signInForm.value.email, this.signInForm.value.password)
  //         if(error) {
  //           throw error
  //         }
  //       }
  //       catch (error) {
  //         console.error(error)
  //       }
  //       finally {
  //         this.signInForm.reset()
  //         this.loading = false
  //       }
  //   }
  
  // else {
  //   console.error('Form is invalid')
  //   // this.signInForm.markAllAsTouched();
  // }

}
}
