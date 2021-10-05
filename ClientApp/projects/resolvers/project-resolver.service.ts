import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Injectable } from '@angular/core';
import { Project } from 'projects/models/project.model';
import { Repository } from 'projects/modules/repository';

@Injectable()
export class ProjectResolver implements Resolve<Project> {
  private projectObservable: Observable<Project> = new Observable<Project>();
  private projectSub: Subscription = new Subscription();
  private projectId: number = 0;

  constructor(private repo: Repository) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Project> | Promise<Project> | Project {
    this.projectId = route.params.id;

    this.projectObservable = new Observable(
      (observer: { next: (arg0: Project) => void; complete: () => void }) => {
        const that = this;

        this.projectSub = this.repo.projectChanged.subscribe((p) => {
          observer.next(p);
          observer.complete();
        });

        return {
          unsubscribe() {
            that.projectSub.unsubscribe();
          },
        };
      }
    );
    
    this.repo.getProject(this.projectId);

    return this.projectObservable;
  }
}
