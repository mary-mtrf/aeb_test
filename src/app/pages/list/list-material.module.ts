import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  exports: [
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatSortModule,
  ],
})
export class ListMaterialModule {}
