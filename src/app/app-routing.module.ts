import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import { StarWarsComponent } from './star-wars/star-wars.component';
import { StudioGibliComponent } from './studio-gibli/studio-gibli.component';
import { PrincipalComponent } from './principal/principal.component';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';
import { DetallesComponent } from './detalles/detalles.component';

const routes: Routes = [
  { path:'home', component: PrincipalComponent },
  { path:'pokemon', component: PokemonComponent },
  { path:'starWars', component: StarWarsComponent },
  { path:'studiosGibli', component: StudioGibliComponent },
  { path:'pokemon/details/:id', component: DetallesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path:'**', component: PageNoFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
