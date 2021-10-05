import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Project } from 'projects/models/project.model';
import { Repository } from 'projects/modules/repository';

@Injectable()
export class ProjectsResolver implements Resolve<Project[]>{
    private projectsObservable: Observable<Project[]> = new Observable<Project[]>();
    private projectsSub: Subscription = new Subscription;

  constructor(private repo: Repository) {
    
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project[]> | Promise<Project[]> | Project[] {

    this.projectsObservable = new Observable((observer: { next: (arg0: Project[]) => void; complete: () => void; }) => {
      
      const that = this;
      
      this.projectsSub = this.repo.projectsChanged.subscribe(p => {
        observer.next(p);
        observer.complete();
      });

      return {
        unsubscribe() {
          that.projectsSub.unsubscribe();
        }
      };
      
    });

    this.repo.getProjects();
    
    return this.projectsObservable;
  }

}
