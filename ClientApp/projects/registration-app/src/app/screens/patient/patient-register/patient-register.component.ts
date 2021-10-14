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
  errors: string[] = [];
  patientRegistrationForm: FormGroup = new FormGroup({});
  estimated: FormControl = new FormControl();
  changesSaved = false;
  sexes: Sex[] = [];
  clinicians: Clinician[] = [];
  projects: Project[] = [];
  treatmentLocations: TreatmentLocation[] = [];
  institutions = ['Public', 'Private'];
  estimatedDOB = ['A', 'D', 'DM', 'DMY', 'DY', 'MY', 'Y'];
  selectedClinicianId: number = 0;
  selectedSexId: number = 0;
  selectedLocationId: number = 0;
  selectedProjectId: number = 0;
  selectedInstitution: string = 'Public';
  hasConsented: boolean = false;
  hasEstimatedDOB: boolean = false;
  eDob: string ='';

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
      dob: new FormControl(null, Validators.required),
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
      consentDate: new FormControl(null),
      estimated: new FormControl(false)
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
      if (e.errors)
      {
        this.errors = e.errors;
      }
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
      'estdob': '',
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
      'consent': false,
      'consentDate': '',
      'estimated': false
    });
  }

  savePatient() {
    if (this.selectedLocationId == 0)
    {
      this.patientRegistrationForm.get('treatmentLocation')?.setErrors({ invalidLocation: true });
    }

    if (this.selectedSexId == 0)
    {
      this.patientRegistrationForm.get('sex')?.setErrors({ invalidSex: true });
    }

    if (this.selectedClinicianId == 0) {
      this.patientRegistrationForm.get('clinician')?.setErrors({ invalidClinician: true });
    }

    if (this.hasEstimatedDOB)
    {
      if (!this.eDob || this.eDob == '0') {
        this.patientRegistrationForm.get('estdob')?.setErrors({ invalidEDOB: true });
      }
    }

    if (this.hasConsented) {
      const consentDate = this.patientRegistrationForm.get('consentDate')?.value;
      if (!consentDate) {
        this.patientRegistrationForm.get('consentDate')?.setErrors({ invalidConsentDate: true });
      }
    }

    if (this.patientRegistrationForm.valid)
    {
      const patient = new Patient();

      patient.patientSex = this.sexes.find((s) => s.sexId == this.selectedSexId);
      patient.doctor = this.clinicians.find((c) => c.clinicianId == this.selectedClinicianId);
      patient.patientSex = this.sexes.find((s) => s.sexId == this.selectedSexId);
      patient.location = this.treatmentLocations.find((tr) => tr.treatmentLocationId == this.selectedLocationId);
      patient.project = this.projects.find((p) => p.projectId == this.selectedProjectId);
      patient.firstName = this.patientRegistrationForm.get('firstName')?.value;
      patient.lastName = this.patientRegistrationForm.get('lastName')?.value;
      patient.middle = this.patientRegistrationForm.get('middleName')?.value;
      patient.estDOB = this.eDob;
      patient.patientUIN = this.patientRegistrationForm.get('patientUIN')?.value;
      patient.hospital = this.patientRegistrationForm.get('hospital')?.value;
      patient.hospitalUR = this.patientRegistrationForm.get('hospitalUR')?.value;
      patient.medicareNo = this.patientRegistrationForm.get('medicareNo')?.value;
      patient.postCode = this.patientRegistrationForm.get('postcode')?.value;
      patient.institution = this.selectedInstitution;
      patient.studyCoordinator = this.patientRegistrationForm.get('studyCoordinator')?.value;
      patient.studyId = this.patientRegistrationForm.get('studyId')?.value;
      patient.comments = this.patientRegistrationForm.get('comments')?.value;
      patient.isActive = true;
      patient.dob = new Date(this.patientRegistrationForm.get('dob')?.value);
      patient.hasConsented = this.hasConsented;

      if (this.hasConsented) {
        patient.consentDate = new Date(this.patientRegistrationForm.get('consentDate')?.value);
      }

      console.log(patient);
      // this.repo.createPatient(JSON.parse(JSON.stringify(patient)));
    }
  }

  changeConsent(e: any) {
    if (e.value == false)
    {
      this.patientRegistrationForm.patchValue({'consentDate': ''});
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
