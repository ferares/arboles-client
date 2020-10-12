import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faFacebook } from '@fortawesome/free-brands-svg-icons';

import { LatLng } from 'leaflet';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public species = [];
  public trees = [];
  public treeId;
  public latlng: LatLng;
  public adClient = environment.adsenseClient;
  public adSlot = environment.adsenseSlot;
  public displayMarker = false;
  public icons = {
    faFacebook,
  };

  constructor(private route: ActivatedRoute) {
    this.species = route.snapshot.data.species;
  }

  public updateLatlng(latlng: LatLng): void {
    this.displayMarker = true;
    this.latlng = latlng;
  }

  public updateTrees(trees: any[]): void {
    this.trees = trees;
  }

  public updateTree(treeId): void {
    this.treeId = treeId;
  }

  public removeMarker(): void {
    this.displayMarker = false;
  }

}
