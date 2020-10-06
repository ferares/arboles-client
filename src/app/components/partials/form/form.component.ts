import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ApiService } from '../../../services/api.service';

import { LatLng } from 'leaflet';

@Component({
  selector: 'app-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  @Input() public species: any[];
  @Input() public latlng: LatLng;
  @Output() public trees: EventEmitter<any[]> = new EventEmitter();
  public isCollapsed = true;
  public validated = false;
  public form: FormGroup;

  constructor(private apiService: ApiService) { }

  public ngOnInit(): void {
    this.form = new FormGroup({
      flavors: new FormControl(false),
      marker: new FormControl(''),
      origin: new FormControl(''),
      region: new FormControl([]),
      species: new FormControl(''),
    });
  }

  public search(): void {
    if (this.form.invalid) {
      this.validated = true;
      return;
    }

    const data = JSON.stringify(this.form.value);

    this.apiService.search(data).subscribe(
      (trees) => this.trees.emit(trees),
      (errors) => {
        if (errors) {
          this.validated = true;
        }
      },
    );
  }
}
