/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindRestaurantInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: FindRestaurantByIdQuery
// ====================================================

export interface FindRestaurantByIdQuery_findRestaurantById_restaurant_category {
  __typename: "CategoryEntity";
  name: string;
}

export interface FindRestaurantByIdQuery_findRestaurantById_restaurant {
  __typename: "RestaurantEntity";
  id: number;
  name: string;
  coverImg: string;
  category: FindRestaurantByIdQuery_findRestaurantById_restaurant_category | null;
  address: string;
  isPromoted: boolean;
}

export interface FindRestaurantByIdQuery_findRestaurantById {
  __typename: "FindRestaurantOutputDto";
  ok: boolean;
  error: string | null;
  restaurant: FindRestaurantByIdQuery_findRestaurantById_restaurant | null;
}

export interface FindRestaurantByIdQuery {
  findRestaurantById: FindRestaurantByIdQuery_findRestaurantById;
}

export interface FindRestaurantByIdQueryVariables {
  input: FindRestaurantInputDto;
}
