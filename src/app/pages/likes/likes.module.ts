import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LikesPage} from './likes.page';
import {LazyLoadImageModule} from "ng-lazyload-image";
import {RouterModule, Routes} from "@angular/router";
import {UnionModule} from "../../union.module";

const routes: Routes = [
  {
    path: '',
    component: LikesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnionModule,
    RouterModule.forChild(routes),
    LazyLoadImageModule,
  ],
  declarations: [LikesPage],
})
export class LikesPageModule {
}
