import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Clinician } from 'projects/models/clinician.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clinicians-list',
  templateUrl: './clinicians-list.component.html',
  styleUrls: ['./clinicians-list.component.css'],
})
export class CliniciansListComponent implements OnInit, OnDestroy {
  private cliniciansListSub: Subscription = new Subscription();
  clinicians: Clinician[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cliniciansListSub = this.route.data.subscribe((data: Data) => {
      this.clinicians = data['clinicians'];
    });
  }

  displayClinician(id: number) {
    this.router.navigate(['/clinicians', id], { relativeTo: this.route });
  }

  addClinician() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.cliniciansListSub.unsubscribe();
  }
}
