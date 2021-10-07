import { RouterModule, Routes } from '@angular/router';

import { ClinicianCreateComponent } from './screens/clinician-management/clinician-create/clinician-create.component';
import { ClinicianDisplayComponent } from './screens/clinician-management/clinician-display/clinician-display.component';
import { ClinicianEditComponent } from './screens/clinician-management/clinician-edit/clinician-edit.component';
import { ClinicianManagementComponent } from './screens/clinician-management/clinician-management.component';
import { ClinicianResolver } from 'projects/resolvers/clinician-resolver.service';
import { CliniciansListComponent } from './screens/clinician-management/clinicians-list/clinicians-list.component';
import { CliniciansResolver } from 'projects/resolvers/clinicians-resolver.service';
import { ContentCreateComponent } from './screens/content-management/content-create/content-create.component';
import { ContentDisplayComponent } from './screens/content-management/content-display/content-display.component';
import { ContentEditComponent } from './screens/content-management/content-edit/content-edit.component';
import { ContentListComponent } from './screens/content-management/content-list/content-list.component';
import { ContentManagementComponent } from './screens/content-management/content-management.component';
import { ContentResolver } from 'projects/resolvers/content-resolver.service';
import { ContentsResolver } from 'projects/resolvers/contents-resolver.service';
import { ErrorPageComponent } from 'projects/error-page/error-page.component';
import { LocationCreateComponent } from './screens/treatment-location-management/location-create/location-create.component';
import { LocationDisplayComponent } from './screens/treatment-location-management/location-display/location-display.component';
import { LocationEditComponent } from './screens/treatment-location-management/location-edit/location-edit.component';
import { LocationsListComponent } from './screens/treatment-location-management/locations-list/locations-list.component';
import { NgModule } from '@angular/core';
import { ProjectCreateComponent } from './screens/project-management/project-create/project-create.component';
import { ProjectDisplayComponent } from './screens/project-management/project-display/project-display.component';
import { ProjectEditComponent } from './screens/project-management/project-edit/project-edit.component';
import { ProjectManagementComponent } from './screens/project-management/project-management.component';
import { ProjectResolver } from 'projects/resolvers/project-resolver.service';
import { ProjectsListComponent } from './screens/project-management/projects-list/projects-list.component';
import { ProjectsResolver } from 'projects/resolvers/projects-resolver.service';
import { TreatmentLocationManagementComponent } from './screens/treatment-location-management/treatment-location-management.component';
import { TreatmentLocationResolver } from 'projects/resolvers/treatmentlocation-resolver.service';
import { TreatmentLocationsResolver } from 'projects/resolvers/treatmentlocations-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/clinicians',
    pathMatch: 'full',
  },
  {
    path: 'clinicians',
    component: ClinicianManagementComponent,
    children: [
      {
        path: '',
        component: CliniciansListComponent,
        resolve: {
          clinicians: CliniciansResolver,
        },
      },
      {
        path: 'new',
        component: ClinicianCreateComponent,
      },
      {
        path: ':id',
        component: ClinicianDisplayComponent,
        resolve: {
          clinician: ClinicianResolver,
          treatmentlocations: TreatmentLocationsResolver,
        },
      },
      {
        path: ':id/edit',
        component: ClinicianEditComponent,
        resolve: {
          clinician: ClinicianResolver,
          treatmentlocations: TreatmentLocationsResolver,
        },
      },
    ],
  },
  {
    path: 'locations',
    component: TreatmentLocationManagementComponent,
    children: [
      {
        path: '',
        component: LocationsListComponent,
        resolve: {
          locations: TreatmentLocationsResolver,
        },
      },
      {
        path: 'new',
        component: LocationCreateComponent,
      },
      {
        path: ':id',
        component: LocationDisplayComponent,
        resolve: { location: TreatmentLocationResolver },
      },
      {
        path: ':id/edit',
        component: LocationEditComponent,
        resolve: { location: TreatmentLocationResolver },
      },
    ],
  },
  {
    path: 'projects',
    component: ProjectManagementComponent,
    children: [
      {
        path: '',
        component: ProjectsListComponent,
        resolve: { projects: ProjectsResolver },
      },
      {
        path: 'new',
        component: ProjectCreateComponent,
      },
      {
        path: ':id',
        component: ProjectDisplayComponent,
        resolve: { project: ProjectResolver },
      },
      {
        path: ':id/edit',
        component: ProjectEditComponent,
        resolve: { project: ProjectResolver },
      },
    ],
  },
  {
    path: 'content',
    component: ContentManagementComponent,
    children: [
      {
        path: '',
        component: ContentListComponent,
        resolve: { contents: ContentsResolver },
      },
      {
        path: 'new',
        component: ContentCreateComponent,
      },
      {
        path: ':id',
        component: ContentDisplayComponent,
        resolve: { content: ContentResolver },
      },
      {
        path: ':id/edit',
        component: ContentEditComponent,
        resolve: { content: ContentResolver },
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
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
