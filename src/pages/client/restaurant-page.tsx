import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  FindRestaurantByIdQuery,
  FindRestaurantByIdQueryVariables,
} from "../../generated_api_types/FindRestaurantByIdQuery";
import { NotFound } from "../404";

const RESTAURANT_QUERY = gql`
  query FindRestaurantByIdQuery($input: FindRestaurantInputDto!) {
    findRestaurantById(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IParam {
  id: string;
}

export const RestaurantPage = () => {
  const params = useParams<IParam>();
  const { data, loading } = useQuery<
    FindRestaurantByIdQuery,
    FindRestaurantByIdQueryVariables
  >(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +params.id, // url에 담기는 값은 string
      },
    },
  });
  if (!loading && !data?.findRestaurantById.restaurant) {
    return <NotFound />;
  }
  return (
    <div>
      <Helmet>
        <title>
          {`${data?.findRestaurantById.restaurant?.name}`} | Uber Eats
        </title>
      </Helmet>
      <div
        className="bg-cover bg-center py-52 mb-5 bg-gray-900"
        style={{
          backgroundImage: `url(${data?.findRestaurantById.restaurant?.coverImg})`,
        }}
      >
        <div className="bg-white w-5/12 py-5 pl-40">
          <h2 className="text-4xl font-semibold mb-2">
            {data?.findRestaurantById.restaurant?.name}
          </h2>
          <h5 className="text-sm font-light">
            {data?.findRestaurantById.restaurant?.category?.name}
          </h5>
          <h6 className="text-base font-normal">
            {data?.findRestaurantById.restaurant?.address}
          </h6>
        </div>
      </div>
    </div>
  );
};
