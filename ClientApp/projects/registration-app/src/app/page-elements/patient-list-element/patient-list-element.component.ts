import { Component, Input, OnInit } from '@angular/core';

import { Patient } from 'projects/models/patient.model';

@Component({
  selector: 'app-patient-list-item',
  templateUrl: './patient-list-element.component.html',
  styleUrls: ['./patient-list-element.component.css']
})
export class PatientListElementComponent {

  @Input() patient: Patient = new Patient;

  constructor() { }

}
