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
`; // 중요: id 필드가 있어야 writeFragment로 접근하여 수정 가능

export const useLoggedInUser = () =>
  useQuery<loggedInUserQuery>(LOGGED_IN_USER_QUERY);
