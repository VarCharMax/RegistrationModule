import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Content } from 'projects/models/content.model';
import { Injectable } from '@angular/core';
import { Repository } from 'projects/modules/repository';

@Injectable()
export class ContentsResolver implements Resolve<Content[]> {
  private contentsObservable: Observable<Content[]> = new Observable<Content[]>();
  private contentsSub: Subscription = new Subscription();

  constructor(private repo: Repository) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Content[]> | Promise<Content[]> | Content[] {
    this.contentsObservable = new Observable(
      (observer: { next: (arg0: Content[]) => void; complete: () => void }) => {
        const that = this;

        this.contentsSub = this.repo.contentsChanged.subscribe((c) => {
          observer.next(c);
          observer.complete();
        });

        return {
          unsubscribe() {
            that.contentsSub.unsubscribe();
          },
        };
      }
    );

    this.repo.getContents();

    return this.contentsObservable;
  }
}
