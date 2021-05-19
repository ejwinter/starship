import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StarshipsComponent} from './starships/starships.component';

const routes: Routes = [
  { path: '',   redirectTo: '/starships', pathMatch: 'full' },
  {path: 'starships', component: StarshipsComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
