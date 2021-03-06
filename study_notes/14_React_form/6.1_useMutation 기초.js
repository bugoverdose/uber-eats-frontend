/*
  백엔드로 Mutation 보내기
 
  useMutation()
  : gql문을 인자로 설정.
  : Mutation Tuple을 반환함. index=0, 1에 mutation 실행함수 & 실행결과가 담김.

  const [MutationFunction, MutationResult] = useMutation(gql`graphQL문`);
  - MutationFunction : mutation을 실행하는 함수.
  - MutationResult : mutation 실행 결과가 담기는 객체. {loading, error, data} 등
                   : loading은 mutation 실행 중. error은 mutation 실행결과 에러 발생 등.

  ======================================================================   
  TS integration: 백엔드의 DTO 활용 + 타입에 맞는 데이터 입력되었는지 validation 가능.
  const [loginMutation, { data }] = useMutation<PotatoMutation, PotatoMutationVariables>
  - useMutation에 제네릭으로 interface들 대입. 
  - interface들은 프론트의 gql문 & 백엔드의 dto를 기반으로 apollo-tooling으로 생성 // apollo client:codegen src/generated_api_types --target=typescript --outputFlat

  ======================================================================                   
  실행방법: variable 옵션을 활용하여 변수 전달하면서 mutation 사용 가능.
  - MutationFunction({ variables: { email, password } });
*/
import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-errors";
import {
  PotatoMutation,
  PotatoMutationVariables,
} from "./mytypes.ts/PotatoMutation";

const LOGIN_MUTATION = gql`
  mutation PotatoMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      error
      token
    }
  }
`; // PotatoMutation : 프론트에서만 사용되는 mutation명. codegen(ts 관련 interface들 생성) 등에 사용. 백엔드로 전달되지 않음.
// $변수명:타입! // gql문에서 $는 변수를 의미. // !:required
// 백엔드로 전달되는 gql문은 playground 형식과 동일.

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, getValues, handleSubmit, errors } = useForm<ILoginForm>();
  const [loginMutation, { loading, error, data }] = useMutation<
    PotatoMutation,
    PotatoMutationVariables
  >(LOGIN_MUTATION);// 제네릭 설정해줘야 DTO 기준 type validation 가능해짐. (dto => schema => codegen types)

  const onValidSubmit = () => {
    const { email, password } = getValues(); // 모든 validation을 통과하여 submit된 입력값들.
    loginMutation({
      variables: {
        email,
        password,
      },
    });
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800 px-5">
      <div className="bg-white w-full max-w-lg pt-6 pb-8 rounded-lg text-center">
        <h3 className="font-semibold text-3xl text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onValidSubmit)}
          className="grid gap-3 mt-5 px-5"
        >
          <input
            ref={register({ required: "Email is required" })}
            type="email"
            placeholder="Email"
            name="email"
            required
            className="input"
          />
          {errors?.email?.message && (
            <FormError errorMessage={errors?.email?.message} />
          )}
          <input
            ref={register({ required: "Password is required", minLength: 8 })}
            type="password"
            placeholder="Password"
            name="password"
            required
            className="input"
          />
          {errors?.password?.message && (
            <FormError errorMessage={errors?.password?.message} />
          )}
          {errors?.password?.type === "minLength" && (
            <FormError
              errorMessage={"Password must be more than 8 characters."}
            />
          )}
          <button className="btn py-3 px-5 mt-5">Log In</button>
        </form>
      </div>
    </div>
  );
};

// ==================================================================
// PotatoMutation.ts
export interface PotatoMutation_login {
  __typename: "LoginOutpuDto";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface PotatoMutation {
  login: PotatoMutation_login;
}

export interface PotatoMutationVariables {
  email: string;
  password: string;
}

// ==================================================================