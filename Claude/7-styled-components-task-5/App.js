import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import SecondaryButton from './Button';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
`;

const Header = styled.header`
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
`;

const MainContent = styled.main`
  padding: 40px 20px;
  text-align: center;

  h1 {
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    font-size: 16px;
  }

  .button-demo {
    margin-top: 30px;

    h2 {
      font-size: 18px;
      margin-bottom: 15px;
    }

    .demo-section {
      margin-bottom: 20px;

      p {
        font-size: 14px;
        margin-bottom: 10px;
        color: #999;
      }
    }
  }
`;

function App() {
  return (
    <AppContainer>
      <Header>
        <h1>Styled Components - Secondary Button Task</h1>
      </Header>

      <MainContent>
        <h1>Button Styling with styled-components</h1>
        <p>Demonstrating secondary button with context-aware styling</p>

        <div className="button-demo">
          <h2>Button States:</h2>
          
          <div className="demo-section">
            <p>Default Button (without Footer context):</p>
            <SecondaryButton>My Friends</SecondaryButton>
          </div>

          <div className="demo-section">
            <p>Button in Footer (with transparent background and #0095ee text color):</p>
          </div>
        </div>
      </MainContent>

      <Footer />
    </AppContainer>
  );
}

export default App;
