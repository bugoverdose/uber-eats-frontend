import { gql } from "@apollo/client";

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantParts on RestaurantEntity {
    id
    name
    coverImg
    category {
      name
    }
    address
    isPromoted
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryParts on CategoryEntity {
    id
    name
    coverImg
    slug
    restaurantCount
  }
`;
