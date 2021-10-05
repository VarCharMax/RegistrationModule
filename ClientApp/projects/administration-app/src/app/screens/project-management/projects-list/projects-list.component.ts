import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Project } from 'projects/models/project.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'],
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  private projectListSub: Subscription = new Subscription();
  projects: Project[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectListSub = this.route.data.subscribe((data: Data) => {
      this.projects = data['projects'];
    });
  }

  displayProject(id: number) {
    this.router.navigate(['/projects', id], { relativeTo: this.route });
  }

  addProject() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.projectListSub.unsubscribe();
  }
}
