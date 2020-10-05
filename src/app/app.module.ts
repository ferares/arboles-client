import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './partials/about/about.component';
import { AdsenseComponent } from './partials/adsense/adsense.component';
import { FormComponent } from './partials/form/form.component';
import { MapComponent } from './partials/map/map.component';
import { TreeComponent } from './partials/tree/tree.component';
import { HomeComponent } from './views/home/home.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
})
export class AppModule { }
