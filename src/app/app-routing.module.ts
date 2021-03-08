import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'portada',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'portada',
    loadChildren: () => import('./pages/portada/portada-routing.module').then( m => m.PortadaPageRoutingModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home-routing.module').then( m => m.HomePageRoutingModule)
  },
  {
    path: 'contenido',
    loadChildren: () => import('./pages/contenido/contenido.module').then( m => m.ContenidoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
