/*
React Hook Form : React에서 form 작업하는 라이브러리. cf) useState만으로 form & input 작업 + validation + 에러핸들링하는 것은 너무 번거로움. 
  
useForm의 함수들
1) register : input의 ref속성의 값으로 설정. 
 : ref={register({required: true})} : 해당 input를 필수로. validation.

cf) input 태그 자체의 required 속성도 사용 필요. 다만 코드로 뚫을 수 있음. => bypass된 경우를 위해 register의 required 추가 설정 필요.

2) watch : register된 input들에 실시간으로 입력되는 데이터.
        : watch() : 모든 input들에 입력된 데이터들의 객체.
        : watch("potato") : name="potato"인 input에 입력된 문자열 데이터.

3) handleSubmit : form의 inSubmit속성에. submit할 때 실행될 함수를 인자로 사용 
                : <form onSubmit={handleSubmit(onValid, onInvalid)}>
 : onValid : submit했을 때 input들이 valid한 경우에 실행될 함수.
 : onInvalid : input에 입력된 값이 validate: false에 해당 혹은 pattern에 부합하지 않는 경우.

4) errors : 기본적으로 빈 객체. submit 실패시 에러 원인 정보가 담김.
: ref={register({ required: "This is required" })} 
// errors에 담길 에러 메시지. 

[유효성 검증 방법들]
- register({validate: (email: string) => email.includes("@gmail.com") })
  : 입력된 내용에 "@gmail.com"가 포함된 경우에만 참. => valid submit
- validate: {~} : 객체 형식으로 다양한 유효성 검증 설정 가능.
- register({pattern: /^[A-Za-z0-0._&+-]+@gmail.com$/ })
  : 입력된 내용이 해당 정규표현식에 부합하는 경우에만 valid submit으로 인정.
*/
// 0) npm i react-hook-form

import React from "react";
import { useForm } from "react-hook-form";

export const LoggedOutRouter = () => {
  const { register, watch, handleSubmit, errors } = useForm();

  const onSubmit = () => {
    console.log(watch("email"));
  }; // submit했을 때 input들이 valid한 경우에 실행될 함수.
  const onInvalidSubmit = () => {
    console.log("Failed to create account"); // 곧바로 문제가 되는 input으로 커서도 함께 이동.
  }; // input에 입력된 값이 validate: false에 해당 혹은 pattern에 부합하지 않는 경우.

  console.log(errors); // 기본적으로 빈 객체. submit 실패시 에러 원인 정보가 담김.
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
        <div>
          <input
            ref={register({
              required: true, // input에 값이 입력되어야만 submit 가능.
              // validate: (email: string) => email.includes("@gmail.com"),
              // : 입력된 이메일에 "@gmail.com"가 포함된 경우에만 참. => valid submit
              pattern: /^[A-Za-z0-0._&+-]+@gmail.com$/,
              // 해당 RegExp의 패턴에 부합하는 경우에만 valid submit
            })}
            name="email"
            type="email"
            required // html 자체의 필수 조건. 다만 뚫릴 수 있으니 register의 required도 필요.
            placeholder="email"
          />
        </div>
        <div>
          <input
            ref={register({ required: "This is required" })} // errors에 담길 에러 메시지.
            name="password"
            type="password"
            placeholder="password"
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
