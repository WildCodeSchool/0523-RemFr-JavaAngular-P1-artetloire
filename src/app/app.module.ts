import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HomePageComponent } from './pages/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MarkerService } from "./services/marker.service";

import { MapComponent } from "./pages/map/map.component";
import { ModalMapComponent } from "./components/modal-map/modal-map.component";

import { searchComponent } from "./pages/search/search.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ResultCardComponent } from "./components/result-card/result-card.component";

import { CommonModule } from "@angular/common";
import { ToastrModule } from "ngx-toastr";
import { FavoriteComponent } from "./pages/favorite/favorite.component";
import { CarouselCardComponent } from "./components/carousel-card/carousel-card.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CarouselComponent,
    searchComponent,
    ResultCardComponent,
    MapComponent,
    ModalMapComponent,
    FavoriteComponent,
    CarouselCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ToastrModule.forRoot(),
  ],
  providers: [MarkerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
