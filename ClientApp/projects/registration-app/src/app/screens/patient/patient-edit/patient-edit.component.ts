import { ActivatedRoute, Data, Params, Router } from '@angular/router';
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
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css'],
})
export class PatientEditComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  private sexListSub: Subscription = new Subscription();
  private patientSub: Subscription = new Subscription();
  private projectListSub: Subscription = new Subscription();
  private cliniciansListSub: Subscription = new Subscription();
  private locationsListSub: Subscription = new Subscription();
  private patientChanged: Subscription = new Subscription();
  private errorsChanged: Subscription = new Subscription();
  errors: { [label: string]: Array<string> } = {};
  patient: Patient = new Patient();
  changesSaved = false;
  patientEditForm: FormGroup = new FormGroup({});
  projects: Project[] = [];
  sexes: Sex[] = [];
  clinicians: Clinician[] = [];
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

    this.patientEditForm = new FormGroup({
      patientUIN: new FormControl(null, Validators.required),
      hospital: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      sex: new FormControl(null),
      dob: new FormControl(null),
      estdob: new FormControl(null),
      clinician: new FormControl(null),
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

    this.patientSub = this.route.data.subscribe((data: Data) => {
      this.patient = data['patient'];

      this.patientEditForm.setValue({
        'patientUIN': this.patient.patientUIN,
        'hospital': this.patient.hospital,
        'firstName': this.patient.firstName,
        'lastName': this.patient.lastName,
        'middleName': this.patient.middle,
        'sex': this.patient.patientSex?.sexId,
        'dob': formatDate(this.patient.dob!, 'dd/MM/yyy', 'en-AU'),
        'estdob': this.patient.estDOB || 'A',
        'clinician': this.patient?.doctor?.clinicianId,
        'treatmentLocation': this.patient.location?.treatmentLocationId,
        'institution': this.patient.institution,
        'hospitalUR': this.patient.hospitalUR,
        'postcode': this.patient.postCode,
        'medicareNo': this.patient.medicareNo,
        'studyCoordinator': this.patient.studyCoordinator,
        'studyCoordinatorPhone': this.patient.studyCoordinatorPhone,
        'comments': this.patient.comments,
        'project': this.patient.project?.projectId,
        'studyId': this.patient.studyId,
        'subStudyParticipation': '',
        'consent': this.patient.hasConsented,
        'consentDate': this.patient.consentDate
      });
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

    this.errorsChanged = this.repo.errorsChanged.subscribe((e) => {
      this.errors = e;
    });
  }

  changeEDOB(e: any) {
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

  changeInstitution(e: any) {
    this.patientEditForm.get('institution')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeProject(e: any) {
    this.patientEditForm.get('project')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  
  updatePatient() {

    if (this.patientEditForm.valid)
    {
      this.patientChanged = this.repo.patientChanged.subscribe((p) => {
        this.changesSaved = true;
        this.patientEditForm.reset();
        // this.router.navigate(['..'], { relativeTo: this.route });
      });

      const patient = new Patient(
        this.patient.patientId,
        this.patientEditForm.get('patientUIN')?.value,
        this.patientEditForm.get('hospitalUR')?.value,
        this.patientEditForm.get('hospital')?.value,
        this.patientEditForm.get('firstName')?.value,
        this.patientEditForm.get('lastName')?.value,
        this.patientEditForm.get('middleName')?.value,
        new Date(formatDate(this.patientEditForm.get('dob')!.value, 'dd/MM/yyyy', 'en-AU')), // formatDate(this.patientEditForm.get('dob')!.value, 'dd/MM/yyyy', 'en-AU')
        this.patientEditForm.get('estdob')?.value,
        this.sexes.find(
          (s) => s.sexId === parseInt(this.patientEditForm.get('sex')?.value)
        ),
        this.patientEditForm.get('medicareNo')?.value,
        this.patientEditForm.get('postcode')?.value,
        this.treatmentLocations.find(
          (tr) =>
            tr.treatmentLocationId ===
            parseInt(this.patientEditForm.get('treatmentLocation')?.value)
        ),
        this.clinicians.find(
          (c) =>
            c.clinicianId ===
            parseInt(this.patientEditForm.get('clinician')?.value)
        ),
        this.patientEditForm.get('institution')?.value,
        this.patientEditForm.get('studyCoordinator')?.value,
        this.patientEditForm.get('studyCoordinatorPhone')?.value,
        this.patientEditForm.get('comments')?.value,
        this.projects.find((p) => p.projectId == parseInt(this.patientEditForm.get('project')?.value)),
        this.patientEditForm.get('studyId')?.value,
        true,
      ); 

      // BUG: Can't seem to save comments via constructor. For some reason, they get saved to the isActive property.
        // patient.comments = this.patientEditForm.get('comments')?.value;
          console.log(patient)
        this.repo.replacePatient(patient);
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.patientEditForm.touched && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

  ngOnDestroy() {
    this.patientSub.unsubscribe();
    this.errorsChanged.unsubscribe();
    this.patientChanged.unsubscribe();
    this.sexListSub.unsubscribe();
    this.cliniciansListSub.unsubscribe();
    this.locationsListSub.unsubscribe();
    this.projectListSub.unsubscribe();
  }
}
