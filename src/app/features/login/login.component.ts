import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../../core/authentication/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  providers: [SupabaseService], // Created by Angular's dependency injection system
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 readonly signInForm: FormGroup
  
  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder,
  
    // private signInForm
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  loading = false


  async submit(): Promise<void> {
    if (this.signInForm.valid) {
      this.loading = true
      try {

          const {error} = await this.supabase.signIn(this.signInForm.value.email, this.signInForm.value.password)
          if(error) {
            throw error
          }
        }
        catch (error) {
          console.error(error)
        }
        finally {
          this.signInForm.reset()
          this.loading = false
        }
    }
  
  else {
    console.error('Form is invalid')
    this.signInForm.markAllAsTouched();
  }

}
}
