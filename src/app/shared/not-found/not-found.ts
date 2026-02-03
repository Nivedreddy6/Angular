import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-not-found',
  imports: [CommonModule, RouterModule, MatButtonModule],
  template: `
    <div class="not-found">
      <h1>404</h1>
      <br>
      <br>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>

      <button mat-raised-button color="primary" routerLink="/dashboard">
        Go to Dashboard
      </button>
    </div>
  `,
  styles: [`
    .not-found {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    h1 {
      font-size: 96px;
      margin: 0;
    }
    h2 {
      margin: 8px 0;
    }
  `]
})
export class NotFoundComponent {}