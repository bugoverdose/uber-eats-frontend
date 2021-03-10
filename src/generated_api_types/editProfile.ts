/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditProfileInputDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editProfile
// ====================================================

export interface editProfile_editProfile {
  __typename: "EditProfileOutputDto";
  ok: boolean;
  error: string | null;
}

export interface editProfile {
  editProfile: editProfile_editProfile;
}

export interface editProfileVariables {
  input: EditProfileInputDto;
}
