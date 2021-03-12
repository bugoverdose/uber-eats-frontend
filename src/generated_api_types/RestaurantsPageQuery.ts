/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindAllRestaurantsInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: RestaurantsPageQuery
// ====================================================

export interface RestaurantsPageQuery_findAllCategories_categories {
  __typename: "CategoryEntity";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  restaurantCount: number;
}

export interface RestaurantsPageQuery_findAllCategories {
  __typename: "AllCategoriesOutputDto";
  ok: boolean;
  error: string | null;
  categories: RestaurantsPageQuery_findAllCategories_categories[] | null;
}

export interface RestaurantsPageQuery_findAllRestaurants_results_category {
  __typename: "CategoryEntity";
  name: string;
}

export interface RestaurantsPageQuery_findAllRestaurants_results {
  __typename: "RestaurantEntity";
  id: number;
  name: string;
  coverImg: string;
  category: RestaurantsPageQuery_findAllRestaurants_results_category | null;
  address: string;
  isPromoted: boolean;
}

export interface RestaurantsPageQuery_findAllRestaurants {
  __typename: "FindAllRestaurantsOutputDto";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: RestaurantsPageQuery_findAllRestaurants_results[] | null;
}

export interface RestaurantsPageQuery {
  findAllCategories: RestaurantsPageQuery_findAllCategories;
  findAllRestaurants: RestaurantsPageQuery_findAllRestaurants;
}

export interface RestaurantsPageQueryVariables {
  input: FindAllRestaurantsInputDto;
}
