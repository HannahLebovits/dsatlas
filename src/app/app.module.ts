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

import { D3Service } from 'd3-ng2-service';
import { DataService } from './shared/data.service';
import { ColorMapService } from './shared/color-map.service';

import { AppComponent } from './app.component';
import { NavComponent } from './site/nav/nav.component';
import { ListComponent } from './site/list/list.component';
import { MapComponent } from './site/map/map.component';
import { EmailModalComponent } from './site/email-modal/email-modal.component';
import { InfoModalComponent } from './site/info-modal/info-modal.component';

import { ChapterModelResolver } from './shared/model/resolver/chapter.model.resolver';
import { StatesGeoJsonResolver, CountiesGeoJsonResolver, DistrictsGeoJsonResolver } from './shared/model/resolver/geojson.resolver';
import { StateTotalsResolver, CountyTotalsResolver, DistrictTotalsResolver, StateNumbersResolver } from './shared/model/resolver/data.resolver';

import { InfoBoxService } from './shared/info-box.service';
import { LegendService } from './shared/legend.service';
import { MarkerService } from './shared/marker.service';
import { PopupService } from './shared/popup.service';
import { LoginComponent } from './admin/login/login.component';
import { LandingComponent } from './site/landing/landing.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent,
    ListComponent,
    MapComponent,
    EmailModalComponent,
    LoginComponent,
    InfoModalComponent
  ],
  imports: [
    BrowserModule,
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
    NgbModule.forRoot(),
    RecaptchaModule.forRoot()
  ],
  providers: [
    D3Service,
    DataService,
    ColorMapService,
    InfoBoxService,
    LegendService,
    MarkerService,
    PopupService,
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
