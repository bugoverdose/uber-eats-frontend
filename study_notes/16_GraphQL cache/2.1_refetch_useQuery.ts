/*
  캐쉬 업데이트 방법들
  - writeFragment : 프론트엔드에 저장된 캐쉬 직접 수정. 초고속. 최적화.
  - refetch : 백엔드에 query를 재요청. 수정된 DB의 데이터를 새로 가져오기. 정확. 느림. 비용 증가.

  const { data, refetch } = useQuery(gql`~`);
  - refetch : 백엔드로 해당 쿼리를 백엔드로 다시 요청해주는 함수.
            : Promise이므로 await refetch() 형식 필요.
  - 기본적으로 캐쉬에 이미 요청 결과가 존재하면 캐쉬 데이터 그대로 사용,
    하지만 refetch 실행하면 백엔드에서 다시 데이터 가져와서 캐쉬에 저장.
*/
// refetching query
import { gql, useQuery } from "@apollo/client";
import { loggedInUserQuery } from "../generated_api_types/loggedInUserQuery";

const LOGGED_IN_USER_QUERY = gql`
  query loggedInUserQuery {
    loggedInUser {
      id
      email
      role
      emailVerified
    }
  }
`;
export const ConfirmEmail = async () => {
  const { data, refetch } = useQuery<loggedInUserQuery>(LOGGED_IN_USER_QUERY);
  // ~~~
  await refetch();
};
