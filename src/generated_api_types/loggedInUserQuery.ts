/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: loggedInUserQuery
// ====================================================

export interface loggedInUserQuery_loggedInUser {
  __typename: "UserEntity";
  id: number;
  email: string;
  role: UserRole;
  emailVerified: boolean;
}

export interface loggedInUserQuery {
  loggedInUser: loggedInUserQuery_loggedInUser;
}
