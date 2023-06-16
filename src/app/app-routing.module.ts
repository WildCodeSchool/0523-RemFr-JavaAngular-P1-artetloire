import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FavoriteComponent } from "./pages/favorite/favorite.component";
import { searchComponent } from "./pages/search/search.component";
import { MapComponent } from "./pages/map/map.component";

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
