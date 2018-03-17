import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './map/map.component';
import { ListComponent } from './list/list.component';
import { ChapterModelResolver } from './model/resolver/chapter.model.resolver';
import { CountiesGeoJsonResolver, DistrictsGeoJsonResolver, StatesGeoJsonResolver } from './model/resolver/geojson.resolver';
import { StateTotalsResolver, CountyTotalsResolver, DistrictTotalsResolver, StateNumbersResolver } from './model/resolver/data.resolver';

const appRoutes: Routes = [
  { path: '',
    resolve: {
      chapters: ChapterModelResolver,
      statesGeoJson: StatesGeoJsonResolver,
      countiesGeoJson: CountiesGeoJsonResolver,
      districtsGeoJson: DistrictsGeoJsonResolver,
      stateTotals: StateTotalsResolver,
      countyTotals: CountyTotalsResolver,
      districtTotals: DistrictTotalsResolver,
      stateNumbers: StateNumbersResolver
    },
    children: [
      { path: '', redirectTo: '/map', pathMatch: 'full' },
      { path: 'map', component: MapComponent },
      { path: 'list', component: ListComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes, { useHash: true }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ChapterModelResolver,
    StatesGeoJsonResolver,
    CountiesGeoJsonResolver,
    DistrictsGeoJsonResolver
  ]
})
export class AppRoutingModule {
}
