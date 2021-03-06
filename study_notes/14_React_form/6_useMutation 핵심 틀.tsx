/*
const [mutation실행함수, { loading, data }] = useMutation<~,~>(gql문, 옵션객체)
InputDTO 등 활용
loading: 이미 mutation이 하나 전송되어 로딩 중일 때는 새롭게 mutation 보내지 않도록.

onCompleted 옵션 : mutation이 제대로 실행된 경우 실행될 함수 설정.
onError 옵션 : 예상 외의 이유로 mutation이 제대로 실행되지 못한 경우 실행될 함수
- a@a를 이메일값으로 보내는 등, 연결 불안정, invalid request, 인증 필요, url 형식 틀린 경우 등.
- OutputDto의 error는 onCompleted에만 담기게 됨. onError를 실행시키는 에러와 다름.

errors?.password?.message : useForm의 errors. mutation 실행 이전에 발생. input 조건 에러. 
data?.login.error : mutation 실행 결과 반환되는 error 값. 백엔드에 설정한 에러메시지.
*/
import { ApolloError, gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-errors";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../generated_api_types/LoginMutation";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInputDto!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`; // LoginMutation : 프론트에서만 사용되는 mutation명. codegen에 사용(ts 관련 interface들 생성)
// $변수명:타입! // gql문에서 $는 변수를 의미. // 백엔드로 전달되는 gql문은 playground 형식과 동일.
// schema.graphql에 @InputType 등 자동생성 => 그대로 활용 가능. (InputType 사용시 globalTypes 모듈화 버그 멈추는 기능도 존재)

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, getValues, handleSubmit, errors } = useForm<ILoginForm>();

  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
    console.log(data);
  }; // onCompleted 옵션: mutation이 백엔드로 성공적으로 보내졌을 때 실행될 함수.

  const onError = (error: ApolloError) => {
    console.log(error);
  }; // 전혀 예상 못한 상황들. mutation이 제대로 보내지지 않았을 때.

  const [loginMutation, { loading, data: loginMutationResult }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
    onError,
  });
  // 제네릭 설정해줘야 DTO 기준 type validation 가능해짐. (dto => schema => codegen types)

  const onValidSubmit = () => {
    if (!loading) {
      const { email, password } = getValues(); // 모든 validation을 통과하여 submit된 입력값들.
      loginMutation({
        variables: {
          loginInput: { email, password },
        },
      });
    } // 이미 mutation이 하나 전송되어 로딩 중일 때는 새롭게 mutation 보내지 않도록.
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
          <button className="btn py-3 px-5 mt-5">
            {loading ? "Loading..." : "Log In"}
          </button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult?.login.error} />
          )}
        </form>
      </div>
    </div>
  );
};
