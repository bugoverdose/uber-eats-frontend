/*
register된 input들에 입력된 데이터를 받는 방법들.  
- getValues : submit했을 때의 값들만. submit된 값.
- watch : 실시간으로 입력되고 있는 값들. input의 값.

1) getValues : submit된 input들의 데이터들 받기.
             : getValues() : 모든 input들에 입력된 데이터들의 객체.
             : getValues("potato") : name="potato"인 input에 입력된 문자열 데이터.

2) watch : register된 input들에 실시간으로 입력되는 데이터.
        : watch() : 모든 input들에 입력된 데이터들의 객체.
        : watch("potato") : name="potato"인 input에 입력된 문자열 데이터.
*/
// 0) npm i react-hook-form
 
import React from "react";
import { useForm } from "react-hook-form";

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
          className="flex flex-col mt-5 px-5"
        >
          <input
            ref={register({ required: true })}
            type="email"
            placeholder="Email"
            name="email"
            required
            className="input mb-3"
          />
          <input
            ref={register({ required: true })}
            type="password"
            placeholder="Password"
            name="password"
            required
            className="input"
          />
          <button className="btn py-3 px-5 mt-5">Log In</button>
        </form>
      </div>
    </div>
  );
};