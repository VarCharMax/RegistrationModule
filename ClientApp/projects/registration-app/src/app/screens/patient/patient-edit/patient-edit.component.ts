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
  estimated: FormControl = new FormControl();
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

    this.patientEditForm = new FormGroup({
      patientUIN: new FormControl(null, Validators.required),
      hospital: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      sex: new FormControl(null),
      dob: new FormControl(null, Validators.required),
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
      consentDate: new FormControl(null),
      estimated: new FormControl(false)
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
        'dob': this.patient.dob,
        'estdob': this.patient.estDOB,
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
        'subStudyParticipation': this.patient.subStudyParticipation,
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
 
  changeConsent(e: any) {
    if (e.value == false)
    {
      this.patientEditForm.patchValue({'consentDate': ''});
    }
  }

  updatePatient() {

    if (this.patientEditForm.valid)
    {
        this.patientChanged = this.repo.patientChanged.subscribe((p) => {
          this.changesSaved = true;
          this.patientEditForm.reset();
          // this.router.navigate(['..'], { relativeTo: this.route });
        });

        /*
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
*/

      if (this.hasEstimatedDOB)
      {
        if (!this.eDob || this.eDob == '0') {
          this.patientEditForm.get('estdob')?.setErrors({ invalidEDOB: true });
        }
      }

      if (this.hasConsented) {
        const consentDate = this.patientEditForm.get('consentDate')?.value;
        console.log('consentDate ' + consentDate);
        if (!consentDate) {
          this.patientEditForm.get('consentDate')?.setErrors({ invalidConsentDate: true });
        }
      }

      const patient = new Patient();
      
      patient.patientId = this.patient.patientId,
      patient.patientSex = this.sexes.find((s) => s.sexId == this.selectedSexId);
      patient.doctor = this.clinicians.find((c) => c.clinicianId == this.selectedClinicianId);
      patient.patientSex = this.sexes.find((s) => s.sexId == this.selectedSexId);
      patient.location = this.treatmentLocations.find((tr) => tr.treatmentLocationId == this.selectedLocationId);
      patient.project = this.projects.find((p) => p.projectId == this.selectedProjectId);
      patient.firstName = this.patientEditForm.get('firstName')?.value;
      patient.lastName = this.patientEditForm.get('lastName')?.value;
      patient.middle = this.patientEditForm.get('middleName')?.value;
      patient.estDOB = this.eDob;
      patient.patientUIN = this.patientEditForm.get('patientUIN')?.value;
      patient.hospital = this.patientEditForm.get('hospital')?.value;
      patient.hospitalUR = this.patientEditForm.get('hospitalUR')?.value;
      patient.medicareNo = this.patientEditForm.get('medicareNo')?.value;
      patient.postCode = this.patientEditForm.get('postcode')?.value;
      patient.institution = this.selectedInstitution;
      patient.studyCoordinator = this.patientEditForm.get('studyCoordinator')?.value;
      patient.studyId = this.patientEditForm.get('studyId')?.value;
      patient.comments = this.patientEditForm.get('comments')?.value;
      patient.dob = new Date(this.patientEditForm.get('dob')?.value);
      patient.hasConsented = this.hasConsented;

      if (this.hasConsented) {
        patient.consentDate = new Date(this.patientEditForm.get('consentDate')?.value);
      }

      console.log(patient)
      // this.repo.replacePatient(patient);
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
