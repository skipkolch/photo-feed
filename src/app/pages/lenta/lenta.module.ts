import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LentaPage} from './lenta.page';
import {RouterModule, Routes} from "@angular/router";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {CardInfoComponent} from "../../components/card-info/card-info.component";

const routes: Routes = [
  {
    path: '',
    component: LentaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LazyLoadImageModule,
    [RouterModule.forChild(routes)]
  ],
  declarations: [LentaPage, CardInfoComponent]
})
export class LentaPageModule {
}
