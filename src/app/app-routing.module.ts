import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FavoriteComponent } from "./favorite/favorite.component";
import { searchComponent } from "./pages/search/search.component";

const routes: Routes = [
  { path: "favoris", component: FavoriteComponent },
  { path: "recherche", component: searchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
