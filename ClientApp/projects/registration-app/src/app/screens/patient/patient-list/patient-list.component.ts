import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Patient } from 'projects/models/patient.model';
import { Repository } from 'projects/modules/repository';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-item',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit, OnDestroy {
  patients: Patient[] = [];
  // private patientsChanged: Subscription = new Subscription();
  private patientsListSub: Subscription = new Subscription();

  constructor(
    private repo: Repository,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.repo.filter.related = true;

    this.patientsListSub = this.route.data.subscribe((data: Data) => {
      this.patients = data['patients'];
    });

    /*
    this.patientsChanged = this.repo.patientsChanged.subscribe((p) => {
      this.patients = p;
    });
    this.repo.getPatients();
    */
  }

  newPatient() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    //this.patientsChanged.unsubscribe();
    this.patientsListSub.unsubscribe();
    this.repo.filter.reset();
  }
}
