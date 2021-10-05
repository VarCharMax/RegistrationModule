import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Project } from 'projects/models/project.model';
import { Repository } from 'projects/modules/repository';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  private projectSub: Subscription = new Subscription();
  private projectUpdateSub: Subscription = new Subscription();
  private errorsChanged: Subscription = new Subscription();
  private project: Project = new Project();
  projectEditForm: FormGroup = new FormGroup({});
  errors: { [label: string]: Array<string> } = {};

  constructor(
    private repo: Repository,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectEditForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      url: new FormControl(null, Validators.required),
      token: new FormControl(null, Validators.required),
      isActive: new FormControl(null),
    });

    this.projectSub = this.route.data.subscribe((data: Data) => {
      this.project = data['project'];

      this.projectEditForm.setValue({
        name: this.project.name,
        url: this.project.url,
        token: this.project.token,
        isActive: this.project.isActive,
      });

      this.projectSub.unsubscribe();
    });

    this.errorsChanged = this.repo.errorsChanged.subscribe((e) => {
      this.errors = e;
    });
  }

  updateProject() {
    if (this.projectEditForm.valid) {
      let changes = new Map<string, any>();

      changes.set('name', this.projectEditForm.get('name')?.value);
      changes.set('url', this.projectEditForm.get('url')?.value);
      changes.set('token', this.projectEditForm.get('token')?.value);
      changes.set('isActive', this.projectEditForm.get('isActive')?.value);

      this.projectUpdateSub = this.repo.projectChanged.subscribe((p) => {
        this.projectUpdateSub.unsubscribe();
        this.router.navigate(['/projects'], { relativeTo: this.route });
      });

      this.repo.updateProject(this.project.projectId!, changes);
    }
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
    this.projectUpdateSub.unsubscribe();
    this.errorsChanged.unsubscribe();
  }
}
