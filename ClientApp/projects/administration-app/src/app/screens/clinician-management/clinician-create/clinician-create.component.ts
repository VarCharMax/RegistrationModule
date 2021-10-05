import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Clinician } from 'projects/models/clinician.model';
import { Repository } from 'projects/modules/repository';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clinician-create',
  templateUrl: './clinician-create.component.html',
  styleUrls: ['./clinician-create.component.css'],
})
export class ClinicianCreateComponent implements OnInit, OnDestroy {
  private clinicianCreateSub: Subscription = new Subscription();
  private errorsChanged: Subscription = new Subscription();
  clinicianCreateForm: FormGroup = new FormGroup({});
  errors: { [label: string]: Array<string> } = {};

  constructor(
    private repo: Repository,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clinicianCreateForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
    });

    this.errorsChanged = this.repo.errorsChanged.subscribe((e) => {
      this.errors = e;
    });
  }

  createClinician() {
    if (this.clinicianCreateForm.valid) {
      this.clinicianCreateSub = this.repo.cliniciansChanged.subscribe((p) => {
        this.clinicianCreateSub.unsubscribe();
        this.router.navigate(['/clinicians'], { relativeTo: this.route });
      });

      let clinician: Clinician = new Clinician(
        0,
        this.clinicianCreateForm.get('firstName')?.value,
        this.clinicianCreateForm.get('lastName')?.value
      );

      this.repo.createClinician(clinician);
    }
  }

  ngOnDestroy() {
    this.clinicianCreateSub.unsubscribe();
    this.errorsChanged.unsubscribe();
  }
}
