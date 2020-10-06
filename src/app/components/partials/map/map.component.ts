import { Component } from '@angular/core';

import * as L from 'leaflet';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html',
})
export class MapComponent {
  public options = {
    center: [-34.618, -58.44],
    clusterOptions: {
      disableClusteringAtZoom: environment.mapDisableClusteringAt,
      maxClusterRadius: 100, // px
      polygonOptions: {
        color: environment.highlightColor,
        fillColor: environment.highlightColor,
        fillOpacity: 0.1,
        opacity: 1,
        weight: 1,
      },
      showCoverageOnHover: true,
      spiderfyDistanceMultiplier: 2,
      zoomToBoundsOnClick: true,
    },
    layers: [
      L.tileLayer(`https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${environment.mapboxToken}`),
    ],
    maxZoom: 21,
    minZoom: 5,
    zoom: 12,
  };
  public trees: L.Marker[] = [];

  constructor() { }
}
