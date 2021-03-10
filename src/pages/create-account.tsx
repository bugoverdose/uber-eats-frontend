import React from "react";
import { Helmet } from "react-helmet-async";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { FormButton } from "../components/form-btn";
import { FormError } from "../components/form-errors";
import uberLogo from "../images/uber-eats-logo.svg";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "../generated_api_types/CreateAccountMutation";
import { UserRole } from "../generated_api_types/globalTypes";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($createAccountInput: CreateAccountInputDto!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
} // enum 타입인 UserRole는 globalTypes에서 그대로 활용 가능. (dto => schema => codegen type)

export const CreateAccount = () => {
  const {
    register,
    getValues,
    handleSubmit,
    errors,
    formState,
  } = useForm<ICreateAccountForm>({
    mode: "onBlur",
    defaultValues: { role: UserRole.Client },
  }); // defaultValues 옵션: 특정 input의 디폴트 값. 사용자에게 보이는 값 & mutation에 담기는 데이터 모두에 반영.

  const history = useHistory();
  const onMutationCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert("Your Account is Created! Log in now!");
      history.push("/"); // login 라우트로 세부 redirection
    }
  }; // onCompleted 옵션: mutation이 백엔드로 성공적으로 보내졌을 때 실행될 함수.

  const onMutationError = (error: ApolloError) => {
    console.log(error);
  }; // 전혀 예상 못한 상황들. mutation이 제대로 보내지지 않았을 때.

  const [
    CreateAccountMutation,
    { loading: loadingMutation, data: createAccountMutationResult },
  ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted: onMutationCompleted,
      onError: onMutationError,
    }
  ); // 제네릭은 DTO 기준 type validation 목적. (dto => schema => codegen types)

  const onValidSubmit = () => {
    if (!loadingMutation) {
      const { email, password, role } = getValues(); // 모든 validation을 통과하여 submit된 입력값들.
      CreateAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
        },
      });
    } // 이미 mutation이 하나 전송되어 로딩 중일 때는 새롭게 mutation 보내지 않도록.
  };
  return (
    <div className="h-screen flex flex-col items-center mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Uber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={uberLogo} alt="Uber Eats" className="w-52 mb-10" />
        <h4 className="w-full font-semibold text-2xl">Let's get started</h4>
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
            className="capsule-input"
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
          <select
            name="role"
            ref={register({ required: true })}
            className="capsule-input"
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <FormButton
            canClick={formState.isValid}
            loading={loadingMutation}
            actionText={"Create Account"}
          />
          {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult?.createAccount.error}
            />
          )}
        </form>
        <div className="mt-5">
          Already have an account?{" "}
          <Link to="/" className="font-semibold text-lime-600 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
