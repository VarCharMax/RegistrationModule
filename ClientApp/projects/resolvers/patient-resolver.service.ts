import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Injectable } from '@angular/core';
import { Patient } from 'projects/models/patient.model';
import { Repository } from 'projects/modules/repository';

@Injectable()
export class PatientResolver implements Resolve<Patient>{
  private patientObservable: Observable<Patient> = new Observable<Patient>();
  private patientSub: Subscription = new Subscription();
  private patientId: number = 0;

  constructor(private repo: Repository) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Patient> | Promise<Patient> | Patient {
    this.patientId = route.params.id;
    
    this.patientObservable = new Observable(
      (observer: { next: (arg0: Patient) => void; complete: () => void }) => {
        const that = this;

        this.patientSub = this.repo.patientChanged.subscribe((p) => {
          observer.next(p);
          observer.complete();
        });

        return {
          unsubscribe() {
            that.patientSub.unsubscribe();
          },
        };
      }
    );

    this.repo.getPatient(this.patientId);

    return this.patientObservable;
  }
}
