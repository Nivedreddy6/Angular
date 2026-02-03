import { CanDeactivateFn } from '@angular/router';

/**
 * Any component that wants to block navigation
 * must implement this interface
 */
export interface CanExit {
  canExit(): boolean;
}

export const canDeactivateGuard: CanDeactivateFn<CanExit> = (component) => {
  return component.canExit ? component.canExit() : true;
};
