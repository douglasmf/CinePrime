import styled, { css } from 'styled-components';
import {theme} from '../../themes/theme';

export const CardContainer = styled.div<{ highlight?: boolean }>`
  background: ${theme.colors.cardBg};
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid #333;
  cursor: pointer;

  /* Efeito de brilho azul presente na imagem enviada */
  ${props => props.highlight && css`
    border-color: #50b5ff;
    box-shadow: 0 0 15px rgba(80, 181, 255, 0.4);
  `}

  &:hover {
    transform: translateY(-8px);
    border-color: ${theme.colors.primary};
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 2 / 3;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const RatingBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  color: ${theme.colors.primary};
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 800;
  border: 1px solid ${theme.colors.primary};
`;

export const FavButton = styled.button<{ isFav: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.isFav ? theme.colors.primary : '#fff'};
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.2);
    background: rgba(0, 0, 0, 0.8);
  }
`;

export const Info = styled.div`
  padding: 12px;
  background: linear-gradient(to top, #1a1a1a, #252525);

  h3 {
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
  }

  span {
    font-size: 0.75rem;
    color: ${theme.colors.textSecondary};
    font-weight: 500;
  }
`;