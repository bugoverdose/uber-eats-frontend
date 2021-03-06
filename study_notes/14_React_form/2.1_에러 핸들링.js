/*
  TS integration
  - React.FC : 함수형 컴포넌트 타입
  - 제네릭에 prop 관련 interface 설정.
*/
// [components/form-errors]
import React from "react";

interface IFormErrorProps {
  errorMessage: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
  <span className="font-semibold text-red-500">{errorMessage}</span>
);
// =========================================================================
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-errors";

interface ILoginForm {
  email?: string;
  password?: string;
}

export const Login = () => {
  const { register, getValues, handleSubmit, errors } = useForm<ILoginForm>();
  const onValidSubmit = () => {
    console.log(getValues());
  };
  console.log(errors);
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

