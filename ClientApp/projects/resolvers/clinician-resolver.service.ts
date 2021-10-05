import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Clinician } from 'projects/models/clinician.model';
import { Injectable } from '@angular/core';
import { Repository } from 'projects/modules/repository';

@Injectable()
export class ClinicianResolver implements Resolve<Clinician> {
  private clinicianObservable: Observable<Clinician> = new Observable<Clinician>();
  private clinicianSub: Subscription = new Subscription();
  private clinicianId: number = 0;

  constructor(private repo: Repository) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Clinician> | Promise<Clinician> | Clinician {
    this.clinicianId = route.params.id;

    this.clinicianObservable = new Observable(
      (observer: { next: (arg0: Clinician) => void; complete: () => void }) => {
        const that = this;

        this.clinicianSub = this.repo.clinicianChanged.subscribe((c) => {
          observer.next(c);
          observer.complete();
        });

        return {
          unsubscribe() {
            that.clinicianSub.unsubscribe();
          },
        };
      }
    );

    this.repo.getClinician(this.clinicianId);

    return this.clinicianObservable;
  }
}
