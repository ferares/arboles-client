import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-loader',
  styleUrls: ['./loader.component.scss'],
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements OnDestroy, OnInit {
  private suscripcion: Subscription; // Subscription for the system's loading state.
  public active = false; // Display or hide the loading indicator

  constructor(private apiService: ApiService) {}

  public ngOnInit(): void {
    // Subscribe to the system's loading state.
    this.suscripcion = this.apiService.modifyLoading$.subscribe(
      (loading) => this.active = loading, // Update the active flag
    );
  }

  public ngOnDestroy(): void {
    // Delete subscription
    this.suscripcion.unsubscribe();
  }
}
