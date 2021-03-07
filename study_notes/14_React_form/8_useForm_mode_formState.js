/* 
  formState.isValid 
  : 디폴트 값은 참. submit된 내용이 유효하지 않으면 거짓. 
  : onChange 혹은 onBlur 모드일 때만 적용 가능.
    => !formState.isValid일 때 클릭 불가능 혹은 회색으로 설정 가능

  중요: useForm에 mode 옵션 설정 필수.
  - const { formState } = useForm<ILoginForm>({ mode: "onBlur" });

  mode 옵션: validatation trigger되는 시점. 유효성 검증을 실시하는 시점이 언제인가.
  - onSubmit : submit한 시점에서 유효성 검증. (디폴트 mode)
  - onBlur : input에 키보드 커서가 없어진 시점. focus 해제된 시점.
  - onChange : input의 내용이 변하는 매순간 유효성 검증 재실시.
  - onTouched : onBlur + onChange. 첫 blur 이벤트 & 그 이후 매 변화마다.
  - all : 모든 blur & change 이벤트 
*/
// [form-btn.tsx]
import React from "react";

interface IFormButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string; // 로딩중이지 않을 때 보여줄 버튼 문구.
}

export const FormButton: React.FC<IFormButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`py-4 text-xl focus:outline-none text-white transition-colors rounded-lg ${
      canClick
        ? "bg-lime-500 hover:bg-lime-600"
        : "pointer-events-none bg-gray-300"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
// className={`${canClick ? "bg-lime-500 hover:bg-lime-600" : "pointer-events-none bg-gray-300"}
// - 클릭 가능한 상태(formState.isValid)에만 녹색 계열
// - 클릭 불가능한 상태(!formState.isValid)면 회색 + 클릭 불가 지정.
//   pointer-events-none : 클릭불가 속성

// ===========================================================
// [login.tsx]
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
  const { register, getValues, handleSubmit, errors, formState } =
    useForm < ILoginForm > { mode: "onBlur" };

  // ~~~~~~~~~
  return (
    <div className="h-screen flex flex-col items-center mt-10 lg:mt-28">
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={uberLogo} alt="Uber Eats" className="w-52 mb-10" />
        <h4 className="w-full font-semibold text-2xl">Welcome Back</h4>
        <form
          onSubmit={handleSubmit(onValidSubmit)}
          className="grid gap-3 mt-5 w-full"
        >
          <input
            ref={register({ required: "Email is required" })}
            type="email"
            placeholder="Email"
            name="email"
            required
            className="capsule-input "
          />
          {errors?.email?.message && (
            <FormError errorMessage={errors?.email?.message} />
          )}
          {/* ~~~~~~~~ */}
          <FormButton
            canClick={formState.isValid}
            loading={loading}
            actionText={"Log In"}
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult?.login.error} />
          )}
        </form>
      </div>
    </div>
  );
};
