import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { ApiService } from '../../../services/api.service';

import { LatLng } from 'leaflet';

@Component({
  selector: 'app-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnChanges {
  // Event emitter for when the search results have been loaded
  @Output() public treesLoaded: EventEmitter<any[]> = new EventEmitter();
  // Event emitter for when the user wants to remove the map marker
  @Output() public allMapSelected: EventEmitter<L.LatLng> = new EventEmitter();
  @Input() public species: any[]; // List of species for the select element
  @Input() public latlng: LatLng; // Selected latlng for the search
  public isCollapsed = true; // Indicates if the "more filters" section is collapsed
  public validated = false; // Indicates if the form has been validated
  public form: FormGroup; // Search form
  public popoverText = 'Para buscar, empezá marcando un punto en el mapa. O podés buscar en toda la ciudad si seleccionás alguna especie.';
  public popoverTitle = 'Opa, ¡esos son muchos árboles!';
  public popoverOpen = false;
  public icons = { // Fontawesome icons
    faTrashAlt,
  };

  constructor(private apiService: ApiService) {
    this.form = new FormGroup({
      flavors: new FormControl(0),
      marker: new FormControl('0'),
      origin: new FormControl(''),
      region: new FormGroup({
        cuyana: new FormControl(0),
        nea: new FormControl(0),
        noa: new FormControl(0),
        pampeana: new FormControl(0),
        patagonica: new FormControl(0),
      }),
      species: new FormControl(''),
    });

    // When the marker FormControl is set to "0" => emit an event indicating this
    this.form.controls.marker.valueChanges.subscribe((value) => {
      if (value === '0') {
        this.allMapSelected.emit();
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.latlng) {
      if (this.latlng) {
        // If a latlng has been selected => update the "marker" FormControl value
        this.form.controls.marker.setValue('1');
      }
    }

    if (changes.species) {
      if (this.species) {
        // If the species have been loaded => add a value for "all" species
        this.species.unshift({
          id: '',
          nombre_cientifico: 'Todas',
        });
      }
    }
  }

  /**
   * Resets the "origin" FormControl value
   */
  public cleanOrigin(): void {
    this.form.controls.origin.reset('');
  }

  /**
   * Performs a tree search with the selected filters
   */
  public search(): void {
    // If the form is not valid => return
    if (this.form.invalid) {
      this.validated = true;
      return;
    }

    // Reset info message status
    this.popoverOpen = false;

    // Get the form data and set the selected latlng if any
    const data = this.form.value;
    if (data.marker === '1') {
      data.marker = `${this.latlng.lat} ${this.latlng.lng}`;
    } else if ((!data.species) && (data.marker === '0')) {
      // If there's no marker and no species selected =>
      // Don't search, display info message instead
      this.popoverOpen = true;
      return;
    }

    // Perform the tree search
    this.apiService.search(data).subscribe(
      (trees) => this.treesLoaded.emit(trees), // Emit the search results
      (errors) => {
        if (errors) {
          this.validated = true;
        }
      },
    );
  }
}
