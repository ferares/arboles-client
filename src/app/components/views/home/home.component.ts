import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public species = [];

  constructor(private route: ActivatedRoute) {
    this.species = route.snapshot.data.species;
  }

}
