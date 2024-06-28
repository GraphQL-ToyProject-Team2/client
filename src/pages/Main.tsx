import { gql, useQuery } from "@apollo/client";
import {
  ChevronLeft,

} from '@material-ui/icons';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const GET_ACCOMMODATIONS = gql`
 query GetAccommodations {
    accommodations {
      id
      title
      description
      price
      host {
        id
        name
      }
      images
    }
  }
`

interface MainAccommodation {
    id: string;
    title: string;
    description: string;
      price: number;
      host: {
      id: string;
      name: string;
    }; 
    images: string[];
}

interface Accommodations {
  accommodations: MainAccommodation[];
}


const Main = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<Accommodations>(GET_ACCOMMODATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const accommodations = data?.accommodations;
  
  return (
    <StWrapper>
    <Header>
      <StyledChevronLeft fontSize="large" />
    </Header>
    <StRoomListContainer>
      {accommodations?.map((accommodation) => {
        const {id, title, description, price, host, images} = accommodation;

        return(
          <StRoomCard key={id} onClick={() => navigate(`/detail/${id}`)}>
            <StThumbnail src={images[0]}/>
            <h1>{title}</h1>
            <h2>{description}</h2>
            <p>{price} / 원</p>
            <p>{host.name}</p>
          </StRoomCard>
          )
        }
        )
      }
      </StRoomListContainer>
    </StWrapper>
  );
};

export default Main;

const StWrapper = styled.main`
width: 100%;

`

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

const StRoomListContainer = styled.section`
display: flex;
flex-direction: column;
gap: 40px;

margin-top: 24px;
padding: 0 24px 0 24px;

`

const StRoomCard = styled.article`
cursor: pointer;
`

const StThumbnail = styled.img`
width: 100%;
height: 327px;
object-fit: cover;
border-radius: 12px;

`