import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Clinician } from 'projects/models/clinician.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clinician-display',
  templateUrl: './clinician-display.component.html',
  styleUrls: ['./clinician-display.component.css'],
})
export class ClinicianDisplayComponent implements OnInit, OnDestroy {
  private clinicianSub: Subscription = new Subscription();
  clinician: Clinician = new Clinician();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.clinicianSub = this.route.data.subscribe((data: Data) => {
      this.clinician = data['clinician'];
    });
  }

  editClinician(id: number) {
    this.router.navigate(['/clinicians', id, 'edit'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.clinicianSub.unsubscribe();
  }
}
