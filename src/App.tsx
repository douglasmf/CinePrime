import styled from 'styled-components';
import { theme } from './themes/theme';

// Components
import { Header } from './template/Header';
import { Hero } from './components/Hero';
import { MainContainer } from './template/MainContainer';



const AppContainer = styled.div`
  background-color: ${theme.colors.background};
  min-height: 100vh;
  color: ${theme.colors.text};
`;

function App() {

  return (
    <AppContainer>
      <Header />
      <Hero /> 
      <MainContainer />
    </AppContainer>
  );
}

export default App;