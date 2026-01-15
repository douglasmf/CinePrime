import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../../types/movie';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE;

interface MovieState {
  movies: Movie[];
  heroMovie: Movie | null;
  favorites: Movie[];
  searchTerm: string;
  activeCategory: string;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  heroMovie: null,
  favorites: JSON.parse(localStorage.getItem('fav_movies') || '[]'),
  searchTerm: '',
  activeCategory: 'ACAO',
  loading: false,
  error: null,
};

// Thunk flexível para qualquer chamada de lista de filmes
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (endpoint: string) => {
    // Verificamos se o endpoint já tem parâmetros (?) para usar & ou ? antes da API_KEY
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=pt-BR`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro ao carregar dados da API');
    
    const data = await response.json();
    return data.results as Movie[];
  }
);

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const index = state.favorites.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
      localStorage.setItem('fav_movies', JSON.stringify(state.favorites));
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
    setHeroMovie: (state, action: PayloadAction<Movie>) => {
      state.heroMovie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        
        // Se ainda não tivermos um filme para o Hero, sorteamos um da primeira carga (Geral)
        if (!state.heroMovie && action.payload.length > 0) {
          const randomIndex = Math.floor(Math.random() * action.payload.length);
          state.heroMovie = action.payload[randomIndex];
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Falha ao carregar filmes';
      });
  },
});

export const { toggleFavorite, setSearchTerm, setHeroMovie, setActiveCategory } = movieSlice.actions;
export default movieSlice.reducer;