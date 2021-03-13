/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInputDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: FindCategoryBySlug
// ====================================================

export interface FindCategoryBySlug_findCategoryBySlug_restaurants_category {
  __typename: "CategoryEntity";
  name: string;
}

export interface FindCategoryBySlug_findCategoryBySlug_restaurants {
  __typename: "RestaurantEntity";
  id: number;
  name: string;
  coverImg: string;
  category: FindCategoryBySlug_findCategoryBySlug_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface FindCategoryBySlug_findCategoryBySlug_category {
  __typename: "CategoryEntity";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  restaurantCount: number;
}

export interface FindCategoryBySlug_findCategoryBySlug {
  __typename: "CategoryOutputDto";
  error: string | null;
  ok: boolean;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: FindCategoryBySlug_findCategoryBySlug_restaurants[] | null;
  category: FindCategoryBySlug_findCategoryBySlug_category | null;
}

export interface FindCategoryBySlug {
  findCategoryBySlug: FindCategoryBySlug_findCategoryBySlug;
}

export interface FindCategoryBySlugVariables {
  input: CategoryInputDto;
}
