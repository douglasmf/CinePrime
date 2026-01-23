import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export const genres = {
  acao: 28,
  comedia: 35,
  romance: 10749,
  terror: 27,
  ficcao: 878,
};

const selectAllMovies = (state: RootState) => state.movies.movies;


// Este seletor filtra a lista atual por nome enquanto o usuário digita
// Evita requisições desnecessárias para buscas pequenas/locais
export const selectFilteredMovies = createSelector(
  [selectAllMovies],
  (movies) => movies // Retorna a lista da API como ela veio
);

export const selectFavorites = createSelector(
  [(state: RootState) => state.movies.favorites],
  (favorites) => [...favorites].sort((a, b) => a.title.localeCompare(b.title))
);
export const selectIsLoading = (state: RootState) => state.movies.loading;
export const selectActiveCategory = (state: RootState) => state.movies.activeCategory;

// Verifica se um filme específico está nos favoritos
export const isMovieFavorite = (movieId: number) => 
  createSelector([selectFavorites], (favorites) => 
    favorites.some(m => m.id === movieId)
  );