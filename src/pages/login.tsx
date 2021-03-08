import React from "react";
import { Helmet } from "react-helmet-async";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FormButton } from "../components/form-btn";
import { FormError } from "../components/form-errors";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../generated_api_types/LoginMutation";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { LogoImg } from "../components/logo";

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
  const {
    register,
    getValues,
    handleSubmit,
    errors,
    formState,
  } = useForm<ILoginForm>({ mode: "onBlur" });

  const onMutationCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token); // 인증된 토큰 브라우저에 저장. 웹사이트 재방문시, localstorage의 토큰으로 자동 로그인 가능.
      authTokenVar(token);
      isLoggedInVar(true); // apollo.ts에서 설정한 reactive variable둘의 값 업데이트.
    }
  }; // onCompleted 옵션: mutation이 백엔드로 성공적으로 보내졌을 때 실행될 함수.

  const onMutationError = (error: ApolloError) => {
    console.log(error);
  }; // 전혀 예상 못한 상황들. mutation이 제대로 보내지지 않았을 때.

  const [loginMutation, { loading, data: loginMutationResult }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted: onMutationCompleted,
    onError: onMutationError,
  }); // 제네릭 설정해줘야 DTO 기준 type validation 가능해짐. (dto => schema => codegen types)

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
    <div className="h-screen flex flex-col items-center mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Uber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <LogoImg css="w-52 mb-10" />
        <h4 className="w-full font-semibold text-2xl">Welcome Back</h4>
        <form
          onSubmit={handleSubmit(onValidSubmit)}
          className="grid gap-3 mt-5 w-full"
        >
          <input
            ref={register({
              required: "Email is required",
              // eslint-disable-next-line
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type="email"
            placeholder="Email"
            name="email"
            required
            className="capsule-input "
          />
          {errors?.email?.message && (
            <FormError errorMessage={errors?.email?.message} />
          )}
          {errors?.email?.type === "pattern" && (
            <FormError errorMessage="Invalid Email Address" />
          )}
          <input
            ref={register({ required: "Password is required", minLength: 8 })}
            type="password"
            placeholder="Password"
            name="password"
            required
            className="capsule-input"
          />
          {errors?.password?.message && (
            <FormError errorMessage={errors?.password?.message} />
          )}
          {errors?.password?.type === "minLength" && (
            <FormError
              errorMessage={"Password must be more than 8 characters."}
            />
          )}
          <FormButton
            canClick={formState.isValid}
            loading={loading}
            actionText={"Log In"}
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult?.login.error} />
          )}
        </form>
        <div className="mt-5">
          Are you new here?{" "}
          <Link
            to="/create-account"
            className="font-semibold text-lime-600 hover:underline"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
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
