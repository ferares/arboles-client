import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { SpeciesSelectComponent } from './components/form-controls/species-select/species-select.component';
import { AboutComponent } from './components/partials/about/about.component';
import { FormComponent } from './components/partials/form/form.component';
import { MapComponent } from './components/partials/map/map.component';
import { TreeComponent } from './components/partials/tree/tree.component';
import { HomeComponent } from './components/views/home/home.component';

// Resolvers
import { SpeciesResolver } from './resolvers/species.resolver';

// Services
import { ApiService } from './services/api.service';

// ngx-bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// ngx-leaflet
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';

// ng2-adsense
import { AdsenseModule } from 'ng2-adsense';

// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    FormComponent,
    TreeComponent,
    AboutComponent,
    SpeciesSelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    AdsenseModule.forRoot(),
    HttpClientModule,
    LeafletModule,
    LeafletMarkerClusterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [
    ApiService,
    SpeciesResolver,
  ],
})
export class AppModule { }
