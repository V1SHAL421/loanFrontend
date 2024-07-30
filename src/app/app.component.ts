import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'loanAppFrontend';
}

// /src/app/features/user-profile/
//   /components
//     profile.component.ts
//     profile.component.html
//     profile.component.scss
//     profile.component.spec.ts  // Test for the profile component
//   /services
//     profile.service.ts
//     profile.service.spec.ts    // Test for the profile service
//   user-profile.module.ts
//   user-profile-routing.module.ts