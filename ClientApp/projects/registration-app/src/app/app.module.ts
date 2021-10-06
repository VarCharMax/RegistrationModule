import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BaseUrlInterceptor } from 'projects/interceptors/baseurlinterceptor';
import { BrowserModule } from '@angular/platform-browser';
import { CanActivatePatientsGuard } from './services/can-activate-guard.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { CliniciansResolver } from 'projects/resolvers/clinicians-resolver.service';
import { ErrorPageComponent } from 'projects/error-page/error-page.component';
import { FooterComponent } from './page-elements/footer/footer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './page-elements/header/header.component';
import { HomeComponent } from './screens/home/home.component';
import { ModelModule } from 'projects/modules/model.module';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from '../../../page-not-found/page-not-found.component';
import { PatientComponent } from './screens/patient/patient.component';
import { PatientDisplayComponent } from './screens/patient/patient-display/patient-display.component';
import { PatientEditComponent } from './screens/patient/patient-edit/patient-edit.component';
import { PatientListComponent } from './screens/patient/patient-list/patient-list.component';
import { PatientListElementComponent } from './page-elements/patient-list-element/patient-list-element.component';
import { PatientRegisterComponent } from './screens/patient/patient-register/patient-register.component';
import { PatientResolver } from 'projects/resolvers/patient-resolver.service';
import { PatientSearchElementComponent } from './page-elements/search/patient-list-element/patient-search-element.component';
import { PatientsResolver } from 'projects/resolvers/patients-resolver.service';
import { ProjectsResolver } from 'projects/resolvers/projects-resolver.service';
import { SearchComponent } from './screens/search/search/search.component';
import { SearchInterfaceComponent } from './screens/search/search-interface/search-interface.component';
import { SearchResultsComponent } from './screens/search/search-results/search-results.component';
import { SearchService } from './services/search.service';
import { SexesResolver } from 'projects/resolvers/sexes-resolver.service';
import { TreatmentLocationsResolver } from 'projects/resolvers/treatmentlocations-resolver.service';
import { environment } from 'projects/registration-app/src/environments/environment';

//import { HelpComponent } from './screens/help/help.component';

@NgModule({
  declarations: [
        AppComponent,
        HomeComponent,
        PageNotFoundComponent,
        ErrorPageComponent,
        HeaderComponent,
        FooterComponent,
        SearchComponent,
        SearchInterfaceComponent,
        SearchResultsComponent,
        PatientDisplayComponent,
        PatientEditComponent,
        PatientListComponent,
        PatientComponent,
        PatientRegisterComponent,
        PatientListElementComponent,
        PatientSearchElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModelModule,
    FormsModule,
    ReactiveFormsModule
  ],
    providers: [
      CanDeactivateGuard,
      CanActivatePatientsGuard,
      CliniciansResolver,
      ProjectsResolver,
      TreatmentLocationsResolver,
      PatientsResolver,
      SexesResolver,
      PatientResolver,
      SearchService,
      { provide: "BASE_API_URL", useValue: environment.apiUrl },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: BaseUrlInterceptor,
        multi: true
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
