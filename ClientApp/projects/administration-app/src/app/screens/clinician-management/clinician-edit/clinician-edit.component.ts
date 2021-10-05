import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Clinician } from 'projects/models/clinician.model';
import { Repository } from 'projects/modules/repository';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clinician-edit',
  templateUrl: './clinician-edit.component.html',
  styleUrls: ['./clinician-edit.component.css'],
})
export class ClinicianEditComponent implements OnInit, OnDestroy {
  private clinicianSub: Subscription = new Subscription();
  private clinicianUpdateSub: Subscription = new Subscription();
  private errorsChanged: Subscription = new Subscription();
  private clinician: Clinician = new Clinician();
  clinicianEditForm: FormGroup = new FormGroup({});
  errors: { [label: string]: Array<string> } = {};

  constructor(
    private repo: Repository,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clinicianEditForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
    });

    this.clinicianSub = this.route.data.subscribe((data: Data) => {
      this.clinician = data['clinician'];

      this.clinicianEditForm.setValue({
        firstName: this.clinician.firstName,
        lastName: this.clinician.lastName,
      });

      this.clinicianSub.unsubscribe();
    });

    this.errorsChanged = this.repo.errorsChanged.subscribe((e) => {
      this.errors = e;
    });
  }

  updateClinician() {
    if (this.clinicianEditForm.valid) {
      let changes = new Map<string, any>();

      changes.set('firstName', this.clinicianEditForm.get('firstName')?.value);
      changes.set('lastName', this.clinicianEditForm.get('lastName')?.value);

      this.clinicianUpdateSub = this.repo.clinicianChanged.subscribe((p) => {
        this.clinicianUpdateSub.unsubscribe();
        this.router.navigate(['/clinicians'], { relativeTo: this.route });
      });

      this.repo.updateClinician(this.clinician.clinicianId!, changes);
    }
  }

  ngOnDestroy() {
    this.clinicianSub.unsubscribe();
    this.clinicianUpdateSub.unsubscribe();
    this.errorsChanged.unsubscribe();
  }
}
