import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  public species = []; // System species
  public latlng: LatLng; // Selected latitude and longitude
  public adClient = environment.adsenseClient; // Adsense
  public adSlot = environment.adsenseSlot; // Adsense
  public icons = { // Fontawesome icons
    faFacebook,
  };

  constructor(private route: ActivatedRoute, private titleService: Title) {
    this.species = route.snapshot.data.species;
    this.titleService.setTitle('Arbolado Urbano');
  }

  /**
   * Displays the "about" modal
   */
  public displayAboutModal(): void {
    this.aboutModal.display();
  }

  /**
   * Update's the selected latlng
   */
  public updateLatlng(latlng: LatLng): void {
    this.latlng = latlng;
  }

  /**
   * Updates the trees to display
   */
  public updateTrees(trees: any[]): void {
    this.mapComponent.displayTrees(trees);
  }

  /**
   * Removes the map marker
   */
  public removeMarker(): void {
    this.mapComponent.removeMarker();
  }

  /**
   * Updates the selected tree
   */
  public updateTree(treeId): void {
    this.treeComponent.displayTree(treeId);
  }

}
