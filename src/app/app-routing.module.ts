import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoPageComponent } from './pages/demo/demo.component';

const routes: Routes = [
  { path: '', component: DemoPageComponent },
  // { path: 'recherche', component: RechercheComponent},
  // { path: 'recherche', component: RechercheComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
