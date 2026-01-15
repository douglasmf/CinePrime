import styled from 'styled-components';
import { theme } from '../../themes/theme';

export const HeroContainer = styled.section<{ backdrop?: string }>`
  height: 70vh;
  /* Gradiente para garantir leitura do texto e imagem de fundo dinâmica */
  background: linear-gradient(to right, #121212 20%, transparent 100%), 
              url(${props => props.backdrop});
  background-size: cover;
  background-position: center top;
  display: flex;
  align-items: center;
  padding: 0 4%;
  transition: background 0.5s ease-in-out; /* Transição suave ao mudar */

  @media (max-width: 768px) {
    height: 50vh;
    background: linear-gradient(to top, #121212 30%, transparent 100%), 
                url(${props => props.backdrop});
    background-size: cover;
  }
`;

export const Content = styled.div`
  max-width: 700px;
  z-index: 2;

  h1 { 
    font-size: clamp(2rem, 5vw, 3.5rem); 
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    color: #fff;
  }
  
  p { 
    color: ${theme.colors.primary}; 
    margin-bottom: 1.5rem;
    font-weight: 700;
  }
`;

export const Description = styled.p`
  line-height: 1.6;
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 2rem !important;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limita a 3 linhas para não quebrar o layout */
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #fff !important;
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Button = styled.button<{ primary?: boolean }>`
  padding: 0.8rem 2rem;
  border-radius: 50px;
  border: ${props => props.primary ? 'none' : '1px solid #fff'};
  background: ${props => props.primary ? theme.colors.primary : 'rgba(255,255,255,0.1)'};
  color: ${props => props.primary ? '#000' : '#fff'};
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover { 
    transform: scale(1.05);
    background: ${props => props.primary ? theme.colors.primaryHover : 'rgba(255,255,255,0.2)'};
  }
`;