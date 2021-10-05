import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Injectable } from '@angular/core';
import { Repository } from 'projects/modules/repository';
import { TreatmentLocation } from 'projects/models/treatmentlocation.model';

@Injectable()
export class TreatmentLocationsResolver implements Resolve<TreatmentLocation[]> {
    private tlObservable: Observable<TreatmentLocation[]> = new Observable<TreatmentLocation[]>();
    private tlSub: Subscription = new Subscription;
    
  constructor(private repo: Repository) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TreatmentLocation[]> | Promise<TreatmentLocation[]> | TreatmentLocation[] {

    this.tlObservable = new Observable((observer: { next: (arg0: TreatmentLocation[]) => void; complete: () => void; }) => {
      
      const that = this;
      
      this.tlSub = this.repo.treatmentLocationsChanged.subscribe(tl => {
        observer.next(tl);
        observer.complete();
      });

      return {
        unsubscribe() {
          that.tlSub.unsubscribe();
        }
      };
      
    });

    this.repo.getTreatmentLocations();
    
    return this.tlObservable;
  }
}
