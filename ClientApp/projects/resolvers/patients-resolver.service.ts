import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Injectable } from '@angular/core';
import { Patient } from 'projects/models/patient.model';
import { Repository } from 'projects/modules/repository';

@Injectable()
export class PatientsResolver implements Resolve<Patient[]> {
    private patientsObservable: Observable<Patient[]> = new Observable<Patient[]>();
    private patientsSub: Subscription = new Subscription;

  constructor(private repo: Repository) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Patient[]> | Promise<Patient[]> | Patient[] {
    
    this.patientsObservable = new Observable((observer: { next: (arg0: Patient[]) => void; complete: () => void; }) => {
      const that = this;
      
      this.patientsSub = this.repo.patientsChanged.subscribe(p => {
        observer.next(p);
        observer.complete();
      });

      return {
        unsubscribe() {
          that.patientsSub.unsubscribe();
        }
      };
      
    });

    this.repo.getPatients();
    
    return this.patientsObservable;
  }
}
