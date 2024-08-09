import { Injectable, signal } from '@angular/core'
import {
    AuthChangeEvent,
    AuthSession,
    createClient,
    Session,
    SupabaseClient,
    User
} from '@supabase/supabase-js'
import { environment } from '../../../environments/environment'
import { asyncScheduler, from, scheduled } from 'rxjs'

@Injectable({
    providedIn: 'root', // Ensures it is available globally
})
export class SupabaseService {
    supabase: SupabaseClient
    currentUser = signal<{email: string; username: string} | null>(null);


constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
}


authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
}

signIn(email: string, password: string) {
    const promise = this.supabase.auth.signInWithPassword({
        email,
        password,
    })
    return scheduled(promise, asyncScheduler);
}

signUp(email: string, username: string, password: string) {
    const promise = this.supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
            }
        }
    })
    return scheduled(promise, asyncScheduler);
}

signOut() {
    this.supabase.auth.signOut()
}

async refreshToken(): Promise<boolean> {
    const {error} = await this.supabase.auth.refreshSession();
    if (error) {
        console.error("Refresh token error occurred:", error.message)
        return false
    }
    return true
    }
}
