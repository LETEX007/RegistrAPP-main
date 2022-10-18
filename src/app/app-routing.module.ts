import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pags/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pags/segment/segment.module').then( m => m.SegmentPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./pags/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
