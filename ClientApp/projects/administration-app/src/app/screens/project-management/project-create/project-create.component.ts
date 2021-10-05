import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Project } from 'projects/models/project.model';
import { Repository } from 'projects/modules/repository';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css'],
})
export class ProjectCreateComponent implements OnInit, OnDestroy {
  private projectCreateSub: Subscription = new Subscription();
  private errorsChanged: Subscription = new Subscription();
  projectCreateForm: FormGroup = new FormGroup({});
  errors: { [label: string]: Array<string> } = {};

  constructor(
    private repo: Repository,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectCreateForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      url: new FormControl(null, Validators.required),
      token: new FormControl(null, Validators.required),
    });

    this.errorsChanged = this.repo.errorsChanged.subscribe((e) => {
      this.errors = e;
    });
  }

  createProject() {
    if (this.projectCreateForm.valid) {
      this.projectCreateSub = this.repo.projectsChanged.subscribe((p) => {
        this.projectCreateSub.unsubscribe();
        this.router.navigate(['/projects'], { relativeTo: this.route });
      });

      let project: Project = new Project(
        0,
        this.projectCreateForm.get('name')?.value,
        this.projectCreateForm.get('url')?.value,
        this.projectCreateForm.get('token')?.value,
        true
      );

      this.repo.createProject(project);
    }
  }

  ngOnDestroy() {
    this.projectCreateSub.unsubscribe();
    this.errorsChanged.unsubscribe();
  }
}
