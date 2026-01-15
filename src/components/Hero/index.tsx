import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { isMovieFavorite } from '../../store/selectors/movieSelector';
import { toggleFavorite } from '../../store/slices/movieSlice';
import * as S from './styles';

export const Hero = () => {
  const dispatch = useAppDispatch();
  
  // CORREÇÃO: Pegamos diretamente o filme já sorteado pelo Redux
  const movie = useAppSelector((state) => state.movies.heroMovie);

  // CORREÇÃO: O seletor de favoritos agora olha diretamente para o 'movie' da store
  const isFav = useAppSelector((state) => 
    movie ? isMovieFavorite(movie.id)(state) : false
  );

  // Se o Redux ainda não sorteou o filme (carregando), mostra o container vazio ou esqueleto
  if (!movie) {
    return <S.HeroContainer style={{ background: '#121212' }} />;
  }

  const imgBase = import.meta.env.VITE_IMG.replace('w500', 'original');
  const releaseYear = new Date(movie.release_date).getFullYear();

  // Exemplo de mapeamento simples dentro do Hero.tsx
const genreMap: { [key: number]: string } = {
  28: 'Ação', 12: 'Aventura', 16: 'Animação', 35: 'Comédia', 80: 'Crime', 99: 'Documentário', 
  18: 'Drama', 10751: 'Família', 14: 'Fantasia', 36: 'História', 27: 'Terror', 
  10402: 'Música', 9648: 'Mistério', 10749: 'Romance', 878: 'Ficção Científica', 
  10770: 'Cinema TV', 53: 'Suspense', 10752: 'Guerra', 37: 'Faroeste'
};

// Pega o primeiro gênero do filme
const mainGenre = movie.genre_ids ? genreMap[movie.genre_ids[0]] : 'Filme';

  return (
    <S.HeroContainer backdrop={`${imgBase}${movie.backdrop_path}`}>
      <S.Content>
        <h1>{movie.title}</h1>
        <p>{mainGenre} / {releaseYear} / Nota: {movie.vote_average.toFixed(1)}</p>
        <S.Description>
          {movie.overview || "Nenhuma descrição disponível para este título."}
        </S.Description>
        <S.Actions>
          <S.Button primary onClick={() => dispatch(toggleFavorite(movie))}>
            {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
          </S.Button>
        </S.Actions>
      </S.Content>
    </S.HeroContainer>
  );
};