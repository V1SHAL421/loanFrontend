import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../../layouts/header/header.component";
import { HomeComponent } from '../../home/home.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../../layouts/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive, HeaderComponent, HomeComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}

