import { gql, useMutation, useQuery } from '@apollo/client';
import Diamond from '../assets/diamond.png';
import {
  Apartment,
  ChevronLeft,
  EmojiEvents,
  Favorite,
  FavoriteBorder,
  Grade,
  ShareOutlined,
  Subway,
  DateRange,
  MeetingRoom,
  Tv,
} from '@material-ui/icons';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

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

const LIKE_ACCOMMODATION = gql`
  mutation LikeAccommodation($id: ID!) {
    likeAccommodation(id: $id) {
      isLiked
    }
  }
`;

interface Accommodation {
  accommodation: {
    title: string;
    description: string;
    price: number;
    host: {
      id: string;
      name: string;
      avatar: string;
      bio: string;
    };
    location: string;
    images: string[];
    isLiked: boolean;
  };
}

interface LikeAccommodation {
  likeAccommodation: {
    id: string;
    isLiked: boolean;
    __typename: string;
  };
}

const Detail = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery<Accommodation>(GET_DETAIL, { variables: { id: id }, skip: !id });
  const accommodation = data?.accommodation;

  const [likeAccommodation] = useMutation<LikeAccommodation>(LIKE_ACCOMMODATION, {
    optimisticResponse: {
      likeAccommodation: {
        id: id!,
        __typename: 'Accommodation',
        isLiked: !data?.accommodation?.isLiked,
      },
    },
    update(cache, { data }) {
      if (!data) return;
      const currentAccommodation = cache.readQuery<{ accommodation: Accommodation }>({
        query: GET_DETAIL,
        variables: { id: id! },
      });

      if (currentAccommodation?.accommodation) {
        cache.writeQuery({
          query: GET_DETAIL,
          variables: { id: id! },
          data: {
            accommodation: {
              ...currentAccommodation.accommodation,
              isLiked: data.likeAccommodation.isLiked,
            },
          },
        });
      }
    },
    refetchQueries: [{ query: GET_DETAIL, variables: { id: id! } }],
  });

  const handleLike = () => {
    likeAccommodation({ variables: { id: id } });
  };

  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {accommodation && (
        <>
          <Header>
            <button onClick={() => navigate(-1)}>
              <StyledChevronLeft fontSize="large" />
            </button>
            <Interaction>
              <ShareOutlined />
              {accommodation.isLiked ? (
                <Favorite fontSize="large" color="error" onClick={handleLike} />
              ) : (
                <FavoriteBorder fontSize="large" onClick={handleLike} />
              )}
            </Interaction>
          </Header>
          <MainImage src={accommodation.images[0]} />
          <Contents>
            <Title>{accommodation.title}</Title>
            <Location>{accommodation.location}의 집 전체</Location>
            <LocationDetail>최대 인원 2명 · 침실 1개 · 욕실 1개</LocationDetail>
            <Star>
              <Grade />
              <Score>4.83</Score>
              <UnderlinedText>후기 133개</UnderlinedText>
            </Star>
            <Properties>
              <Property>
                <Apartment fontSize="large" />
                상징적 도시
              </Property>
              <Property>
                <EmojiEvents fontSize="large" />
                슈퍼 호스트
              </Property>
              <Property>
                <Subway fontSize="large" />
                지하철역 근처
              </Property>
              <Property>
                <DateRange fontSize="large" />
                한정 시간 무료 취소
              </Property>
              <Property>
                <MeetingRoom fontSize="large" />
                셀프 체크인
              </Property>
              <Property>
                <Tv fontSize="large" />
                TV
              </Property>
            </Properties>
            <DetailCard>
              <StyledImg src={Diamond} />
              <DetailCardContent>
                <Text>흔치 않은 기회</Text>
                <SubText>{accommodation.host.name} 님의 숙소는 보통 예약이 가득 차 있습니다.</SubText>
              </DetailCardContent>
            </DetailCard>
            <DetailCard>
              <StyledImg src={accommodation.host.avatar} />
              <DetailCardContent>
                <Text>호스트: {accommodation.host.name} 님</Text>
                <SubText>{accommodation.host.bio}</SubText>
              </DetailCardContent>
            </DetailCard>
            <Description>{accommodation.description}</Description>
          </Contents>
          <BottomSheet>
            <ReservationInfo>
              <Price>₩{accommodation.price.toLocaleString()}/박</Price>
              <UnderlinedText>11월 27일 ~ 12월 2일</UnderlinedText>
            </ReservationInfo>
            <ReservationButton>예약하기</ReservationButton>
          </BottomSheet>
        </>
      )}
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

const MainImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 16px;
`;

const Location = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
`;

const LocationDetail = styled.p`
  font-size: 14px;
  color: #222;
  margin-bottom: 10px;
`;

const Star = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgb(235 235 233);
`;

const Score = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

const UnderlinedText = styled.span`
  font-size: 14px;
  text-decoration: underline;
`;

const Properties = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgb(235 235 233);
`;

const Property = styled.div`
  display: flex;
  gap: 5px;
  font-size: 14px;
  align-items: center;
`;

const DetailCard = styled.div`
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgb(235 235 233);
  display: flex;
  gap: 16px;
`;

const DetailCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
`;

const StyledImg = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const Text = styled.h3`
  font-size: 16px;
`;

const SubText = styled.h5`
  font-size: 14px;
  color: #6a6a6a;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgb(235 235 233);
`;

const BottomSheet = styled.div`
  border-top: 1px solid rgb(235 235 233);
  height: 80px;
  width: 100%;
  max-width: 375px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 16px;
`;

const ReservationInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const ReservationButton = styled.button`
  width: 150px;
  height: 48px;
  background-color: #ff385c;
  color: white;
  font-size: 16px;
  border-radius: 8px;
`;
