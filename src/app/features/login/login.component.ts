import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
  fb = inject(FormBuilder)
  router = inject(Router)
  supabase = inject(SupabaseService)
  signInForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(6)],
  })
  errorMessage: string | null = null
  loading = false

  onSubmit() {
    this.loading = true
    const rawForm = this.signInForm.getRawValue()
    this.supabase.signIn(rawForm.email, rawForm.password).subscribe(result => {
      if (result.error) {
        this.errorMessage = result.error.message
      } else {
        this.router.navigateByUrl('/user-details')
      }
    })
    this.loading = false
    }

  }



//  readonly signInForm: FormGroup
  
//   constructor(
//     private readonly supabase: SupabaseService,
//   ) {
//     this.signInForm = new FormGroup({
//       email: new FormControl('', [Validators.required, Validators.email]),
//       password: new FormControl('', [Validators.required, Validators.minLength(6)])
//     })
//   }

//   loading = false


//   async submitForm(): Promise<void> {
//     try {
//       this.loading = true
//       const { error } = await this.supabase.signIn(
//         this.signInForm.value.email ?? '',
//         this.signInForm.value.password ?? ''
//       )
//       if (error) throw error
//       alert('Sign in is successful')
//     } catch (error) {
//       if (error instanceof Error) {
//         alert(error.message)
//       }
//       else {
//         console.error('Unexpected error occurred', error)
//         alert(`Unexpected error occurred: ${error}`)
//       }
//     } finally {
//       this.signInForm.reset()
//       this.loading = false
//     }



    