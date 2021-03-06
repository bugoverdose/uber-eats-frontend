/*
  Validation : errors 활용하여 에러 발생했을 때 특정 문구를 사용자에게 보여주는 방법.
  
  useForm TS integration 필요
  - 사용될 input들로 interface를 정의 => useForm에 generic으로 대입.
  - const { register, watch, handleSubmit, errors } = useForm<IForm>();  
  => IForm interface에 email & password 타입 정의한 경우,
     errors.email?.message & errors.password처럼 접근 가능해짐.

================================================================================     
ref={register({ required: "Password is required", minLength: 8 })}
1) errors?.password?.message  // required에 설정된 문자열. 아무 것도 입력 안했을 때만 존재.
   errors?.password?.type === "required" // 동일한 상황. 필수 조건 불충족 에러
2) errors?.password?.type === "minLength"

ref={register({ required: true, pattern: /^[A-Za-z0-0._&+-]+@gmail.com$/,}
3) errors.email?.type === "pattern"   // 설정된 RegExp의 패턴에 부합하지 않는 경우.

console.log(errors)
{ email: {type: "required", message: "Email is required", ref: input.input},  
  password: {type: "minLength", message: "", ref: input.input} }
*/
interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  const { register, watch, handleSubmit, errors } = useForm<IForm>();

  const onSubmit = () => {
    console.log(watch("email"));
  }; // submit했을 때 input들이 valid한 경우에 실행될 함수.
  const onInvalidSubmit = () => {
    console.log("Failed to create account"); // + 곧바로 문제가 되는 input으로 커서도 함께 이동.
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
            required // 불필요.
            placeholder="email"
          />
          {errors.email?.type === "pattern" && (
            <span className="font-bold text-red-600">
              Only @gmail.com is acceptable
            </span>
          )}
        </div>
        <div>
          <input
              ref={register({ required: "Password is required", minLength: 8 })}
              type="password"
              placeholder="Password"
              name="password"
              required
              className="input"
            />
            {errors?.password?.message && (
              <span className="font-semibold text-red-500">
                {errors?.password?.message}
              </span>
            )}
            {errors?.password?.type === "minLength" && (
              <span className="font-semibold text-red-500">
                Password must be more than 8 characters.
              </span>
            )}
          <button className="btn py-3 px-5 mt-5">Log In</button>
         </div>
      </form>
    </div>
  );
};
