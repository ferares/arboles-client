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
  @Input() public species: any[];
  @Input() public latlng: LatLng;
  @Output() public treesLoaded: EventEmitter<any[]> = new EventEmitter();
  @Output() public allMapSelected: EventEmitter<L.LatLng> = new EventEmitter();
  public isCollapsed = true;
  public validated = false;
  public form: FormGroup;
  public icons = {
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

    this.form.controls.marker.valueChanges.subscribe((value) => {
      if (value === '0') {
        this.allMapSelected.emit();
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.latlng) {
      if (this.latlng) {
        this.form.controls.marker.setValue('1');
      }
    }

    if (changes.species) {
      if (this.species) {
        this.species.unshift({
          id: '',
          nombre_cientifico: 'Todas',
        });
      }
    }
  }

  public cleanOrigin(): void {
    this.form.controls.origin.reset('');
  }

  public search(): void {
    if (this.form.invalid) {
      this.validated = true;
      return;
    }

    const data = this.form.value;
    if (data.marker) {
      data.marker = `${this.latlng.lat} ${this.latlng.lng}`;
    }

    this.apiService.search(data).subscribe(
      (trees) => this.treesLoaded.emit(trees),
      (errors) => {
        if (errors) {
          this.validated = true;
        }
      },
    );
  }
}
