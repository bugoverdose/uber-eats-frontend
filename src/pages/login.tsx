import React from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
  email?: string;
  password?: string;
}

export const Login = () => {
  const { register, getValues, errors } = useForm<ILoginForm>();
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800 px-5">
      <div className="bg-white w-full max-w-lg pt-6 pb-8 rounded-lg text-center">
        <h3 className="font-semibold text-3xl text-gray-800">Log In</h3>
        <form className="flex flex-col mt-5 px-5">
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
/*
<Tailwind Dictionary>

[크기 - 반응형 디자인]
h-screen : 스크린 높이만큼의 높이로. height-screen

px-10 : padding x축. padding horizontal. 좌우 패딩 추가. (not pixel) 
py-5 : padding y축. padding vertical. 상하 패딩 추가.
     : 대체로 rem 단위. relative measurement. => 반응형 디자인을 디폴트로 적용.

mt-5 : margin-top 
mb-3 : margin-bottom  
my-5 : 상하 margin 추가. margin-top & margin-bottom  

w-full max-w-lg : width: 100% & max-width: 32rem  
w-full max-w-screen-sm : width: 100% & max-width: 640px;  // 최대 넓이는 작은 스크린 크기. 반응형이기는 함. (픽셀 기준)

==========================================================
[레이아웃]
flex : display: flex. flexbox container화
flex-col : flex-direction: column;
justify-center & items-center : 가운데 정렬 (align items center)

rounded-lg : border-radius

shadow-md : 주변 그림자.
shadow-inner : 내부 상단에 그림자.

bg-white : 배경색 흰색.
bg-gray-800: 배경색 회색.

==========================================================
[텍스트 디자인]

text-center
text-gray-800: 글자색 회색.
font-bold : 글자 볼드체
text-lg : 글자 크기.

==========================================================
[state]
focus:outline-none // 해당 input 태그 선택됐을 때 주변의 outline 생기지 않도록. 
focus:bg-yellow-200 // 해당 input 태그 내부에 마우스 커서가 있을 때 색상 변경.

hover:bg-yellow-200 // 마우스가 위에 있을 때 배경 색상 변경.

hover:opacity-90 bg-gray-800 // 마우스가 위에 있을 때 배경 투명도 변경.

==========================================================
[border] 따로 border 두께 설정해줘야 border 관련 설정들 적용 가능해짐.
border : border-width: 1px;
border-4 : border-width: 4px;
border-l : border-left-width: 1px;
border-r-4 : border-right-width: 4px;
border-b & border-t 등으로 border 두께 설정 필수

hover:border-red-600 border-4  // 마우스가 위에 있을 때 border 색상 변경.  

border-opacity-50 border-green-600 border // 반투명하면서 녹색

focus:outline-none border-2 focus:border-gray-500 
// 해당 input이 선택되었을 때 outline 대신 border 색 변경.
*/
/*
  CTRL+SPACE : Tailwind 자동완성 기능 활성화

  w-full max-w-lg 
  // width: 100% & max-width: 32rem // 좌우 넓이 반응형 디자인

  focus:outline-none border-2 focus:border-gray-500 focus:border-opacity-50 
   // 해당 input이 선택되었을 때 outline 대신 2px짜리 border 색 변경.

  hover:opacity-90 bg-gray-800 // 마우스가 위에 있을 때 배경 투명도 변경.
*/
