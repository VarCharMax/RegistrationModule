import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Clinician } from 'projects/models/clinician.model';
import { Patient } from 'projects/models/patient.model';
import { Repository } from 'projects/modules/repository';
import { Role } from 'projects/models/role.model';
import { Sex } from 'projects/models/sex.model';
import { Subscription } from 'rxjs';
import { TreatmentLocation } from 'projects/models/treatmentlocation.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    private sexListSub: Subscription = new Subscription();
    private cliniciansListSub: Subscription = new Subscription();
    private patientsListSub: Subscription = new Subscription();
    private locationsListSub: Subscription = new Subscription();

    sexes: Sex[] = [];
    patients: Patient[] = [];
    clinicians: Clinician[] = [];
    treatmentLocations: TreatmentLocation[] = [];

    constructor(private repo: Repository, private router: Router, private route: ActivatedRoute) { }                     

    ngOnInit() {
        
        this.sexListSub = this.route.data
            .subscribe(
                (data: Data) => {
                    this.sexes = data['sexes'];
                }
        );
        
        this.cliniciansListSub = this.route.data
            .subscribe(
                (data: Data) => {
                    this.clinicians = data['clinicians'];
                }
        );
      
        this.patientsListSub =  this.route.data
        .subscribe(
            (data: Data) => {
                this.patients = data['patients'];
            }
        );

        this.locationsListSub = this.route.data
        .subscribe(
            (data: Data) => {
                this.treatmentLocations = data['treatmentlocations'];
            }
        );
    }

    ngOnDestroy() {
        this.patientsListSub.unsubscribe();
        this.sexListSub.unsubscribe();
        this.cliniciansListSub.unsubscribe();
        this.locationsListSub.unsubscribe();
    }
}
