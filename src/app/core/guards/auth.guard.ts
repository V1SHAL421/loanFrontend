import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SupabaseService } from '../authentication/supabase.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  supabase = inject(SupabaseService)
  router = inject(Router)

  async canActivate(): Promise<boolean> {
    console.log("The supabase session is", this.supabase.currentUser)
    if (this.supabase.currentUser()) {
      return true;
    } else {
      const refreshed = await this.supabase.refreshToken();
      if (!(refreshed && this.supabase.currentUser)) {
        this.router.navigateByUrl('/login');
        return false;
      } else {
        return true
      }
      
    }
  }
}
