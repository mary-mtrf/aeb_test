import { Character } from 'src/app/graphql/graphql-custom-backend.service';

export interface CharactersStore {
  characters: Character[];
  character: Character | null;
  characterCount: number;
  isLoading: boolean;
  isLoadingCharacter: boolean;
  page: number;
}

export const CHARACTER_STORE: CharactersStore = {
  characters: [],
  character: null,
  isLoading: false,
  characterCount: 0,
  isLoadingCharacter: false,
  page: 0,
};
