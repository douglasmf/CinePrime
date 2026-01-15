import { MovieCard } from '../../components/MovieCard'
import { SearchFilter } from '../../components/SearchFilter'
import * as S from './styles'
import { useEffect, useState } from 'react'

// Redux & Logic
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMovies } from '../../store/slices/movieSlice';
import { selectFilteredMovies, selectFavorites } from '../../store/selectors/movieSelector';

export const MainContainer = () => {

  const dispatch = useAppDispatch();
    const [favSearch, setFavSearch] = useState('');  // Busca local
    
    // Seletores do Redux
    const activeCategory = useAppSelector(state => state.movies.activeCategory);
    const searchTermGlobal = useAppSelector(state => state.movies.searchTerm);
    const loading = useAppSelector(state => state.movies.loading);
    
    const favorites = useAppSelector(selectFavorites);
    const apiMovies = useAppSelector(selectFilteredMovies);
  
    const isFavoritesTab = activeCategory === 'FAVORITES';
  
    // Lógica de filtragem dos favoritos baseada no input local
    const filteredFavorites = favorites.filter(movie =>
      movie.title.toLowerCase().includes(favSearch.toLowerCase())
    );
  
    useEffect(() => {
      // Carregamento inicial: Populares para o Hero e Action para o Grid
      dispatch(fetchMovies('/movie/popular')).then(() => {
        dispatch(fetchMovies('/discover/movie?with_genres=28'));
      });
    }, [dispatch]);
  
    useEffect(() => {
      // Se a categoria mudar e não for FAVORITES, é limpado o input local
      if (activeCategory !== 'FAVORITES') {
        setFavSearch('');
      }
    }, [activeCategory]);
  return (
    <main>
      <SearchFilter />
      {/* 1. Busca local para favoritos: Só aparece se estiver na aba e tiver itens */}
            {isFavoritesTab && favorites.length > 0 && (
              <S.LocalSearchContainer>
                <input 
                  type="text"
                  placeholder="Procurar entre os Favoritos..." 
                  value={favSearch}
                  onChange={(e) => setFavSearch(e.target.value)}
                />
              </S.LocalSearchContainer>
            )}
      
            <S.Grid>
              {isFavoritesTab ? (
                favorites.length === 0 ? (
                  <S.EmptyMessage>
                    <h2>Sua lista está vazia</h2>
                    <p>Adicione filmes clicando no ícone de coração.</p>
                  </S.EmptyMessage>
                ) : filteredFavorites.length > 0 ? (
                  filteredFavorites.map(movie => <MovieCard key={movie.id} movie={movie} />)
                ) : (
                  <S.EmptyMessage>
                    <h2>Nenhum favorito encontrado</h2>
                    <p>Não encontramos "{favSearch}" na sua lista pessoal.</p>
                  </S.EmptyMessage>
                )
              ) : (
                /* --- CONTEXTO GLOBAL (API/CATEGORIAS) --- */
                apiMovies.length > 0 ? (
                  apiMovies.map((movie, index) => (
                    <MovieCard 
                      key={movie.id} 
                      movie={movie} 
                      highlight={!searchTermGlobal && index === 0} 
                    />
                  ))
                ) : (
                  !loading && (
                    <S.EmptyMessage>
                      <h2>Nenhum filme encontrado</h2>
                      <p>Tente buscar por outro termo ou categoria.</p>
                    </S.EmptyMessage>
                  )
                )
              )}
            </S.Grid>
            
            {loading && <p style={{ textAlign: 'center', padding: '2rem' }}>Carregando...</p>}

    </main>
  )
}
