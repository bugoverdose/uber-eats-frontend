import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { RestaurantsPageQuery } from "../../generated_api_types/RestaurantsPageQuery";
import { Restaurant } from "../../components/restaurant";

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
  const [currentPage, setPage] = useState(1); // currentPage : state의 현재 값.
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  // 인자로 함수를 설정하는 경우, 매개변수(current)는 현재 state 값. return되는 값으로 state 값 변화.

  const { data, loading, error } = useQuery<RestaurantsPageQuery>(
    RESTAURANTS_QUERY,
    { variables: { input: { page: currentPage } } } // 보내는 gql문에서 $input에 대입할 인자: {page: currentPage}
  ); // variables에 대입된 {page:currentPage} 값 변화시 자동으로 query 재요청. // 캐쉬에 존재하면 그대로 사용.

  return (
    <div>
      <Helmet>
        <title>Home | Uber Eats</title>
      </Helmet>
      <form className="bg-gray-800 w-full flex items-center justify-center py-40">
        <input
          type="search"
          className="capsule-input w-3/12 border-0 rounded-md"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="capsule-container-width mt-8">
          <div className="flex justify-around max-w-screen-sm mx-auto">
            {data?.findAllCategories.categories?.map((category) => (
              <div className="flex flex-col items-center cursor-pointer w-24 group">
                <div
                  style={{ backgroundImage: `url(${category.coverImg})` }}
                  className="bg-cover bg-center w-20 h-20 rounded-full group-hover:shadow-2xl"
                ></div>
                <span className="text-base font-semibold text-center">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-x-5 gap-y-8 mt-5">
            {data?.findAllRestaurants.results?.map((restaurant) => (
              <Restaurant
                id={restaurant.id}
                restaurantName={restaurant.name}
                coverImg={restaurant.coverImg}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 items-center text-center max-w-sm mx-auto mt-10 pb-20">
            {currentPage > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page {currentPage} of {data?.findAllRestaurants.totalPages}
            </span>
            {currentPage !== data?.findAllRestaurants.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
