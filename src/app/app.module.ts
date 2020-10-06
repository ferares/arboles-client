import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeciesSelectComponent } from './components/form-controls/species-select/species-select.component';
import { AboutComponent } from './components/partials/about/about.component';
import { AdsenseComponent } from './components/partials/adsense/adsense.component';
import { FormComponent } from './components/partials/form/form.component';
import { MapComponent } from './components/partials/map/map.component';
import { TreeComponent } from './components/partials/tree/tree.component';
import { HomeComponent } from './components/views/home/home.component';

import { SpeciesResolver } from './resolvers/species.resolver';

import { ApiService } from './services/api.service';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    FormComponent,
    TreeComponent,
    AdsenseComponent,
    AboutComponent,
    SpeciesSelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    ApiService,
    SpeciesResolver,
  ],
})
export class AppModule { }
