import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4%;
  position: absolute;
  width: 100%;
  z-index: 10;
  @media (max-width: 768px) {
    padding: 2%;
  }
`;

export const Logo = styled.img`
      
  width: 200px;      
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05); 
  }

  @media (max-width: 768px) {
    width: 150px
  }
`;

