import { ApolloError, gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormButton } from "../../components/form-btn";
import {
  editProfile,
  editProfileVariables,
} from "../../generated_api_types/editProfile";
import { useLoggedInUser } from "../../hooks/useLoggedInUser-hook";

const EDIT_PROFILE_MUTION = gql`
  mutation editProfile($input: EditProfileInputDto!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  const { data: userData } = useLoggedInUser(); // 로그인된 사용자의 캐쉬 데이터 접근. 없으면 백엔드로 해당 Query 보내서 가져오기.

  const onMutationCompleted = (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok) {
      // cache 업데이트
    }
  };

  const onMutationError = (error: ApolloError) => {
    console.log(error);
  }; // 전혀 예상 못한 상황들. mutation이 제대로 보내지지 않았을 때.

  const [editProfileMutation, { loading: loadingMutation }] = useMutation<
    editProfile, // outputDto
    editProfileVariables // inputDto
  >(EDIT_PROFILE_MUTION, {
    onCompleted: onMutationCompleted,
    onError: onMutationError,
  });

  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: "onChange", // validation 트리거 시점.
    defaultValues: { email: userData?.loggedInUser.email },
  }); // name에 해당하는 input들의 디폴트 값 설정. form에서 최초로 값 설정. // input에는 name & ref={register}만 설정.

  const onValidSubmit = () => {
    const { email, password } = getValues();
    editProfileMutation({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
        }, // password가 ""면 좌측의 false 반환. // 입력값 존재시 true이므로 우측 반환하고 구조분해.
      },
    }); // 제대로 된 값들 submit되었으면 Mutation 실행.
  };

  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <h1 className="font-semibold text-2xl mb-3">Edit Profile</h1>
      <form
        onSubmit={handleSubmit(onValidSubmit)}
        className="grid grid-gap my-5 w-full max-w-screen-sm"
      >
        <input
          ref={register({
            // eslint-disable-next-line
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          name="email"
          className="capsule-input"
          type="email"
          placeholder="email"
        />
        <input
          ref={register}
          name="password"
          className="capsule-input"
          type="password"
          placeholder="password"
        />
        <FormButton
          canClick={formState.isValid}
          loading={loadingMutation}
          actionText="Save Profile"
        />
      </form>
    </div>
  );
};
