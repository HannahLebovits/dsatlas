import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaModule } from 'ng-recaptcha';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { ToastrModule } from 'ngx-toastr';

import { D3Service } from 'd3-ng2-service';
import { DataService } from './shared/data.service';
import { ColorMapService } from './shared/color-map.service';

import { AppComponent } from './app.component';
import { NavComponent } from './site/nav/nav.component';
import { ListComponent } from './site/list/list.component';
import { MapComponent } from './site/map/map.component';
import { EmailModalComponent } from './site/email-modal/email-modal.component';
import { InfoModalComponent } from './site/info-modal/info-modal.component';
import { LoginComponent } from './admin/login/login.component';
import { LandingComponent } from './site/landing/landing.component';
import { BackOfficeComponent } from './admin/backoffice/backoffice.component';
import { BackOfficeChapterDetailComponent } from './admin/backoffice-chapter-detail/backoffice-chapter-detail.component';
import { BackOfficeChapterListComponent } from './admin/backoffice-chapter-list/backoffice-chapter-list.component';
import { BackOfficeNavComponent } from './admin/nav/backoffice-nav.component';

import { ChapterModelResolver } from './shared/model/resolver/chapter.model.resolver';
import { StatesGeoJsonResolver,
         CountiesGeoJsonResolver,
         DistrictsGeoJsonResolver } from './shared/model/resolver/geojson.resolver';
import { StateTotalsResolver,
         CountyTotalsResolver,
         DistrictTotalsResolver,
         StateNumbersResolver } from './shared/model/resolver/data.resolver';

import { InfoBoxService } from './shared/info-box.service';
import { LegendService } from './shared/legend.service';
import { MarkerService } from './shared/marker.service';
import { PopupService } from './shared/popup.service';
import { StatesService } from './shared/states.service';
import { LogoutComponent } from './admin/logout/logout.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AuthGuard } from './shared/auth/auth.guard';
import { AuthService } from './shared/auth/auth.service';
import { BackOfficeChapterEditorComponent } from './admin/backoffice-chapter-editor/backoffice-chapter-editor.component';
import { AuthChildGuard } from './shared/auth/auth.child.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const firebaseConfig = {
  apiKey: 'AIzaSyAccxleX1mLSZFdY5vReEz2V38jUq3ezkw',
  authDomain: 'dsatlas-c72aa.firebaseapp.com',
  databaseURL: 'https://dsatlas-c72aa.firebaseio.com',
  projectId: 'dsatlas-c72aa',
  storageBucket: '',
  messagingSenderId: '231399376714'
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent,
    ListComponent,
    MapComponent,
    EmailModalComponent,
    InfoModalComponent,
    LoginComponent,
    LogoutComponent,
    BackOfficeComponent,
    BackOfficeChapterDetailComponent,
    BackOfficeChapterListComponent,
    BackOfficeNavComponent,
    BackOfficeChapterEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FilterPipeModule,
    FormsModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.cubeGrid,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#f00',
    }),
    ReactiveFormsModule,
    RecaptchaFormsModule,
    OrderModule,
    ToastrModule.forRoot({ timeOut: 2000 }),
    NgbModule.forRoot(),
    RecaptchaModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthChildGuard,
    D3Service,
    DataService,
    ColorMapService,
    InfoBoxService,
    LegendService,
    MarkerService,
    PopupService,
    StatesService,
    ChapterModelResolver,
    CountiesGeoJsonResolver,
    DistrictsGeoJsonResolver,
    StateTotalsResolver,
    CountyTotalsResolver,
    DistrictTotalsResolver,
    StatesGeoJsonResolver,
    StateNumbersResolver
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
