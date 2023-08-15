import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./pages/list/list.module').then((m) => m.ListModule),
  },
  {
    path: 'view/:id',
    loadComponent: () =>
      import('./pages/view/view.component').then((m) => m.ViewComponent),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
