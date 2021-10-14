import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchService } from './search.service';

export interface CanComponentActivate {
  canActivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanActivatePatientsGuard implements CanActivate {

  constructor(private searchService: SearchService){}

  canActivate(currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.searchService.canActivate();
  }
}  
