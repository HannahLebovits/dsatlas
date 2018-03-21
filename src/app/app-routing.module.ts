import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './site/map/map.component';
import { ListComponent } from './site/list/list.component';
import { ChapterModelResolver } from './shared/model/resolver/chapter.model.resolver';
import { CountiesGeoJsonResolver,
         DistrictsGeoJsonResolver,
         StatesGeoJsonResolver } from './shared/model/resolver/geojson.resolver';
import { StateTotalsResolver,
         CountyTotalsResolver,
         DistrictTotalsResolver,
         StateNumbersResolver } from './shared/model/resolver/data.resolver';
import { LoginComponent } from './admin/login/login.component';
import { LandingComponent } from './site/landing/landing.component';
import { BackOfficeComponent } from './admin/backoffice/backoffice.component';
import { AuthGuardService as AuthGuard } from './shared/auth/auth.guard';
import { BackOfficeChapterEditorComponent } from './admin/backoffice-chapter-editor/backoffice-chapter-editor.component';

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
      { path: '', component: LandingComponent,
        children: [
          { path: '', redirectTo: '/map', pathMatch: 'full' },
          { path: 'map', component: MapComponent },
          { path: 'list', component: ListComponent }
        ]
      },
    ]
  },
  { path: 'admin',
    children: [
      { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'backoffice',
        canActivate: [ AuthGuard ],
        resolve: { chapters: ChapterModelResolver },
        children: [
          { path: '', component: BackOfficeComponent,
            children: [
              { path: '', redirectTo: 'list', component: BackOfficeChapterEditorComponent }
            ]
          }
        ]
      }
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
