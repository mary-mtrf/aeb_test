import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Character } from 'src/app/graphql/graphql-custom-backend.service';
import { CharacterListStoreService } from 'src/app/stores/characters';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  private store = inject(CharacterListStoreService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Character>([]);
  characterCount$ = this.store.characterCount$;
  isLoading$ = this.store.isLoading$;
  page$ = this.store.page$.pipe(tap((page) => (this.page = page)));
  page!: number;
  showFirstLastButtons = true;
  displayedColumns: (keyof Character)[] = [
    'created',
    'image',
    'name',
    'gender',
  ];

  dataSource$ = this.store.characters$;
  constructor(private router: Router) {}
  ngOnInit() {
    this.store.getCharacters({
      page: 0,
    });
  }

  filterParams = new Map<string, string>();

  onSelectCharacter(character: Character) {
    this.router.navigate(['../view', character?.id?.toString()]);
  }

  getGender(gender: string): string {
    switch (gender) {
      case 'Male':
        return 'male';
      case 'Female':
        return 'female';
      case 'unknown':
        return 'unknown';
      case 'Genderless':
        return 'genderless';
      default:
        'unknown';
    }

    return 'unknown';
  }

  handlePageEvent(e: PageEvent) {
    this.store.getCharacters({ page: e.pageIndex });
  }

  onSortChange(sortState: Sort) {
    alert('api не выдает всех персонажей, и не имеет запроса на сортировку');
  }

  onChangeFilter({ key, search }: { key: string; search: string }) {
    this.filterParams.set(key, search);

    const params = [...this.filterParams].reduce<{ [key: string]: string }>(
      (acc, map) => {
        if (!map[1]) {
          return acc;
        }
        return {
          ...acc,
          [map[0]]: map[1],
        };
      },
      {}
    );

    this.store.getCharacters({
      page: this.page,
      params,
    });
  }
}
