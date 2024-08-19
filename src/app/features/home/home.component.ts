import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'loanAppFrontend';
}
