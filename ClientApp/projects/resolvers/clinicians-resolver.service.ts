import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Clinician } from 'projects/models/clinician.model';
import { Repository } from 'projects/modules/repository';

@Injectable()
export class CliniciansResolver implements Resolve<Clinician[]>, OnDestroy {
    private cliniciansObservable: Observable<Clinician[]> = new Observable<Clinician[]>();
    private cliniciansSub: Subscription = new Subscription;

  constructor(private repo: Repository) {
    
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Clinician[]> | Promise<Clinician[]> | Clinician[] {

    this.cliniciansObservable = new Observable((observer: { next: (arg0: Clinician[]) => void; complete: () => void; }) => {
      
      const that = this;
      
      this.cliniciansSub = this.repo.cliniciansChanged.subscribe(c => {
        observer.next(c);
        observer.complete();
      });

      return {
        unsubscribe() {
          that.cliniciansSub.unsubscribe();
        }
      };
      
    });

    this.repo.getClinicians();
    
    return this.cliniciansObservable;
  }

  ngOnDestroy() {
    console.log('In OnDestroy');
    
  }

}
