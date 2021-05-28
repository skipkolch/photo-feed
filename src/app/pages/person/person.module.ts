import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PersonPage} from './person.page';
import {RouterModule, Routes} from "@angular/router";
import {UnionModule} from "../../union/union.module";

const routes: Routes = [
  {
    path: '',
    component: PersonPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnionModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PersonPage],
})
export class PersonPageModule {
}
