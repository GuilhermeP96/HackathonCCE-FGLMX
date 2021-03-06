import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicia-viagem',
    pathMatch: 'full'
  },
  {
    path: 'inicia-viagem',
    loadChildren: () => import('./inicia-viagem/inicia-viagem.module').then( m => m.IniciaViagemPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
