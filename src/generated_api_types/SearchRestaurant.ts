/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: SearchRestaurant
// ====================================================

export interface SearchRestaurant_searchRestaurant_searchResult_category {
  __typename: "CategoryEntity";
  name: string;
}

export interface SearchRestaurant_searchRestaurant_searchResult {
  __typename: "RestaurantEntity";
  id: number;
  name: string;
  coverImg: string;
  category: SearchRestaurant_searchRestaurant_searchResult_category | null;
  address: string;
  isPromoted: boolean;
}

export interface SearchRestaurant_searchRestaurant {
  __typename: "SearchRestaurantOutputDto";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  searchResult: SearchRestaurant_searchRestaurant_searchResult[] | null;
}

export interface SearchRestaurant {
  searchRestaurant: SearchRestaurant_searchRestaurant;
}

export interface SearchRestaurantVariables {
  input: SearchRestaurantInputDto;
}
