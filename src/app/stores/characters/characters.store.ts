import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { CHARACTER_STORE, CharactersStore } from './characters.model';
import {
  Character,
  GetAllCharacterGQL,
  GetCharacterGQL,
} from 'src/app/graphql/graphql-custom-backend.service';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CharacterListStoreService extends ComponentStore<CharactersStore> {
  private getAllCharacterQql = inject(GetAllCharacterGQL);
  private getCharacterQql = inject(GetCharacterGQL);
  private http = inject(HttpClient);

  public characters$ = this.select((state) => state.characters);
  public character$ = this.select((state) => state.character);
  public characterCount$ = this.select((state) => state.characterCount);
  public isLoading$ = this.select((state) => state.isLoading);
  public isLoadingCharacter$ = this.select((state) => state.isLoadingCharacter);
  public page$ = this.select((state) => state.page);
  constructor() {
    super(CHARACTER_STORE);
  }

  readonly getCharacters = this.effect(
    (
      options$: Observable<{
        page: number;
        params?: { [key: string]: string };
      }>
    ) =>
      options$.pipe(
        tap(({ page }) =>
          this.patchState({
            isLoading: true,
            page: page,
          })
        ),
        switchMap(({ page, params }) =>
          this.http.get<{ results: Character[]; info: { count: number } }>(
            `${environment.api}/character/`,
            {
              params: {
                page: ++page,
                ...params,
              },
            }
          )
        ),
        tap((result) =>
          this.patchState({
            isLoading: false,
            characters: (result?.results ?? []) as Character[],
            characterCount: result?.info?.count ?? 0,
          })
        ),
        catchError((error) => throwError(() => error))
      )
  );

  readonly getAllCharacters = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() =>
        this.patchState({
          isLoading: true,
        })
      ),
      switchMap(() =>
        this.http.get<{ results: Character[]; info: { count: number } }>(
          `${environment.api}/character/`
        )
      ),
      tap((result) =>
        this.patchState({
          isLoading: false,
          characters: (result?.results ?? []) as Character[],
          characterCount: result?.info?.count ?? 0,
        })
      ),
      catchError((error) => throwError(() => error))
    )
  );

  readonly getCharacter = this.effect((trigger$: Observable<string>) =>
    trigger$.pipe(
      tap(() =>
        this.patchState({
          isLoadingCharacter: true,
          character: null,
        })
      ),
      switchMap((id) =>
        this.getCharacterQql
          .watch({ id })
          .valueChanges.pipe(map((result) => result.data.character))
      ),
      tap((character) =>
        this.patchState({
          isLoadingCharacter: false,
          character: character as Character,
        })
      )
    )
  );
}
