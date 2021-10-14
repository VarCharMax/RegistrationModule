import { ActivatedRoute, Data, Router } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Project } from 'projects/models/project.model';
import { Repository } from 'projects/modules/repository';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search-interface',
  templateUrl: './search-interface.component.html',
  styleUrls: ['./search-interface.component.css']
})
export class SearchInterfaceComponent implements OnInit, OnDestroy {      
  private projectListSub: Subscription = new Subscription();
  private patientsListSub: Subscription = new Subscription();
  private projectIds: number[] = [];
  private allProjects: Project[] = [];
  selectable = true;
  removable = true;          
  patientSearchForm: FormGroup = new FormGroup({});
  selectedProjects: Project[] = [];
  hasDoneSearch: boolean = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  projectCtrl = new FormControl();
  dob = new FormControl();
  filteredProjects: Observable<Project[]> = new Observable<Project[]>();
  @ViewChild('projectInput') projectInput: ElementRef<HTMLInputElement> = {} as ElementRef;

  constructor(private searchService: SearchService,
    private repo: Repository,
    private router: Router,
    private route: ActivatedRoute) {

      this.filteredProjects = this.projectCtrl.valueChanges.pipe(
        startWith(null),
        map((project: Project | null) => project ? this._filter(project.projectId!) : this.allProjects.slice()));
    }

  ngOnInit(): void {

    this.patientSearchForm = new FormGroup({
      patientUIN: new FormControl(null),
      hospitalUR: new FormControl(null),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      dob: new FormControl(null),
      project: new FormControl(0),
      projectCtrl: this.projectCtrl
    });

    this.patientSearchForm.setValue({
      'firstName': null,
      'lastName': null,
      'patientUIN': null,
      'hospitalUR': null,
      'dob': '',
      'project': 0,
      'projectCtrl': null
    });

    this.projectListSub = this.route.data.subscribe((data: Data) => {
      this.allProjects = data['projects'];
    });

    this.patientsListSub = this.repo.patientsChanged.subscribe(p => {
      this.searchService.hasSearched.next(true);
      this.hasDoneSearch = true;
      this.repo.filter.reset();
      this.router.navigate([{ outlets: { searchresults: 'results' }}], { relativeTo: this.route });
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.projectIds.push(parseInt(value));
      this.selectedProjects.splice(parseInt(value));
    }

    // Clear the input value
    event.chipInput!.clear();
    this.projectCtrl.setValue(null);
  }

  remove(project: Project): void {
    const index = this.selectedProjects.indexOf(this.selectedProjects.find(p => p.projectId === project.projectId)!);

    if (index >= 0) {
      this.projectIds.splice(index, 1);
      this.selectedProjects.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    
    const value = parseInt(event.option.value);

    this.projectIds.push(value);
    this.selectedProjects.push(this.allProjects.find(p => p.projectId! === value)!);

    this.projectInput.nativeElement.value = '';
    this.projectCtrl.setValue(null);
  }

  private _filter(value: number): Project[] {
    const filterValue = value;

    return this.allProjects.filter(project => project.projectId === filterValue);
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
        const searchDate = this.patientSearchForm.get('dob')?.value

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

        if (searchDate) {
          searchString += 'dob=' + encodeURIComponent(new Date(searchDate).toDateString()) + '&';
        }

        if (this.selectedProjects.length != 0)
        {
          searchString += 'projectid=' + encodeURIComponent(this.projectIds.join(',')) + '&';
        }
       
        searchString = searchString.substr(0, searchString.length - 1);

        this.repo.filter.related = true;
        this.repo.filter.search = searchString;

        console.log(searchString);
        
        this.repo.getPatients();
  }
 
  createNewPatient() {
    this.router.navigate(['/patient/new']);
  }

  ngOnDestroy() {
    this.projectListSub.unsubscribe();
    this.patientsListSub.unsubscribe();
  }
}
