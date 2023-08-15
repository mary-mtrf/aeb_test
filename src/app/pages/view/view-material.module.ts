import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  exports: [
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatExpansionModule,
  ],
})
export class ViewMaterialModule {}
