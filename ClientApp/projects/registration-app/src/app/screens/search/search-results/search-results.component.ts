import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Patient } from 'projects/models/patient.model';
import { Repository } from 'projects/modules/repository';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  private patientsListSub: Subscription = new Subscription;
  patients: Patient[] = [];
  
  constructor(private repo: Repository, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.patients = this.repo.patients;
  }

  goToPatientDetailsPage(id: number) {
    this.router.navigate(['/patient', id, 'edit'], { relativeTo: this.route });
  }

    ngOnDestroy(): void {
        this.patientsListSub.unsubscribe();
    }
}
