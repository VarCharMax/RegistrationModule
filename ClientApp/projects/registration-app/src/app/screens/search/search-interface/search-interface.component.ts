import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

import { Project } from 'projects/models/project.model';
import { Repository } from 'projects/modules/repository';
import { SearchService } from '../../../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-interface',
  templateUrl: './search-interface.component.html',
  styleUrls: ['./search-interface.component.css']
})
export class SearchInterfaceComponent implements OnInit, OnDestroy {                
  patientSearchForm: FormGroup = new FormGroup({});
  private projectListSub: Subscription = new Subscription();
  private patientsListSub: Subscription = new Subscription();
  private projectId = '0';
  projects: Project[] = [];
  hasDoneSearch: boolean = false;

  constructor(private searchService: SearchService,
    private repo: Repository,
    private router: Router,
    private route: ActivatedRoute) {
    }

  ngOnInit(): void {

    this.patientSearchForm = new FormGroup({
      patientUIN: new FormControl(null),
      hospitalUR: new FormControl(null),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      dob: new FormControl(null),
      project: new FormControl(0)
    });

    this.patientSearchForm.setValue({
      'firstName': null,
      'lastName': null,
      'patientUIN': null,
      'hospitalUR': null,
      'dob': null, 
      'project': 0
    });

    this.projectListSub = this.route.data.subscribe((data: Data) => {
      this.projects = data['projects'];
    });

    this.patientsListSub = this.repo.patientsChanged.subscribe(p => {
      this.searchService.hasSearched.next(true);
      this.hasDoneSearch = true;
      this.repo.filter.reset();
      this.router.navigate([{ outlets: { searchresults: 'results' }}], { relativeTo: this.route });
    });
  }

  resetValue() {
    this.patientSearchForm.reset();
  }

  showSearchResults() {
        this.repo.filter.related = true;

        let searchString = '';

        const fn = this.patientSearchForm.get('firstName')?.value;
        const ln = this.patientSearchForm.get('lastName')?.value;
        const patientUIN = this.patientSearchForm.get('patientUIN')?.value;
        const hospitalUR = this.patientSearchForm.get('hospitalUR')?.value;

        if (fn)
        {
          searchString += 'firstname=' + encodeURIComponent(fn) + '&';
        }

        if (ln)
        {
          searchString += 'lastname=' + encodeURIComponent(ln) + '&';
        }

        if (patientUIN)
        {
          searchString += 'patientuin=' + encodeURIComponent(patientUIN) + '&';
        }

        if (hospitalUR)
        {
          searchString += 'hospitalur=' + encodeURIComponent(hospitalUR) + '&';
        }

        if (this.projectId && this.projectId != '0')
        {
          searchString += 'projectid=' + encodeURIComponent(this.projectId) + '&';
        }

        searchString = searchString.substr(0, searchString.length - 1);

        this.repo.filter.related = true;
        this.repo.filter.search = searchString;

        // console.log(searchString);
        
        this.repo.getPatients();
  }

  onProjectChanged(value: any) {
    this.projectId = value;
  }

  createNewPatient() {
    this.router.navigate(['/patient/new']);
  }

  ngOnDestroy() {
    this.projectListSub.unsubscribe();
    this.patientsListSub.unsubscribe();
  }
}
