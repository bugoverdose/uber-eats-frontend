import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from "../../generated_api_types/RestaurantsPageQuery";
import { Restaurant } from "../../components/restaurant";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { Category } from "../../components/category";
import { Link } from "react-router-dom";

const RESTAURANTS_QUERY = gql`
  query RestaurantsPageQuery($input: FindAllRestaurantsInputDto!) {
    findAllCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    findAllRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${CATEGORY_FRAGMENT}
  ${RESTAURANT_FRAGMENT}
`;

interface ISearchFormProps {
  searchTerm: string; // 필수는 아님. useForm의 제네릭으로 대입한 경우,
} // => input의 name 속성 값과 일치해야 함. name="searchTerm"

export const HomePage = () => {
  const [currentPage, setPage] = useState(1); // currentPage : state의 현재 값.
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  // 인자로 함수를 설정하는 경우, 매개변수(current)는 현재 state 값. return되는 값으로 state 값 변화.

  const { data, loading } = useQuery<
    RestaurantsPageQuery,
    RestaurantsPageQueryVariables
  >(
    RESTAURANTS_QUERY,
    { variables: { input: { page: currentPage } } } // 보내는 gql문에서 $input에 대입할 인자: {page: currentPage}
  ); // variables에 대입된 {page:currentPage} 값 변화시 자동으로 query 재요청. // 캐쉬에 존재하면 그대로 사용.

  // 검색: form + redirection.
  const { register, handleSubmit, getValues } = useForm<ISearchFormProps>();
  const history = useHistory();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues(); // input에 입력된 값.
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`, // chicken 검색시, '/search?term=chicken'로 이동.
      // state: { searchTerm }, // state 옵션 : /search로 이동. url에 정보 담기지 않게 됨. url 값 수정으로 직접 검색 내용 수정 불가.
    });
  };
  return (
    <div>
      <Helmet>
        <title>Home | Uber Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="bg-gray-800 w-full flex items-center justify-center py-40"
      >
        <input
          ref={register({ required: true, min: 2 })}
          name="searchTerm"
          type="search"
          className="capsule-input w-1/2 md:w-4/12 xl:w-3/12 border-0 rounded-md"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="capsule-container-width mt-8">
          <div className="flex justify-around max-w-screen-sm mx-auto">
            {data?.findAllCategories.categories?.map((category) => (
              <Link to={`/category/${category.slug}`} key={category.id}>
                <Category coverImg={category?.coverImg} name={category.name} />
              </Link>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-x-5 gap-y-8 mt-5">
            {data?.findAllRestaurants.results?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
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
