import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../../layouts/header/header.component";
import { HomeComponent } from '../../home/home.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../../layouts/footer/footer.component";
import { SupabaseService } from '../../../core/authentication/supabase.service';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive, HeaderComponent, HomeComponent, FooterComponent],
  providers: [SupabaseService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // This will cause an error because TS is not certain that supabase has been initialized
  // Hence, we need to use OnInit lifecycle hook to set up session after component construction
  // is complete.
  // private session: Session | null
  constructor(private readonly supabase: SupabaseService) {}

  // ngOnInit(): void {
  //   this.session = this.supabase.session
  // }



}

