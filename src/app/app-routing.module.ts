import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FavoriteComponent } from "./pages/favorite/favorite.component";
import { HomePageComponent } from "./pages/home/home.component";
import { searchComponent } from "./pages/search/search.component";
import { MapComponent } from "./pages/map/map.component";
import { SupportComponent } from "./pages/faq/support.component";

const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent,
  },
  {
    path: "search",
    component: searchComponent,
  },
  {
    path: "map",
    component: MapComponent,
  },
  {
    path: "",
    redirectTo: "search",
    pathMatch: "full",
  },
  {
    path: "favorite",
    component: FavoriteComponent,
  },
  {
    path: "support",
    component: SupportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
