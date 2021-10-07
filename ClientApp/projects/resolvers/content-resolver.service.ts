import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Content } from 'projects/models/content.model';
import { Injectable } from '@angular/core';
import { Repository } from 'projects/modules/repository';

@Injectable()
export class ContentResolver implements Resolve<Content> {
  private contentObservable: Observable<Content> = new Observable<Content>();
  private contentSub: Subscription = new Subscription();
  private contentId: number = 0;

  constructor(private repo: Repository) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Content> | Promise<Content> | Content {
    this.contentId = route.params.id;

    this.contentObservable = new Observable(
      (observer: { next: (arg0: Content) => void; complete: () => void }) => {
        const that = this;

        this.contentSub = this.repo.contentChanged.subscribe((c) => {
          observer.next(c);
          observer.complete();
        });

        return {
          unsubscribe() {
            that.contentSub.unsubscribe();
          },
        };
      }
    );

    this.repo.getContent(this.contentId);

    return this.contentObservable;
  }
}
