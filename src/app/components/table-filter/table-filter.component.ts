import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule,
    NgClass,
  ],
})
export class TableFilterComponent implements OnInit {
  @Input() key!: string;
  @ViewChild(MatMenuTrigger) menu!: MatMenuTrigger;

  @Output() onChangeFilter = new EventEmitter<{
    key: string;
    search: string;
  }>();

  control = new FormControl('');
  constructor() {}

  ngOnInit() {}

  onFilter(event: Event): void {
    event.stopPropagation();
  }

  onChangeSearch(): void {
    console.log(this.control.value);
  }

  onToggleMenu(): void {
    this.menu.closeMenu();
  }

  onAcceptFilter(): void {
    this.onChangeFilter.emit({
      key: this.key,
      search: this.control.value ?? '',
    });
  }
}
