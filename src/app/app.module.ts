import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

<<<<<<< HEAD
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
=======
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
>>>>>>> develop

import { DemoPageComponent } from "./pages/demo/demo.component";
import { DemoComponent } from "./components/demo/demo.component";
import { DemoPipe } from "./pipes/demo.pipe";
import { DemoDirective } from "./directives/demo.directive";
import { searchComponent } from "./pages/search/search.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ResultCardComponent } from "./components/result-card/result-card.component";

@NgModule({
  declarations: [
    AppComponent,
    DemoPageComponent,
    DemoComponent,
    DemoPipe,
    DemoDirective,
<<<<<<< HEAD
    searchComponent,
    ResultCardComponent,
=======
    MapComponent,
    ModalMapComponent
>>>>>>> develop
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
<<<<<<< HEAD
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
=======
    HttpClientModule
  ],
  providers: [
    MarkerService
  ],
  bootstrap: [AppComponent]
>>>>>>> develop
})
export class AppModule {}
