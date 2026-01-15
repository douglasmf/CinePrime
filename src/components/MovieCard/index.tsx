import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleFavorite } from '../../store/slices/movieSlice';
import { isMovieFavorite } from '../../store/selectors/movieSelector';
import type { Movie } from '../../types/movie';
import * as S from './styles';

interface Props {
  movie: Movie;
  highlight?: boolean; // Para o efeito de brilho azul da imagem
}

export const MovieCard = ({ movie, highlight }: Props) => {
  const dispatch = useAppDispatch();
  const isFav = useAppSelector((state) => isMovieFavorite(movie.id)(state));
  const imgBase = import.meta.env.VITE_IMG;

  return (
    <S.CardContainer highlight={highlight}>
      <S.ImageWrapper>
        <img 
          src={movie.poster_path ? `${imgBase}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'} 
          alt={movie.title} 
        />
        
        {/* Badge de Nota */}
        <S.RatingBadge>
          {movie.vote_average.toFixed(1)}
        </S.RatingBadge>

        {/* Botão de Favorito sobre a imagem */}
        <S.FavButton 
          onClick={() => dispatch(toggleFavorite(movie))}
          isFav={isFav}
        >
          {isFav ? <IoHeart /> : <IoHeartOutline />}
        </S.FavButton>
      </S.ImageWrapper>

      <S.Info>
        <h3>{movie.title}</h3>
        <span>{new Date(movie.release_date).getFullYear()}</span>
      </S.Info>
    </S.CardContainer>
  );
};