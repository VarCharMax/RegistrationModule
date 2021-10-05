import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { TreatmentLocation } from 'projects/models/treatmentlocation.model';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css'],
})
export class LocationsListComponent implements OnInit, OnDestroy {
  private locationsListSub: Subscription = new Subscription();
  locations: TreatmentLocation[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.locationsListSub = this.route.data.subscribe((data: Data) => {
      this.locations = data['locations'];
    });
  }

  displayLocation(id: number) {
    this.router.navigate(['/locations', id], { relativeTo: this.route });
  }

  addLocation() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.locationsListSub.unsubscribe();
  }
}
