import { RouterModule, Routes } from '@angular/router';

import { CanActivatePatientsGuard } from './services/can-activate-guard.service'
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { CliniciansResolver } from 'projects/resolvers/clinicians-resolver.service';
import { ErrorPageComponent } from 'projects/error-page/error-page.component';
import { HomeComponent } from './screens/home/home.component';
import { NgModule } from '@angular/core';
import { PatientComponent } from './screens/patient/patient.component';
import { PatientDisplayComponent } from './screens/patient/patient-display/patient-display.component';
import { PatientEditComponent } from './screens/patient/patient-edit/patient-edit.component';
import { PatientListComponent } from './screens/patient/patient-list/patient-list.component';
import { PatientRegisterComponent } from './screens/patient/patient-register/patient-register.component';
import { PatientsResolver } from 'projects/resolvers/patients-resolver.service';
import { ProjectsResolver } from 'projects/resolvers/projects-resolver.service';
import { SearchComponent } from './screens/search/search/search.component';
import { SearchInterfaceComponent } from './screens/search/search-interface/search-interface.component';
import { SearchResultsComponent } from './screens/search/search-results/search-results.component';
import { SexesResolver } from 'projects/resolvers/sexes-resolver.service';
import { TreatmentLocationsResolver } from 'projects/resolvers/treatmentlocations-resolver.service';

// import { AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
  { 
    path: '', component: HomeComponent, resolve: { 
        clinicians: CliniciansResolver,
        sexes: SexesResolver,
        treatmentlocations: TreatmentLocationsResolver,
        patients: PatientsResolver
    }
}
,
  {
    path: 'search',
    component: SearchComponent,
    children: [
      { path: '', component: SearchInterfaceComponent, resolve: {
        sexes: SexesResolver,
        projects: ProjectsResolver
      } },
      { path: 'results', component: SearchResultsComponent, outlet: 'searchresults' },
    ],
  },
  {
    path: 'patient',
    component: PatientComponent, canActivate: [CanActivatePatientsGuard],
    children: [
      { path: '', component: PatientListComponent },
      {
        path: 'new',
        component: PatientRegisterComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          clinicians: CliniciansResolver,
          sexes: SexesResolver,
          projects: ProjectsResolver,
          treatmentlocations: TreatmentLocationsResolver,
        },
      },
      { path: ':id', component: PatientDisplayComponent },
      {
        path: ':id/edit',
        component: PatientEditComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          clinicians: CliniciansResolver,
          sexes: SexesResolver,
          projects: ProjectsResolver,
          treatmentlocations: TreatmentLocationsResolver,
        },
      },
    ],
  },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found!' },
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
