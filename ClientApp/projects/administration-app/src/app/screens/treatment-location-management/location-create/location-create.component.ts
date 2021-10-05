import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Repository } from 'projects/modules/repository';
import { Subscription } from 'rxjs';
import { TreatmentLocation } from 'projects/models/treatmentlocation.model';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css'],
})
export class LocationCreateComponent implements OnInit, OnDestroy {
  private locationCreateSub: Subscription = new Subscription();
  private errorsChanged: Subscription = new Subscription();
  locationCreateForm: FormGroup = new FormGroup({});
  errors: { [label: string]: Array<string> } = {};

  constructor(
    private repo: Repository,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.locationCreateForm = new FormGroup({
      location: new FormControl(null, Validators.required),
      code: new FormControl(null, Validators.required),
    });

    this.errorsChanged = this.repo.errorsChanged.subscribe((e) => {
      this.errors = e;
    });
  }

  createLocation() {
    if (this.locationCreateForm.valid) {
      this.locationCreateSub = this.repo.treatmentLocationsChanged.subscribe((p) => {
        this.locationCreateSub.unsubscribe();
        this.router.navigate(['/locations'], { relativeTo: this.route });
      });

      let location: TreatmentLocation = new TreatmentLocation(
        0,
        this.locationCreateForm.get('location')?.value,
        this.locationCreateForm.get('code')?.value
      );

      this.repo.createTreatmentLocation(location);
    }
  }

  ngOnDestroy() {
    this.locationCreateSub.unsubscribe();
    this.errorsChanged.unsubscribe();
  }
}
