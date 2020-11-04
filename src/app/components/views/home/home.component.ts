import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import { LatLng } from 'leaflet';

import { NominatimService } from '../../../services/nominatim.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  @ViewChild('aboutModal', { static: false }) private aboutModal;
  @ViewChild('emptyTreesModal', { static: false }) private emptyTreesModal;
  @ViewChild('addTreeModal', { static: false }) private addTreeModal;
  @ViewChild('tree', { static: false }) private treeComponent;
  @ViewChild('map', { static: false }) private mapComponent;
  public addressSearch = '';
  public addressResults = [];
  public species = []; // System species
  public latlng: LatLng; // Selected latitude and longitude
  public adClient = environment.adsenseClient; // Adsense
  public adSlot = environment.adsenseSlot; // Adsense
  public icons = { // Fontawesome icons
    faFacebook,
    faPlusSquare,
  };

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private nominatimService: NominatimService,
  ) {
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
   * Displays the "add tree" modal
   */
  public displayAddTreeModal(): void {
    this.addTreeModal.display();
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
    if (!trees.length) {
      // If there are no trees to display show an info modal with some help
      this.emptyTreesModal.display();
    }

    this.mapComponent.displayTrees(trees);
  }

  /**
   * Sets the map marker
   */
  public setMarker(latlng: LatLng): void {
    this.mapComponent.setMarker(latlng);
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

  public selectAddress(latlng: LatLng): void {
    this.setMarker(latlng);
    this.addressSearch = '';
    this.addressResults = [];
  }

  /**
   * Looks for an address or place
   */
  public addressLookup(event): void {
    if ((event.keyCode === 13) && (this.addressSearch)) {
      const bounds = this.mapComponent.getMapBounds();
      this.nominatimService.addressLookup(this.addressSearch, bounds).subscribe(
        (results) => this.addressResults = results,
      );
    }
  }

}
