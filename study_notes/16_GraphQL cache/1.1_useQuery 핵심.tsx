/*
  복수의 Query를 한번에 요청 가능.

  const { data, loading, error } = useQuery(gql``, {variables : { ~ }})
*/
import { gql, useQuery } from "@apollo/client";
import React from "react";
import { RestaurantsPageQuery } from "../../generated_api_types/RestaurantsPageQuery";

const RESTAURANTS_QUERY = gql`
  query RestaurantsPageQuery($input: FindAllRestaurantsInputDto!) {
    findAllCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    findAllRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const { data, loading, error } = useQuery<RestaurantsPageQuery>(
    RESTAURANTS_QUERY,
    { variables: { input: { page: 1 } } } // 보내는 gql문에서 $input에 대입할 인자.
  );
  return <h1>Restaurants Page</h1>;
};
