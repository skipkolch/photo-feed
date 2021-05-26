import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Tab1Page} from './tab1.page';
import {LazyLoadImageModule} from "ng-lazyload-image";

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LazyLoadImageModule
  ],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {
}
