import {
  ActivatedRouteSnapshot,
  Params,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Injectable } from '@angular/core';
import { Repository } from 'projects/modules/repository';
import { Sex } from 'projects/models/sex.model';

@Injectable()
export class SexResolver implements Resolve<Sex> {
  private sexObservable: Observable<Sex> = new Observable<Sex>();
  private sexSub: Subscription = new Subscription();
  private sexId: number = 0;

  constructor(private repo: Repository) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Sex> | Promise<Sex> | Sex {
    this.sexId = route.params.id;

    this.sexObservable = new Observable(
      (observer: { next: (arg0: Sex) => void; complete: () => void }) => {
        const that = this;

        this.sexSub = this.repo.sexChanged.subscribe((s) => {
          observer.next(s);
          observer.complete();
        });

        return {
          unsubscribe() {
            that.sexSub.unsubscribe();
          },
        };
      }
    );

    this.repo.getSex(this.sexId);

    return this.sexObservable;
  }
}
