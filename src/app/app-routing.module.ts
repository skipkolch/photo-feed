import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {IntroGuard} from './guards/intro.guard';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/']);

const redirectLoggedInToChat = () => redirectLoggedInTo(['/tabs']);

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sing-in.module').then(m => m.SingInPageModule),
    canLoad: [IntroGuard],
    ...canActivate(redirectLoggedInToChat)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sing-up.module').then(m => m.SingUpPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
