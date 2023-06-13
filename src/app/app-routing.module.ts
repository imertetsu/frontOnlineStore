import { Component, NgModule } from '@angular/core';
import { AdminGuard } from './guards/admin.guard';

import { CustomPreloadService } from './services/custom-preload.service';
import { QuicklinkStrategy } from 'ngx-quicklink';

import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  /*{
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },*/
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule)
  },
  {
    path: 'cms',
    canActivate: [ AdminGuard ],
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule),
    //con esto activamos el preload customizado
    data: {
      preload: true
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //con esto hace la pre carga de todos lo modulos existentes en nuestra app
    //preloadingStrategy: PreloadAllModules
    //es nuestro servicio customizado
    //preloadingStrategy: CustomPreloadService
    preloadingStrategy: QuicklinkStrategy //ya esta la estrategia, pero debes importar en cada modulo ejm en el webstie Module
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
