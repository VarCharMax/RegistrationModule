import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
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
  @ViewChild('f') searchForm: any;
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

    this.searchForm.setValue({
      'firstname': null,
      'lastname': null,
      'patientuin': null,
      'hospitalur': null,
      'projectid': 0
    });

    this.projectListSub = this.route.data.subscribe((data: Data) => {
      this.projects = data['projects'];
    });

    this.patientsListSub = this.repo.patientsChanged.subscribe(p => {
      console.log('Results:' + p.length);
      this.searchService.hasSearched.next(true);
      this.hasDoneSearch = true;
      this.repo.filter.reset();
      this.router.navigate([{ outlets: { searchresults: 'results' }}], { relativeTo: this.route });
    });
  }

  resetValue() {
    this.searchForm.reset();
  }

  showSearchResults() {
        this.repo.filter.related = true;

        let searchString = '';

        const fn = this.searchForm.value.firstName;
        const ln = this.searchForm.value.lastName;
        const patientUIN = this.searchForm.value.patientUIN;
        const hospitalUR = this.searchForm.value.hospitalUR;

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

        if (this.projectId != '0')
        {
          searchString += 'projectid=' + encodeURIComponent(this.projectId) + '&';
        }

        searchString = searchString.substr(0, searchString.length - 1);

        this.repo.filter.related = true;
        this.repo.filter.search = searchString;

        console.log(searchString);
        
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
