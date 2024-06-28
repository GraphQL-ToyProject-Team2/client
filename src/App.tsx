import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Detail from './pages/Detail';
import styled from 'styled-components';
import GlobalStyle from './styles/globalStyles';
import WishList from './pages/WishList';

const MobileContainer = styled.div`
  font-family: 'Pretendard Variable';
  display: flex;

  position: relative;
  flex-direction: column;
  align-items: center;

  margin: 0 auto;
  background-color: #fff;

  max-width: 375px;
  min-height: 100vh;
`;

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Main /> },
    { path: '/detail/:id', element: <Detail /> },
    { path: '/wishlist', element: <WishList /> },
  ]);
  return (
    <MobileContainer>
      <GlobalStyle />
      <RouterProvider router={router} />
    </MobileContainer>
  );
}

export default App;
