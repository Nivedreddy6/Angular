import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorService {

  handle(error: any) {
    let message = 'Something went wrong';

    if (typeof error === 'string') {
      message = error;
    } else if (error?.message) {
      message = error.message;
    }

    console.error('Global Error:', error);

    alert(message); 

    return throwError(() => error);
  }
}