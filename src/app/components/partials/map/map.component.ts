import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import * as L from 'leaflet';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html',
})
export class MapComponent implements OnChanges {
  @Input() public trees = [];
  @Input() public displayMarker = false;
  @Output() public markerSet: EventEmitter<L.LatLng> = new EventEmitter();
  @Output() public treeSelected: EventEmitter<L.LatLng> = new EventEmitter();
  public layers = [];
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
  public marker: L.Marker;
  public circle: L.Circle;
  public treeMarkers: L.Marker[] = [];
  private defaultIcon: L.Icon;

  constructor() {
    this.defaultIcon = new L.Icon({
      iconAnchor: [15, 31],
      iconSize: [30, 34],
      iconUrl: `assets/imgs/markers/marker.png`,
    });
  }

  // When the tree list is updated => update the map
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.trees) {
      this.treeMarkers = [];
      for (const tree of this.trees) {
        let icon = this.defaultIcon;
        if (tree.icono) {
          icon = new L.Icon({
            iconAnchor: [15, 31],
            iconSize: [30, 34],
            iconUrl: `assets/imgs/markers/${tree.icono}`,
          });
        }
        this.treeMarkers.push(
          new L.Marker([tree.lat, tree.lng], { icon }).on('click', () => {
            this.selectTree(tree.id);
          }),
        );
      }
    }

    if ((changes.displayMarker) && (!this.displayMarker)) {
      this.layers = [];
      delete this.marker;
      delete this.circle;
    }
  }

  private latlngUpdated(map, latlng: L.LatLng): void {
    // Emit the new marker coordinates
    this.markerSet.emit(latlng);
    // Re-center the map around the marker
    map.panTo(latlng);
  }

  public setMarker(event): void {
    const map = event.target;
    // If there's no marker on the map...
    if (!this.marker) {
      L.Icon.Default.imagePath = 'assets/imgs/markers/';
      // Create a new marker
      this.marker = new L.Marker([event.latlng.lat, event.latlng.lng], {
        draggable: true,
        riseOnHover: true,
      });
      this.layers.push(this.marker);

      // Create a circle around it to show the search radius
      this.circle = new L.Circle(
        [event.latlng.lat, event.latlng.lng],
        environment.searchRadius,
        {
          color: '#000',
          fillColor: '#ddd',
          fillOpacity: 0.3,
        },
      );
      this.layers.push(this.circle);

      // When the marker is dragged move the circle to it
      this.marker.on('dragend', (dragEvent) => {
        const latlng = dragEvent.target.getLatLng();
        this.circle.setLatLng(latlng);
        this.latlngUpdated(map, latlng);
      });
    } else {
      // If a marker already exists, move it and its circle
      this.marker.setLatLng([event.latlng.lat, event.latlng.lng]);
      this.circle.setLatLng([event.latlng.lat, event.latlng.lng]);
    }

    this.latlngUpdated(map, event.latlng);
  }

  public selectTree(id): void {
    // Emit the selected tree
    this.treeSelected.emit(id);
  }

}
