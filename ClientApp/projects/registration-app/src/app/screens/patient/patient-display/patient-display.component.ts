import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Patient } from 'projects/models/patient.model';
import { Repository } from 'projects/modules/repository';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-display',
  templateUrl: './patient-display.component.html',
  styleUrls: ['./patient-display.component.css']
})
export class PatientDisplayComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription = new Subscription;
  patientChanged: Subscription = new Subscription;
  patientId: number = 0;
  patient: Patient = new Patient;
  
  constructor(private repo: Repository, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.patientChanged = this.repo.patientChanged.subscribe(p => this.patient = p);

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.patientId = +params['id'];
          this.repo.getPatient(this.patientId);
        }
      );
  }

  showEdit(id: number) {
    this.router.navigate(['/patient', this.patientId, 'edit'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.patientChanged.unsubscribe();
    this.paramsSubscription.unsubscribe();
  }
}
