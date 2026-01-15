import styled from 'styled-components';
import { theme } from '../../themes/theme';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 2rem 4%;
  flex-wrap: wrap;
  gap: 1.5rem;
  background-color: ${theme.colors.background};
`;

export const CategoryList = styled.div`
  p { 
    font-size: 0.75rem; 
    margin-bottom: 0.8rem; 
    color: ${theme.colors.textSecondary}; 
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
  }
`;

export const ButtonList = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

export const Pill = styled.button<{ active?: boolean }>`
  padding: 0.6rem 1.4rem;
  border-radius: 50px;
  border: 1px solid ${props => props.active ? theme.colors.accent : '#333'};
  background: ${props => props.active ? theme.colors.accent : 'transparent'};
  color: ${props => props.active ? '#fff' : theme.colors.primary};
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    background: rgba(226, 182, 22, 0.1);
  }
`;

export const SearchBox = styled.div`
  position: relative;
  
  input {
    background: #1a1a1a;
    border: 1px solid #333;
    padding: 0.7rem 1rem 0.7rem 2.8rem;
    border-radius: 50px;
    color: #fff;
    width: 280px;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      width: 320px;
      box-shadow: 0 0 10px rgba(226, 182, 22, 0.2);
    }
  }

  svg {
    position: absolute;
    left: 1.1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    input { width: 100%; &:focus { width: 100%; } }
  }
`;