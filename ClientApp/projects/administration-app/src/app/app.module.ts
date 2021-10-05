import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ClinicianDetailsComponent } from './screens/clinician-management/clinician-details/clinician-details.component';
import { ClinicianDisplayComponent } from './screens/clinician-management/clinician-display/clinician-display.component';
import { ClinicianEditComponent } from './screens/clinician-management/clinician-edit/clinician-edit.component';
import { ClinicianHospitalComponent } from './screens/clinician-management/clinician-hospital/clinician-hospital.component';
import { ClinicianManagementComponent } from './screens/clinician-management/clinician-management.component';
import { ClinicianResolver } from 'projects/resolvers/clinician-resolver.service';
import { CliniciansListComponent } from './screens/clinician-management/clinicians-list/clinicians-list.component';
import { CliniciansResolver } from 'projects/resolvers/clinicians-resolver.service';
import { ContentManagementComponent } from './screens/content-management/content-management.component';
import { FooterComponent } from './page-elements/footer/footer.component';
import { HeaderComponent } from './page-elements/header/header.component';
import { LocationDisplayComponent } from './screens/treatment-location-management/location-display/location-display.component';
import { LocationEditComponent } from './screens/treatment-location-management/location-edit/location-edit.component';
import { LocationsListComponent } from './screens/treatment-location-management/locations-list/locations-list.component';
import { ModelModule } from 'projects/modules/model.module';
import { NgModule } from '@angular/core';
import { ProjectDisplayComponent } from './screens/project-management/project-display/project-display.component';
import { ProjectEditComponent } from './screens/project-management/project-edit/project-edit.component';
import { ProjectManagementComponent } from './screens/project-management/project-management.component';
import { ProjectResolver } from 'projects/resolvers/project-resolver.service';
import { ProjectsListComponent } from './screens/project-management/projects-list/projects-list.component';
import { ProjectsResolver } from 'projects/resolvers/projects-resolver.service';
import { TreatmentLocationManagementComponent } from './screens/treatment-location-management/treatment-location-management.component';
import { TreatmentLocationResolver } from 'projects/resolvers/treatmentlocation-resolver.service';
import { TreatmentLocationsResolver } from 'projects/resolvers/treatmentlocations-resolver.service';
import { UserDetailsComponent } from './screens/user-management/user-details/user-details.component';
import { UserHospitalsComponent } from './screens/user-management/user-hospitals/user-hospitals.component';
import { UserManagementComponent } from './screens/user-management/user-management.component';
import { UserRoleComponent } from './screens/user-management/user-role/user-role.component';
import { HomeComponent } from './screens/home/home.component';
import { ProjectCreateComponent } from './screens/project-management/project-create/project-create.component';
import { ClinicianCreateComponent } from './screens/clinician-management/clinician-create/clinician-create.component';
import { ContentListComponent } from './screens/content-management/content-list/content-list.component';
import { ContentDisplayComponent } from './screens/content-management/content-display/content-display.component';
import { ContentEditComponent } from './screens/content-management/content-edit/content-edit.component';
import { ContentCreateComponent } from './screens/content-management/content-create/content-create.component';
import { LocationCreateComponent } from './screens/treatment-location-management/location-create/location-create.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    UserHospitalsComponent,
    UserDetailsComponent,
    ClinicianManagementComponent,
    ClinicianDetailsComponent,
    ClinicianHospitalComponent,
    UserManagementComponent,
    UserRoleComponent,
    ContentManagementComponent,
    ProjectManagementComponent,
    CliniciansListComponent,
    ClinicianDisplayComponent,
    ClinicianEditComponent,
    LocationsListComponent,
    LocationDisplayComponent,
    LocationEditComponent,
    ProjectsListComponent,
    ProjectDisplayComponent,
    ProjectEditComponent,
    TreatmentLocationManagementComponent,
    HomeComponent,
    ProjectCreateComponent,
    ClinicianCreateComponent,
    ContentListComponent,
    ContentDisplayComponent,
    ContentEditComponent,
    ContentCreateComponent,
    LocationCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    ModelModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ClinicianResolver,
    CliniciansResolver,
    ProjectResolver,
    ProjectsResolver,
    TreatmentLocationResolver,
    TreatmentLocationsResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
