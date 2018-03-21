import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';

@Injectable()
export class AuthChildGuard implements CanActivateChild {
  canActivateChild() {
    return true;
  }
}
