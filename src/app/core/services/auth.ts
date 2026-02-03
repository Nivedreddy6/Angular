import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type Role = 'admin' | 'user';

export interface AuthUser {
  username: string;
  role: Role;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private STORAGE_KEY = 'auth_user';

  constructor(private router: Router) {}

  
  login(username: string, password: string): boolean {

    let user: AuthUser | null = null;

    if (username === 'admin' && password === 'admin123') {
      user = { username, role: 'admin' };
    }

    if (username === 'user' && password === 'user123') {
      user = { username, role: 'user' };
    }

    if (!user) {
      return false;
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

  getUser(): AuthUser | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  getRole(): Role | null {
    return this.getUser()?.role ?? null;
  }
}