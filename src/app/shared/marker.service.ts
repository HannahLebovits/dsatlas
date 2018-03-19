import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { ChapterModel } from './model/chapter.model';
import { PopupService } from './popup.service';

@Injectable()
export class MarkerService {
  constructor(private _popupService: PopupService) {}

  minRadius = 7;
  scalar = 30;
  clipMax = 30;

  populateChapterMarkers(map: L.Map, chapters: ChapterModel[]) {
    const range = this.getRange(chapters);
    const circles = [];
    const markerClusters = L.markerClusterGroup({
      maxClusterRadius: 15,
      iconCreateFunction: (cluster) => {
        const size = cluster.getChildCount();
        const html = '<div class="clusterInner">' + size + '</div>';
        return L.divIcon({
          html: html,
          className: 'clusterOuter',
          iconSize: L.point(this.clipMax, this.clipMax) });
      },
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true
    });

    for (const c of chapters) {
      c.LatLng = new L.LatLng(c.lat, c.lon);
      const circle = L.circleMarker(c.LatLng, {
        color: '#fff',
        weight: 2,
        fill: true,
        fillColor: '#f00',
        fillOpacity: 0.7,
        opacity: 0.7,
        radius: this.radius(c, this.scalar, range, this.minRadius, this.clipMax)
      });

      circle.on({
        click: (e) => {
          map.panTo(e.target._latlng, { animate: true });
        }
      });

      circle.bindPopup(this._popupService.makePopup(c));

      circles.push(circle);
    }

    markerClusters.addLayers(circles);

    return markerClusters;
  }

  radius(d, scalar, range, minRadius, maxClip) {
    return Math.min(maxClip, (scalar * (d.members - range.min) / (range.max - range.min)) + minRadius);
  }

  getRange(chapters: ChapterModel[]): any {
    let min = 9999;
    let max = 0;

    for (const c of chapters) {
      if (c.hasOwnProperty('members')) {
        if (c.members < min) { min = c.members; }
        if (c.members > max) { max = c.members; }
      }
    }
    return { 'min': min, 'max': max };
  }
}
