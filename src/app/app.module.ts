import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './services/marker.service';

import { DemoPageComponent } from './pages/demo/demo.component';
import { DemoComponent } from './components/demo/demo.component';
import { DemoPipe } from './pipes/demo.pipe';
import { DemoDirective } from './directives/demo.directive';
import { MapComponent } from './pages/map/map.component';
import { ModalMapComponent } from './components/modal-map/modal-map.component';


@NgModule({
  declarations: [
    AppComponent,
    DemoPageComponent,
    DemoComponent,
    DemoPipe,
    DemoDirective,
    MapComponent,
    ModalMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    MarkerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
