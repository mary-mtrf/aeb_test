import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterListStoreService } from 'src/app/stores/characters';
import { ViewMaterialModule } from './view-material.module';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  standalone: true,
  imports: [CommonModule, ViewMaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewComponent implements OnInit {
  private store = inject(CharacterListStoreService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public character$ = this.store.character$;
  public isLoadingCharacter$ = this.store.isLoadingCharacter$;
  constructor() {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    console.log(id);
    if (id) {
      this.store.getCharacter(id);
    }
  }

  getStatusStyle(status?: string | null) {
    switch (status) {
      case 'Alive':
        return 'alive';
      case 'Dead':
        return 'dead';
      case 'unknown':
        return 'unknown';
      default:
        'unknown';
    }

    return 'unknown';
  }

  getGender(gender?: string | null): string {
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

  onBackToList(): void {
    this.router.navigate(['./list']);
  }
}
