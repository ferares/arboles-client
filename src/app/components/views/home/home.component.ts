import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public species = [];
  public adClient = environment.adsenseClient;
  public adSlot = environment.adsenseSlot;

  constructor(private route: ActivatedRoute) {
    this.species = route.snapshot.data.species;
  }

}
