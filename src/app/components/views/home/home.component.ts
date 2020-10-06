import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  public latlng: LatLng = undefined;
  public adClient = environment.adsenseClient;
  public adSlot = environment.adsenseSlot;

  constructor(private route: ActivatedRoute) {
    this.species = route.snapshot.data.species;
  }

  public updateLatlng(event: LatLng): void {
    this.latlng = event;
  }

  public updateTrees(event: any[]): void {
    this.trees = event;
  }

}
