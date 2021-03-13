import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  SearchRestaurant,
  SearchRestaurantVariables,
} from "../../generated_api_types/SearchRestaurant";

const SEARCH_RESTAURANT = gql`
  query SearchRestaurant($input: SearchRestaurantInputDto!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      searchResult {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [callSearchQuery, { loading, error, data, called }] = useLazyQuery<
    SearchRestaurant,
    SearchRestaurantVariables
  >(SEARCH_RESTAURANT);

  useEffect(() => {
    const searchTerm = location.search.split("?term=")[1];
    if (!searchTerm) {
      return history.replace("/"); // 접근했던 라우트에 뒤로가기로 재접근 불가. history API에 redirect된 라우트만 저장.
    }
    callSearchQuery({
      variables: {
        input: {
          page: 1,
          query: searchTerm,
        },
      },
    });
  }, [location.search, history, callSearchQuery]);
  console.log(loading, error, data, called);
  return (
    <div>
      <Helmet>
        <title>Search | Uber Eats</title>
      </Helmet>
      <h1>Search</h1>
    </div>
  );
};
