import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { CanComponentDeactivate } from './../../../services/can-deactivate-guard.service';
import { Clinician } from 'projects/models/clinician.model';
import { Patient } from 'projects/models/patient.model';
import { Repository } from 'projects/modules/repository';
import { Sex } from 'projects/models/sex.model';
import { TreatmentLocation } from 'projects/models/treatmentlocation.model';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css'],
})
export class PatientEditComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  private sexListSub: Subscription = new Subscription();
  private cliniciansListSub: Subscription = new Subscription();
  private locationsListSub: Subscription = new Subscription();
  private patientChanged: Subscription = new Subscription();
  private errorsChanged: Subscription = new Subscription();
  private patientId: number = 0;
  errors: { [label: string]: Array<string> } = {};
  patient: Patient = new Patient();
  changesSaved = false;
  patientEditForm: FormGroup = new FormGroup({});
  sexes: Sex[] = [];
  clinicians: Clinician[] = [];
  treatmentLocations: TreatmentLocation[] = [];
  institutions = ['Public', 'Private'];
  estimatedDOB = ['A', 'D', 'DM', 'DMY', 'DY', 'MY', 'Y'];

  constructor(
    private repo: Repository,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sexListSub = this.route.data.subscribe((data: Data) => {
      this.sexes = data['sexes'];
    });

    this.cliniciansListSub = this.route.data.subscribe((data: Data) => {
      this.clinicians = data['clinicians'];
    });

    this.locationsListSub = this.route.data.subscribe((data: Data) => {
      this.treatmentLocations = data['treatmentlocations'];
    });

    this.errorsChanged = this.repo.errorsChanged.subscribe((e) => {
      this.errors = e;
    });

    this.patientChanged = this.repo.patientChanged.subscribe((p) => {
      // console.log(p);
      this.patient = p;

      this.patientEditForm.setValue({
        patientUIN: this.patient.patientUIN,
        hospital: this.patient.hospital,
        firstName: this.patient.firstName,
        lastName: this.patient.lastName,
        middleName: this.patient.middle,
        sex: this.patient.patientSex?.sexId,
        dob: new Date(),
        estdob: 'A',
        clinician: this.patient?.doctor?.clinicianId,
        treatmentLocation: this.patient.location?.treatmentLocationId,
        institution: this.patient.institution,
        hospitalUR: this.patient.hospitalUR,
        postcode: this.patient.postCode,
        medicareNo: this.patient.medicareNo,
        studyCoordinator: this.patient.studyCoordinator,
        coordinatorPhone: this.patient.studyCoordinatorPhone,
        comments: this.patient.comments,
      });

      this.patientChanged.unsubscribe();
    });

    /*
    this.route.paramMap.pipe(
      switchMap(params => {
        this.patientId = parseInt(params.get('id')!, 10);

        if (this.patientId < 1) {
          this.router.navigate(['list'], { relativeTo: this.route });
        } else {
          this.repo.getPatient(this.patientId);
        }

        return new Observable();
      })
    );
    */

    this.route.params.subscribe((params: Params) => {
      this.patientId = +params['id'];
      if (this.patientId < 1) {
        this.router.navigate(['list'], { relativeTo: this.route });
      } else {
        this.repo.getPatient(this.patientId);
      }
    });

    this.patientEditForm = new FormGroup({
      patientUIN: new FormControl(null, Validators.required),
      hospital: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      sex: new FormControl(null),
      dob: new FormControl(null),
      estdob: new FormControl(null),
      clinician: new FormControl(null),
      treatmentLocation: new FormControl(0),
      institution: new FormControl(null),
      hospitalUR: new FormControl(null, Validators.required),
      postcode: new FormControl(null, Validators.required),
      medicareNo: new FormControl(null, Validators.required),
      studyCoordinator: new FormControl(),
      coordinatorPhone: new FormControl(),
      comments: new FormControl(),
    });

    this.errorsChanged = this.repo.errorsChanged.subscribe((e) => {
      this.errors = e;
    });
  }

  changeEDOB(e: any) {
    console.log(e.target.value);
    this.patientEditForm.get('estdob')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeSex(e: any) {
    this.patientEditForm.get('sex')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeClinician(e: any) {
    this.patientEditForm.get('clinician')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeTreatmentLocation(e: any) {
    this.patientEditForm.get('treatmentLocation')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  updatePatient() {
    this.patientChanged = this.repo.patientChanged.subscribe((p) => {
      this.changesSaved = true;
      this.patientEditForm.reset();
      this.router.navigate(['..'], { relativeTo: this.route });
    });

    this.repo.replacePatient(this.patient);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.patientEditForm.touched && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

  ngOnDestroy() {
    this.errorsChanged.unsubscribe();
    this.patientChanged.unsubscribe();
    this.sexListSub.unsubscribe();
    this.cliniciansListSub.unsubscribe();
    this.locationsListSub.unsubscribe();
  }
}
