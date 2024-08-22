import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../../layouts/header/header.component";
import { HomeComponent } from '../../home/home.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../../layouts/footer/footer.component";
import { SupabaseService } from '../../../core/authentication/supabase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive, HeaderComponent, HomeComponent, FooterComponent],
  providers: [SupabaseService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // This will cause an error because TS is not certain that supabase has been initialized
  // Hence, we need to use OnInit lifecycle hook to set up session after component construction
  // is complete.
  // private session: Session | null
  supabaseService = inject(SupabaseService)

  ngOnInit(): void {
    this.supabaseService.supabase.auth.onAuthStateChange((event, session) => {
      // console.log('!!', event, session)
      if (event == 'SIGNED_IN') {
        this.supabaseService.currentUser.set({
          email: session?.user.email!,
          username: 
            session?.user.identities?.at(0)?.identity_data?.['username']
      });
      } else if (event == 'SIGNED_OUT') {
        this.supabaseService.currentUser.set(null)
      }
    })
  }

}

