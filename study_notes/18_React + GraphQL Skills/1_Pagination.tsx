/*
  useState : 현재 페이지 값을 state로 사용 + 값 변경. 
  useQuery : state를 변수로 하여 state가 변할 때마다 자동으로 query 재요청.
             => 현재 페이지의 변화에 따라 계속 데이터 변화. 

  1) 현재페이지 > 1인 경우 이전 페이지로 이동가능하도록 = 페이지 값 state 감소시키는 버튼.
     - 그 외의 경우 빈 div태그
  2) Page 1 of 2: Page {현재 페이지 state값} of {totalPages}
  3) 현재페이지 < totalPages인 경우 다음 페이지로 이동하는 버튼 = 페이지 값 state 증가시키는 버튼.
     - 그 외의 경우 빈 div태그
  => grid로 디자인 : grid grid-cols-3 items-center
     - <div className="grid grid-cols-3 items-center text-center max-w-sm mx-auto mt-10 pb-20">  
*/
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
          {/*~~~*/}
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
