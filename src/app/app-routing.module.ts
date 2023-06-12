import { Component, NgModule } from '@angular/core';

import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';

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
    preloadingStrategy: CustomPreloadService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
