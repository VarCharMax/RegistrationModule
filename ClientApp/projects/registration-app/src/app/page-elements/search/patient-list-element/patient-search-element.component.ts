import { Component, Input, OnInit } from '@angular/core';

import { Patient } from 'projects/models/patient.model';

@Component({
  selector: 'app-patient-search-element',
  templateUrl: './patient-search-element.component.html',
  styleUrls: ['./patient-search-element.component.css']
})
export class PatientSearchElementComponent implements OnInit {
  @Input() patients: Patient[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

  GoToPatientDetailsPage(id: number) {

  }

}
