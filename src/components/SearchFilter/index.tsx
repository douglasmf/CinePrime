import { IoSearch } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMovies, setActiveCategory, setSearchTerm } from '../../store/slices/movieSlice';
import * as S from './styles';

export const SearchFilter = () => {
  const dispatch = useAppDispatch();
  const active = useAppSelector(state => state.movies.activeCategory);
  const searchTerm = useAppSelector(state => state.movies.searchTerm);

  const categories = [
    { label: 'Ação', id: 'ACAO', genreId: 28 },
    { label: 'Comédia', id: 'COMEDIA', genreId: 35 },
    { label: 'Romance', id: 'ROMANCE', genreId: 10749 },
    { label: 'Ficção Científica', id: 'FICCAO', genreId: 878 },
    { label: 'Terror', id: 'TERROR', genreId: 27 },
    { label: 'Favoritos', id: 'FAVORITES', genreId: null },
  ];

  const handleCategoryClick = (cat: typeof categories[0]) => {
    dispatch(setSearchTerm(''));
    dispatch(setActiveCategory(cat.id));
    
    if (cat.id === 'FAVORITES') return;

    dispatch(fetchMovies(`/discover/movie?with_genres=${cat.genreId}`));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchTerm(value));

    if (value.length > 0) {
      // 2. Muda o estado da categoria mas SEM limpar o termo
      if (active !== 'SEARCH_MODE') {
        dispatch(setActiveCategory('SEARCH_MODE'));
      }
      
      // 3. Busca na API
      dispatch(fetchMovies(`/search/movie?query=${value}`));
    } else {
      // 3. Se apagar a busca, volta para o padrão "Action"
      dispatch(setActiveCategory('ACAO'));
      dispatch(fetchMovies(`/discover/movie?with_genres=28`));
    }
  };

  return (
    <S.Wrapper>
      <S.CategoryList>
        <S.ButtonList>
          {categories.map(cat => (
            <S.Pill 
              key={cat.id} 
              // Se 'active' for 'SEARCH_MODE', nenhum botão ficará destacado
              active={active === cat.id} 
              onClick={() => handleCategoryClick(cat)}
            >
              {cat.label}
            </S.Pill>
          ))}
        </S.ButtonList>
      </S.CategoryList>

      <S.SearchBox>
        <input 
          type="text"
          placeholder="Procurar Filmes..." 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <IoSearch />
      </S.SearchBox>
    </S.Wrapper>
  );
};