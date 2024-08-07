import { Injectable } from '@angular/core'
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
    private supabase: SupabaseClient
    _session: AuthSession | null = null


constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
}

get session() {
    this.supabase.auth.getSession().then(({ data }) => {
        this._session = data.session
    })
    return this._session
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
    return this.supabase.auth.signOut()
}
}