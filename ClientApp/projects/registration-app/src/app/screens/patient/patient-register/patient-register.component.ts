import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { CanComponentDeactivate } from './../../../services/can-deactivate-guard.service';
import { Clinician } from 'projects/models/clinician.model';
import { Patient } from 'projects/models/patient.model';
import { Project } from 'projects/models/project.model';
import { Repository } from 'projects/modules/repository';
import { Sex } from 'projects/models/sex.model';
import { TreatmentLocation } from 'projects/models/treatmentlocation.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css'],
})
export class PatientRegisterComponent
  implements OnInit, CanComponentDeactivate, OnDestroy
{
  private sexListSub: Subscription = new Subscription();
  private projectListSub: Subscription = new Subscription();
  private cliniciansListSub: Subscription = new Subscription();
  private locationsListSub: Subscription = new Subscription();
  private patientsChanged: Subscription = new Subscription();
  private errorsChanged: Subscription = new Subscription();
  private patientSexId: number = 0;
  private treatmentLocationId: number = 0;
  errors: { [label: string]: Array<string> } = {};
  patientRegistrationForm: FormGroup = new FormGroup({});
  changesSaved = false;
  sexes: Sex[] = [];
  clinicians: Clinician[] = [];
  projects: Project[] = [];
  treatmentLocations: TreatmentLocation[] = [];
  institutions = ['Public', 'Private'];
  estimatedDOB = ['A', 'D', 'DM', 'DMY', 'DY', 'MY', 'Y'];
  consents = [true, false];

  constructor(
    private repo: Repository,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.patientRegistrationForm = new FormGroup({
      patientUIN: new FormControl(null, Validators.required),
      hospital: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      sex: new FormControl(0),
      dob: new FormControl(null),
      estdob: new FormControl(null),
      clinician: new FormControl(0),
      treatmentLocation: new FormControl(0),
      institution: new FormControl(null),
      hospitalUR: new FormControl(null),
      postcode: new FormControl(null),
      medicareNo: new FormControl(null),
      studyCoordinator: new FormControl(null),
      studyCoordinatorPhone: new FormControl(null),
      comments: new FormControl(null),
      project: new FormControl(null),
      studyId: new FormControl(null),
      subStudyParticipation: new FormControl(null),
      consent: new FormControl(null),
      consentDate: new FormControl(null)
    });

    this.projectListSub = this.route.data.subscribe((data: Data) => {
      this.projects = data['projects'];
    });

    this.sexListSub = this.route.data.subscribe((data: Data) => {
      this.sexes = data['sexes'];
    });

    this.cliniciansListSub = this.route.data.subscribe((data: Data) => {
      this.clinicians = data['clinicians'];
    });

    this.locationsListSub = this.route.data.subscribe((data: Data) => {
      this.treatmentLocations = data['treatmentlocations'];
    });

    this.patientsChanged = this.repo.patientsChanged.subscribe((p) => {
      this.changesSaved = true;
      this.patientRegistrationForm.reset();
      // this.router.navigate(['..'], { relativeTo: this.route });
    });

    this.errorsChanged = this.repo.errorsChanged.subscribe((e) => {
      this.errors = e;
    });

    this.setDefaults();
  }

  setDefaults() {
    this.patientRegistrationForm.setValue({
      'patientUIN': '',
      'hospital': '',
      'firstName': '',
      'lastName': '',
      'middleName': '',
      'sex': 0,
      'dob': '',
      'estdob': '0',
      'clinician': 0,
      'treatmentLocation': 0,
      'institution': 'Public',
      'hospitalUR': '',
      'postcode': '',
      'medicareNo': '',
      'studyCoordinator': '',
      'studyCoordinatorPhone': '',
      'comments': '',
      'project': 0,
      'studyId': '',
      'subStudyParticipation': '',
      'consent': '',
      'consentDate': ''
    });
  }

  changeSex(e: any) {
    let sexVal = e.target.value;
    this.patientSexId = parseInt(sexVal);

    if (this.patientSexId === 0) {
      this.patientRegistrationForm.setErrors({ invalidSex: true });
    } else {
      this.patientRegistrationForm.setErrors({ invalidSex: false });
    }

    this.patientRegistrationForm.get('sex')?.setValue(sexVal, {
      onlySelf: true,
    });
  }

  changeEDOB(e: any) {
    console.log(e.target.value);
    this.patientRegistrationForm.get('estdob')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeClinician(e: any) {
    this.patientRegistrationForm.get('clinician')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeTreatmentLocation(e: any) {
    let trVal = e.target.value;
    this.treatmentLocationId = parseInt(trVal);

    if (this.treatmentLocationId === 0) {
      this.patientRegistrationForm.setErrors({ invalidLocation: true });
    } else {
      this.patientRegistrationForm.setErrors({ invalidLocation: false });
    }

    this.patientRegistrationForm.get('treatmentLocation')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeProject(e: any) {
    this.patientRegistrationForm.get('project')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  savePatient() {
    let clinicianId = parseInt(this.patientRegistrationForm.get('clinician')?.value);

    if (this.patientSexId === 0)
    {
      //this.patientRegistrationForm.setErrors({ invalidSex: true });
    }

    if (clinicianId === 0) {
      //this.patientRegistrationForm.setErrors({ invalidClinician: true });
    }

    if (this.patientRegistrationForm.valid)
    {
      const patient = new Patient(
        0,
        this.patientRegistrationForm.get('patientUIN')?.value,
        this.patientRegistrationForm.get('hospitalUR')?.value,
        this.patientRegistrationForm.get('hospital')?.value,
        this.patientRegistrationForm.get('firstName')?.value,
        this.patientRegistrationForm.get('lastName')?.value,
        this.patientRegistrationForm.get('middleName')?.value,
        new Date(),
        this.patientRegistrationForm.get('estdob')?.value,
        this.sexes.find(
          (s) => s.sexId === parseInt(this.patientRegistrationForm.get('sex')?.value)
        ),
        this.patientRegistrationForm.get('medicareNo')?.value,
        this.patientRegistrationForm.get('postcode')?.value,
        this.treatmentLocations.find(
          (tr) =>
            tr.treatmentLocationId ===
            parseInt(this.patientRegistrationForm.get('treatmentLocation')?.value)
        ),
        this.clinicians.find(
          (c) =>
            c.clinicianId ===
            parseInt(this.patientRegistrationForm.get('clinician')?.value)
        ),
        this.patientRegistrationForm.get('institution')?.value,
        this.patientRegistrationForm.get('studyCoordinator')?.value,
        this.patientRegistrationForm.get('studyCoordinatorPhone')?.value,
        this.patientRegistrationForm.get('comments')?.value,
        this.projects.find((p) => p.projectId == parseInt(this.patientRegistrationForm.get('project')?.value)),
        this.patientRegistrationForm.get('studyId')?.value,
        true,
        ''
      );
        
      console.log(patient);
      this.repo.createPatient(JSON.parse(JSON.stringify(patient)));
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.patientRegistrationForm.touched && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

  ngOnDestroy() {
    this.sexListSub.unsubscribe();
    this.cliniciansListSub.unsubscribe();
    this.locationsListSub.unsubscribe();
    this.errorsChanged.unsubscribe();
    this.patientsChanged.unsubscribe();
    this.projectListSub.unsubscribe();
  }
}
