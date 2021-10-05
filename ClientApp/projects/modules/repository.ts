import { Injectable, OnDestroy } from '@angular/core';

import { Clinician } from 'projects/models/clinician.model';
import { Filter } from './configClasses.repository';
import { HttpClient } from '@angular/common/http';
import { Patient } from 'projects/models/patient.model';
import { Project } from 'projects/models/project.model';
import { Role } from 'projects/models/role.model';
import { Sex } from 'projects/models/sex.model';
import { Subject } from 'rxjs';
import { TreatmentLocation } from 'projects/models/treatmentlocation.model';

const cliniciansUrl = 'api/clinicians';
const patientsUrl = 'api/patients';
const sexesUrl = 'api/sexes';
const rolesUrl = 'api/roles';
const treatmentLocationsUrl = 'api/treatmentlocations';
const projectsUrl = 'api/projects';

@Injectable()
export class Repository implements OnDestroy {
  private clinicians: Clinician[] = [];
  private projects: Project[] = [];
  private treatmentLocations: TreatmentLocation[] = [];
  private roles: Role[] = [];
  private sexes: Sex[] = [];

  patientsChanged: Subject<Patient[]> = new Subject<Patient[]>();
  patientChanged: Subject<Patient> = new Subject<Patient>();
  cliniciansChanged: Subject<Clinician[]> = new Subject<Clinician[]>();
  clinicianChanged: Subject<Clinician> = new Subject<Clinician>();
  sexesChanged: Subject<Sex[]> = new Subject<Sex[]>();
  sexChanged: Subject<Sex> = new Subject<Sex>();
  projectsChanged: Subject<Project[]> = new Subject<Project[]>();
  projectChanged: Subject<Project> = new Subject<Project>();
  treatmentLocationsChanged: Subject<TreatmentLocation[]> = new Subject<
    TreatmentLocation[]
  >();
  treatmentLocationChanged: Subject<TreatmentLocation> = new Subject<TreatmentLocation>();
  patientSearchResult: Subject<Patient[]> = new Subject<Patient[]>();
  rolesChanged: Subject<Role[]> = new Subject<Role[]>();
  roleChanged: Subject<Role> = new Subject<Role>();
  errorsChanged: Subject<{ [label: string]: Array<string> }> = new Subject<{
    [label: string]: Array<string>;
  }>();
  patients: Patient[] = [];
  patient: Patient = new Patient();
  clinician: Clinician = new Clinician();
  filter: Filter = new Filter();

  constructor(private http: HttpClient) {}

  /*
   * Get collections
   */
  getProjects() {
    this.http.get<Project[]>(projectsUrl).subscribe((p) => {
      this.projects = p.slice();
      this.projectsChanged.next(p.slice());
    });
  }

  getClinicians() {
    this.http.get<Clinician[]>(cliniciansUrl).subscribe((cls) => {
      this.clinicians = cls.slice();
      this.cliniciansChanged.next(cls.slice());
    });
  }

  getPatients() {
    let url = `${patientsUrl}?related=${this.filter.related}`;

    if (this.filter.search) {
      url += `&search=true&${this.filter.search}`;
    }

    this.http.get<Patient[]>(url).subscribe((p) => {
      this.patients = p.slice();
      this.patientsChanged.next(p.slice());
    });
  }

  getRoles() {
    this.http.get<Role[]>(rolesUrl).subscribe((r) => {
      this.roles = r.slice();
      this.rolesChanged.next(r.slice());
    });
  }

  getSexes() {
    this.http.get<Sex[]>(sexesUrl).subscribe((s) => {
      this.sexes = s.slice();
      this.sexesChanged.next(s.slice());
    });
  }

  getTreatmentLocations() {
    this.http.get<TreatmentLocation[]>(treatmentLocationsUrl).subscribe((tr) => {
      this.treatmentLocations = tr.slice();
      this.treatmentLocationsChanged.next(tr.slice());
    });
  }

  /*
   * Get entity
   */
  getPatient(id: number) {
    this.http.get<Patient>(`${patientsUrl}/${id}`).subscribe((p) => {
      this.patientChanged.next(JSON.parse(JSON.stringify(p)));
    });
  }

  getClinician(id: number) {
    this.http.get<Clinician>(`${cliniciansUrl}/${id}`).subscribe((c) => {
      this.clinicianChanged.next(JSON.parse(JSON.stringify(c)));
    });
  }

  getTreatmentLocation(id: number) {
    this.http.get<TreatmentLocation>(`${treatmentLocationsUrl}/${id}`).subscribe((tr) => {
      this.treatmentLocationChanged.next(JSON.parse(JSON.stringify(tr)));
    });
  }

  getSex(id: number) {
    this.http.get<Sex>(`${sexesUrl}/${id}`).subscribe((s) => {
      this.sexChanged.next(JSON.parse(JSON.stringify(s)));
    });
  }

  getProject(id: number) {
    this.http.get<Project>(`${projectsUrl}/${id}`).subscribe((p) => {
      this.projectChanged.next(JSON.parse(JSON.stringify(p)));
    });
  }

  /*
   * Add entity
   */

  createClinician(clinician: Clinician) {
    let data = {
      firstName: clinician.firstName,
      lastName: clinician.lastName,
      treatmentLocations: clinician.treatmentLocations,
    };

    this.http.post<number>(cliniciansUrl, data).subscribe(
      (id) => {
        clinician.clinicianId = id;
        this.clinicians.push(clinician);
        this.cliniciansChanged.next(this.clinicians.slice());
      },
      (e) => {
        console.log('Error! ' + e);
        this.errorsChanged.next(e.error?.errors);
      }
    );
  }

  createProject(project: Project) {
    let data = {
      name: project.name,
      url: project.url,
      token: project.token,
      isActive: true,
    };

    this.http.post<number>(projectsUrl, data).subscribe(
      (id) => {
        project.projectId = id;
        this.projects.push(JSON.parse(JSON.stringify(project)));
        this.projectsChanged.next(this.projects.slice());
      },
      (e) => {
        console.log('Error! ' + e);
        this.errorsChanged.next(e.error?.errors);
      }
    );
  }

  createPatient(patient: Patient) {
    let data = {
      firstName: patient.firstName,
      lastName: patient.lastName,
      patientUIN: patient.patientUIN,
      hospitalUR: patient.hospitalUR,
      hospital: patient.hospital,
      middle: patient.middle,
      patientSex: patient.patientSex,
      medicareNo: patient.medicareNo,
      postCode: patient.postCode,
      location: patient.location,
      doctor: patient.doctor,
      dob: patient.dob,
      estDOB: patient.estdob,
      institution: patient.institution,
      studyCoordinator: patient.studyCoordinator,
      studyCoordinatorPhone: patient.studyCoordinatorPhone,
      isActive: patient.isActive,
      deleteComment: patient.deleteComment,
      restoreComment: patient.restoreComment,
      comments: patient.comments,
      project: patient.project,
      subStudyParticipation: patient.subStudyParticipation,
      hasConsented: patient.hasConsented,
      consentDate: patient.consentDate,
    };

    this.http.post<number>(patientsUrl, data).subscribe(
      (id) => {
        patient.patientId = id;
        this.patients.push(JSON.parse(JSON.stringify(patient)));
        this.patientsChanged.next(this.patients.slice());
      },
      (e) => {
        console.log('Error! ' + e);
        this.errorsChanged.next(e.error?.errors);
      }
    );
  }

  createSex(sex: Sex) {
    let data = {
      description: sex.description,
    };

    this.http.post<number>(sexesUrl, data).subscribe(
      (id) => {
        sex.sexId = id;
        this.sexes.push(JSON.parse(JSON.stringify(sex)));
        this.sexesChanged.next(this.sexes.slice());
      },
      (e) => {
        console.log('Error! ' + e);
        this.errorsChanged.next(e.error?.errors);
      }
    );
  }

  createTreatmentLocation(treatmentlocation: TreatmentLocation) {
    let data = {
      location: treatmentlocation.location,
      code: treatmentlocation.code,
    };

    this.http.post<number>(treatmentLocationsUrl, data).subscribe(
      (id) => {
        treatmentlocation.treatmentLocationId = id;
        this.treatmentLocations.push(JSON.parse(JSON.stringify(treatmentlocation)));
        this.treatmentLocationsChanged.next(this.treatmentLocations.slice());
      },
      (e) => {
        console.log('Error! ' + e);
        this.errorsChanged.next(e.error?.errors);
      }
    );
  }

  /*
    createProductAndSupplier(prod: Product, supp: Supplier) {
        let data = {
            name: supp.name, city: supp.city, state: supp.state
        };

        this.http.post<number>(suppliersUrl, data)
          .subscribe(id => {
              supp.supplierId = id;
              prod.supplier = supp;
              this.suppliers.push(supp);
              if (prod != null) {
                  this.createProduct(prod);
              }
          });
    }
    */

  /*
   * Replace Entity
   */
  replacePatient(patient: Patient) {
    let data = {
      firstName: patient.firstName,
      lastName: patient.lastName,
      patientUIN: patient.patientUIN,
      hospitalUR: patient.hospitalUR,
      middle: patient.middle,
      patientSex: patient.patientSex,
      medicareNo: patient.medicareNo,
      postCode: patient.postCode,
      location: patient.location,
      doctor: patient.doctor,
      studyCoordinator: patient.studyCoordinator,
      studyCoordinatorPhone: patient.studyCoordinatorPhone,
      isActive: patient.isActive,
      deleteComment: patient.deleteComment,
      restoreComment: patient.restoreComment,
      comments: patient.comments,
      project: patient.project,
      subStudyParticipation: patient.subStudyParticipation,
      hasConsented: patient.hasConsented,
      consentDate: patient.consentDate,
    };

    this.http
      .put(`${patientsUrl}/${patient.patientId}`, data)
      .subscribe(() => this.getPatients());
  }

  replaceClinician(clinician: Clinician) {
    let data = {
      firstName: clinician.firstName,
      lastName: clinician.lastName,
      treatmentLocations: clinician.treatmentLocations,
    };

    this.http
      .put(`${cliniciansUrl}/${clinician.clinicianId}`, data)
      .subscribe(() => this.getClinicians());
  }

  replaceTreatmentLocation(treatmentLocation: TreatmentLocation) {
    let data = {
      location: treatmentLocation.location,
      code: treatmentLocation.code,
    };

    this.http
      .put(`${treatmentLocationsUrl}/${treatmentLocation.treatmentLocationId}`, data)
      .subscribe(() => this.getTreatmentLocations());
  }

  replaceProject(project: Project) {
    let data = {
      name: project.name,
      url: project.url,
      token: project.token,
      isActive: project.isActive,
    };

    this.http
      .put(`${projectsUrl}/${project.projectId}`, data)
      .subscribe(() => this.getProjects());
  }

  /*
   * Update entity
   */
  updatePatient(id: number, changes: Map<string, any>) {
    let patch: { op: string; path: string; value: any }[] = [];
    changes.forEach((value, key) =>
      patch.push({ op: 'replace', path: key, value: value })
    );
    this.http.patch(`${patientsUrl}/${id}`, patch).subscribe(() => this.getPatient(id));
  }

  updateClinician(id: number, changes: Map<string, any>) {
    let patch: { op: string; path: string; value: any }[] = [];
    changes.forEach((value, key) =>
      patch.push({ op: 'replace', path: key, value: value })
    );
    this.http
      .patch(`${cliniciansUrl}/${id}`, patch)
      .subscribe(() => this.getClinician(id));
  }

  updateSex(id: number, changes: Map<string, any>) {
    let patch: { op: string; path: string; value: any }[] = [];
    changes.forEach((value, key) =>
      patch.push({ op: 'replace', path: key, value: value })
    );
    this.http.patch(`${sexesUrl}/${id}`, patch).subscribe(() => this.getSex(id));
  }

  updateProject(id: number, changes: Map<string, any>) {
    let patch: { op: string; path: string; value: any }[] = [];
    changes.forEach((value, key) =>
      patch.push({ op: 'replace', path: key, value: value })
    );
    this.http.patch(`${projectsUrl}/${id}`, patch).subscribe(() => this.getProject(id));
  }

  updateTreatmentLocation(id: number, changes: Map<string, any>) {
    let patch: { op: string; path: string; value: any }[] = [];
    changes.forEach((value, key) =>
      patch.push({ op: 'replace', path: key, value: value })
    );
    this.http
      .patch(`${treatmentLocationsUrl}/${id}`, patch)
      .subscribe(() => this.getTreatmentLocation(id));
  }

  ngOnDestroy(): void {
    // Note: Because this class is a singleton, this does not get called.
    console.log('In repo destroy');
    // this.patientsSub.unsubscribe();
    // this.sexesSub.unsubscribe();
  }
}
