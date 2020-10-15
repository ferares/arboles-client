import { Component, ViewChild } from '@angular/core';
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
  @ViewChild('aboutModal', { static: false }) private aboutModal;
  @ViewChild('tree', { static: false }) private treeComponent;
  @ViewChild('map', { static: false }) private mapComponent;
  public species = [];
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

  public displayAboutModal(): void {
    this.aboutModal.display();
  }

  public updateLatlng(latlng: LatLng): void {
    this.displayMarker = true;
    this.latlng = latlng;
  }

  public updateTrees(trees: any[]): void {
    this.mapComponent.displayTrees(trees);
  }

  public removeMarker(): void {
    this.mapComponent.removeMarker();
  }

  public updateTree(treeId): void {
    this.treeComponent.displayTree(treeId);
  }

}
