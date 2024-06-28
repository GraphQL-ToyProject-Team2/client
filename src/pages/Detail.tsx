import { gql, useQuery } from '@apollo/client';
import { ChevronLeft, Favorite, FavoriteBorder, ShareOutlined } from '@material-ui/icons';
import styled from 'styled-components';

const GET_DETAIL = gql`
  query GetAccommodation($id: ID!) {
    accommodation(id: $id) {
      title
      description
      price
      host {
        id
        name
        avatar
        bio
      }
      location
      images
      isLiked
    }
  }
`;

const Detail = () => {
  const { loading, error, data } = useQuery(GET_DETAIL, { variables: { id: 1 } });
  console.log(data);
  const accommodation = data?.accommodation;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <Header>
        <StyledChevronLeft fontSize="large" />
        <Interaction>
          <ShareOutlined />
          {accommodation.isLiked ? <Favorite fontSize="large" /> : <FavoriteBorder />}
        </Interaction>
      </Header>
    </>
  );
};

export default Detail;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 16px;
  z-index: 1;
  border-bottom: 1px solid rgb(235 235 233);
  width: 100%;
`;

const StyledChevronLeft = styled(ChevronLeft)`
  font-size: 16px;
`;

const Interaction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;
