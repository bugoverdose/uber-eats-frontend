/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface CreateAccountInputDto {
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginInputDto {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================