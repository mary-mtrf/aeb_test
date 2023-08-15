import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListRoutingModule } from './list-routing.module';
import { ListMaterialModule } from './list-material.module';
import { TableFilterComponent } from 'src/app/components/table-filter';

@NgModule({
  imports: [
    CommonModule,
    ListRoutingModule,
    ListMaterialModule,
    TableFilterComponent,
  ],
  declarations: [ListComponent],
})
export class ListModule {}
