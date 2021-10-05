import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Repository } from 'projects/modules/repository';
import { Subscription } from 'rxjs';
import { TreatmentLocation } from 'projects/models/treatmentlocation.model';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css'],
})
export class LocationEditComponent implements OnInit, OnDestroy {
  private locationSub: Subscription = new Subscription();
  private locationUpdateSub: Subscription = new Subscription();
  private errorsChanged: Subscription = new Subscription();
  private location: TreatmentLocation = new TreatmentLocation();
  locationEditForm: FormGroup = new FormGroup({});
  errors: { [label: string]: Array<string> } = {};

  constructor(
    private repo: Repository,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.locationEditForm = new FormGroup({
      location: new FormControl(null, Validators.required),
      code: new FormControl(null, Validators.required),
    });

    this.locationSub = this.route.data.subscribe((data: Data) => {
      this.location = data['location'];

      this.locationEditForm.setValue({
        location: this.location.location,
        code: this.location.code,
      });

      this.locationSub.unsubscribe();
    });

    this.errorsChanged = this.repo.errorsChanged.subscribe((e) => {
      this.errors = e;
    });
  }

  updateLocation() {
    if (this.locationEditForm.valid) {
      let changes = new Map<string, any>();

      changes.set('location', this.locationEditForm.get('location')?.value);
      changes.set('code', this.locationEditForm.get('code')?.value);

      this.locationUpdateSub = this.repo.treatmentLocationChanged.subscribe((p) => {
        this.locationUpdateSub.unsubscribe();
        this.router.navigate(['/locations'], { relativeTo: this.route });
      });

      this.repo.updateTreatmentLocation(this.location.treatmentLocationId!, changes);
    }
  }

  ngOnDestroy() {
    this.locationSub.unsubscribe();
    this.locationUpdateSub.unsubscribe();
    this.errorsChanged.unsubscribe();
  }
}
