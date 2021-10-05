import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Injectable } from '@angular/core';
import { Repository } from 'projects/modules/repository';
import { Sex } from 'projects/models/sex.model';

@Injectable()
export class SexesResolver implements Resolve<Sex[]> {
    private sexObservable: Observable<Sex[]> = new Observable<Sex[]>();
    private sexSub: Subscription = new Subscription;

  constructor(private repo: Repository) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Sex[]> | Promise<Sex[]> | Sex[] {

    this.sexObservable = new Observable((observer: { next: (arg0: Sex[]) => void; complete: () => void; }) => {
      
      const that = this;
      
      this.sexSub = this.repo.sexesChanged.subscribe(s => {
        observer.next(s);
        observer.complete();
      });

      return {
        unsubscribe() {
          that.sexSub.unsubscribe();
        }
      };
      
    });

    this.repo.getSexes();
    
    return this.sexObservable;
  }
}
