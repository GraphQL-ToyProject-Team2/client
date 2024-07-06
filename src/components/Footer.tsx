import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FavoriteBorder, ZoomIn } from '@material-ui/icons';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const curLocation = location.pathname.split('/')[1];
  return (
    <FooterWrapper>
      <ItemWrapper onClick={() => navigate('/')}>
        <ZoomIn fontSize="large" color={curLocation === '' ? 'error' : 'inherit'} />
        <IconText $isActive={curLocation === ''}>둘러보기</IconText>
      </ItemWrapper>
      <ItemWrapper onClick={() => navigate('/wishlist')}>
        <FavoriteBorder fontSize="large" color={curLocation === 'wishlist' ? 'error' : 'inherit'} />
        <IconText $isActive={curLocation === 'wishlist'}>위시리스트</IconText>
      </ItemWrapper>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  border-top: 1px solid rgb(235 235 233);
  height: 80px;
  width: 100%;
  max-width: 375px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 16px;
  gap: 20px;
`;

const ItemWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const IconText = styled.p<{ $isActive?: boolean }>`
  font-size: 10px;
  color: ${({ $isActive }) => ($isActive ? '#ff385c' : '#000')};
`;
