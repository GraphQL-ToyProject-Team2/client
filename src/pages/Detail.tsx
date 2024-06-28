import { gql, useQuery } from '@apollo/client';

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
  return <></>;
};

export default Detail;
