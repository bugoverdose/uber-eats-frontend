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

export const useLoggedInUser = () =>
  useQuery<loggedInUserQuery>(LOGGED_IN_USER_QUERY);
