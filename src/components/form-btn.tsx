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
/*
[사용 형식]
<FormButton
  canClick={formState.isValid}
  loading={loading}
  actionText={"Log In"}
/>
*/
/*
  className={`${canClick ? "bg-lime-500 hover:bg-lime-600" : "pointer-events-none bg-gray-300"}
  - 클릭 가능한 상태(formState.isValid)에만 녹색 계열
  - 클릭 불가능한 상태(!formState.isValid)면 회색 + 클릭 불가 지정.
    pointer-events-none : 클릭불가 속성
*/
