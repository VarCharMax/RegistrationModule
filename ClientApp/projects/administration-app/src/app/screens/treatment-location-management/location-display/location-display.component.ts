import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { TreatmentLocation } from 'projects/models/treatmentlocation.model';

@Component({
  selector: 'app-location-display',
  templateUrl: './location-display.component.html',
  styleUrls: ['./location-display.component.css'],
})
export class LocationDisplayComponent implements OnInit, OnDestroy {
  private locationSub: Subscription = new Subscription();
  location: TreatmentLocation = new TreatmentLocation();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.locationSub = this.route.data.subscribe((data: Data) => {
      this.location = data['location'];
    });
  }

  editLocation(id: number) {
    this.router.navigate(['/locations', id, 'edit'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.locationSub.unsubscribe();
  }
}
