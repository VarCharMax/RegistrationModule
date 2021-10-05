import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Project } from 'projects/models/project.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-display',
  templateUrl: './project-display.component.html',
  styleUrls: ['./project-display.component.css'],
})
export class ProjectDisplayComponent implements OnInit, OnDestroy {
  project: Project = new Project();
  private projectSub: Subscription = new Subscription();
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectSub = this.route.data.subscribe((data: Data) => {
      this.project = data['project'];
    });
  }

  editProject(id: number) {
    this.router.navigate(['/projects', id, 'edit'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }
}
