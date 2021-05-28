import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {PhotoGridComponent} from "../components/photo-grid/photo-grid.component";

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'lenta',
        loadChildren: () => import('../pages/lenta/lenta.module').then(m => m.LentaPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../pages/search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'likes',
        loadChildren: () => import('../pages/likes/likes.module').then(m => m.LikesPageModule)
      },
      {
        path: 'person',
        loadChildren: () => import('../pages/person/person.module').then(m => m.PersonPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/lenta',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {
}
