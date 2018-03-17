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

import { D3Service } from 'd3-ng2-service';
import { DataService } from './shared/data.service';
import { ColorMapService } from './shared/color-map.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { ChapterModelResolver } from './model/resolver/chapter.model.resolver';
import { StatesGeoJsonResolver, CountiesGeoJsonResolver, DistrictsGeoJsonResolver } from './model/resolver/geojson.resolver';
import { StateTotalsResolver, CountyTotalsResolver, DistrictTotalsResolver, StateNumbersResolver } from './model/resolver/data.resolver';
import { InfoBoxService } from './shared/info-box.service';
import { LegendService } from './shared/legend.service';
import { MarkerService } from './shared/marker.service';
import { PopupService } from './shared/popup.service';
import { EmailModalComponent } from './email-modal/email-modal.component';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ListComponent,
    MapComponent,
    EmailModalComponent,
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
