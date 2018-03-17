import { Component, OnInit } from '@angular/core';
import { ChapterModel } from '../model/chapter.model';
import { ColorMapService } from '../shared/color-map.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InfoBoxService } from '../shared/info-box.service';
import { LegendService } from '../shared/legend.service';
import { MarkerService } from '../shared/marker.service';
import * as L from 'leaflet';
import { LatLng } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [ './map.component.scss' ]
})
export class MapComponent implements OnInit {
  dsamap;

  chapters: ChapterModel[];
  totals = {};
  geojsons = {};
  stateNumbers = {};
  layers = [];
  infoBoxes = [];
  legends = [];
  markers;
  chaptersPerState = {};
  queried: boolean;
  off;


  lat = 51;
  lon = -110;
  zoom = 3;

  keys = ['state', 'counties', 'districts'];

  initMap() {
    this.dsamap = L.map('map', { center: [ this.lat, this.lon ], zoom: this.zoom });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.dsamap);
  }

  initLayer(scope: string) {
    return L.geoJSON(this.geojsons[scope], {
      style: (feature) => ({
        weight: 1,
        opacity: 0.5,
        color: '#333',
        dashArray: '0',
        fillOpacity: 0.8,
        fillColor: this.getColor(feature, scope)
      }),
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e, scope)),
          mouseout: (e) => (this.resetHighlight(e, scope)),
          click: (e) => (this.zoomToFeature(e, scope))
        })
      )
    });
  }

  getColor(feature: any, scope: string) {
    let key;
    switch (scope) {
      case('states'):
        key = feature.properties.abbr;
        break;
      case('counties'):
        key = feature.properties.STATE + feature.properties.COUNTY;
        break;
      case('districts'):
        key = feature.properties.STATE + feature.properties.CD;
        break;
      default:
    }
    return this._colorService.getColor(this.totals[scope][key], scope, 'reds');
  }

  highlightFeature(e, scope) {
    const layer = e.target;
    layer.setStyle({
      fillOpacity: 1.0,
      weight: 2
    });
    this.infoBoxes[scope].update(layer.feature.properties);
  }

  resetHighlight(e, scope) {
    this.layers[scope].resetStyle(e.target);
    this.infoBoxes[scope].update();
  }

  zoomToFeature(e, scope) {
    this.dsamap.fitBounds(e.target.getBounds());
    this.resetHighlight(e, scope);
    this.highlightFeature(e, scope);
  }

  setLayers() {
    this.layers['states'] = this.initLayer('states');
    this.layers['counties'] = this.initLayer('counties');
    this.layers['districts'] = this.initLayer('districts');
    this.setLayersControl();
  }

  setLayersControl() {
    const baseLayers = {
      'States': this.layers['states'],
      'Counties': this.layers['counties'],
      'Congressional Districts': this.layers['districts'],
      'Off': this.off
    };
    const overlays = {
      'DSA Chapters': this.markers
    };
    L.control.layers(baseLayers, overlays).addTo(this.dsamap);

    this.dsamap.addLayer(this.queried ? this.off : this.layers['states']);
    this.dsamap.addLayer(this.markers);
    this.dsamap.on({
      baselayerchange: (e) => this.toggleInfoBox(e) });
  }

  getMarkers() {
    this.markers = this._markerService.populateChapterMarkers(this.dsamap, this.chapters);
  }

  toggleInfoBox(e) {

    let scope = '';
    for (const box of Object.keys(this.infoBoxes)) {
      this.infoBoxes[box].remove(this.dsamap);
      this.legends[box].remove(this.dsamap);
    }

    switch (e.name) {
      case ('States'): { scope = 'states'; break; }
      case ('Counties'): { scope = 'counties'; break; }
      case ('Congressional Districts'): { scope  = 'districts'; break; }
      default: return;
    }

    this.infoBoxes[scope].addTo(this.dsamap);
    this.legends[scope].addTo(this.dsamap);
    this.layers[scope].bringToBack();
  }

  constructor(private _route: ActivatedRoute,
              private _colorService: ColorMapService,
              private _infoBoxService: InfoBoxService,
              private _legendService: LegendService,
              private _markerService: MarkerService) {}

  ngOnInit() {
    const lat = this._route.snapshot.queryParams['lat'];
    const lon = this._route.snapshot.queryParams['lon'];

    if (lat != null && lon != null) {
      this.queried = true;
      this.lat = lat;
      this.lon = lon;
      this.zoom = 9;
    }

    this.chapters = this._route.snapshot.parent.data[ 'chapters' ];

    this.geojsons[ 'states' ] = this._route.snapshot.parent.data[ 'statesGeoJson' ] as L.GeoJSON;
    this.geojsons[ 'counties' ] = this._route.snapshot.parent.data[ 'countiesGeoJson' ] as L.GeoJSON;
    this.geojsons[ 'districts' ] = this._route.snapshot.parent.data[ 'districtsGeoJson' ] as L.GeoJSON;

    this.totals[ 'states' ] = this._route.snapshot.parent.data[ 'stateTotals' ];
    this.totals[ 'counties' ] = this._route.snapshot.parent.data[ 'countyTotals' ];
    this.totals[ 'districts' ] = this._route.snapshot.parent.data[ 'districtTotals' ];

    this.stateNumbers = this._route.snapshot.parent.data[ 'stateNumbers' ];

    for (const c of this.chapters) {
      this.chaptersPerState[ c.state ] = (this.chaptersPerState[ c.state ] || 0) + 1;
    }

    this.infoBoxes[ 'states' ] = this._infoBoxService.stateInfoBox(this.totals[ 'states' ], this.chaptersPerState);
    this.infoBoxes[ 'counties' ] = this._infoBoxService.countyInfoBox(this.totals[ 'counties' ]);
    this.infoBoxes[ 'districts' ] = this._infoBoxService.districtBoxInfo(this.totals[ 'districts' ], this.stateNumbers);

    this.legends[ 'states' ] = this._legendService.makeLegend('reds', 'states');
    this.legends[ 'counties' ] = this._legendService.makeLegend('reds', 'counties');
    this.legends[ 'districts' ] = this._legendService.makeLegend('reds', 'districts');

    this.off = L.circleMarker(new L.LatLng(0, 0), {
      opacity: 0.0,
      fillOpacity: 0.0
    });

    this.initMap();
    this.getMarkers();
    this.setLayers();

    this.legends[ 'states' ].addTo(this.dsamap);
    this.infoBoxes[ 'states' ].addTo(this.dsamap);

  }

}
