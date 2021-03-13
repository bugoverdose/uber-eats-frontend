import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  FindCategoryBySlug,
  FindCategoryBySlugVariables,
} from "../../generated_api_types/FindCategoryBySlug";

const FIND_CATEGORY_QUERY = gql`
  query FindCategoryBySlug($input: CategoryInputDto!) {
    findCategoryBySlug(input: $input) {
      error
      ok
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string; // params.slug에 직접 접근하기 위해 필요.
}

export const CategoryPage = () => {
  const params = useParams<ICategoryParams>();

  const { data, loading } = useQuery<
    FindCategoryBySlug,
    FindCategoryBySlugVariables
  >(FIND_CATEGORY_QUERY, {
    variables: {
      input: {
        page: 1,
        slug: params.slug,
      },
    },
  });
  console.log(data?.findCategoryBySlug);
  return <h1>Category</h1>;
};
