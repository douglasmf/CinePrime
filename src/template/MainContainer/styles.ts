import styled from 'styled-components';
import { theme } from '../../themes/theme';

export const Grid = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  padding: 0 4% 4rem;
  min-height: 200px;
`;

export const LocalSearchContainer = styled.div`
  padding: 0 4% 2rem;
  display: flex;
  justify-content: flex-start;

  input {
    width: 100%;
    max-width: 400px;
    background: #1a1a1a;
    border: 1px solid #333;
    padding: 0.8rem 1.2rem;
    border-radius: 8px;
    color: white;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 8px rgba(226, 182, 22, 0.2);
    }
  }
`;

export const EmptyMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 5rem 2rem;
  
  h2 {
    color: ${theme.colors.primary};
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${theme.colors.textSecondary};
  }
`;