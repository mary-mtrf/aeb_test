import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list.component';
import { NgModule } from '@angular/core';

const ListRoutes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ListRoutes)],
  exports: [RouterModule],
})
export class ListRoutingModule {}
