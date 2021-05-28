import {NgModule} from '@angular/core';
import {PhotoGridComponent} from "../components/photo-grid/photo-grid.component";
import {IonicModule} from "@ionic/angular";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [PhotoGridComponent],
  imports: [
    IonicModule,
    LazyLoadImageModule,
    CommonModule
  ],
  exports: [PhotoGridComponent]
})
export class UnionModule {
}
