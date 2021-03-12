import React, { useEffect } from "react";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  verifyEmail,
  verifyEmailVariables,
} from "../../generated_api_types/verifyEmail";
import { useLocationParam } from "../../hooks/useLocationParam-hook";
import { useLoggedInUser } from "../../hooks/useLoggedInUser-hook";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet-async";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInputDto!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const history = useHistory();
  const { data: userData } = useLoggedInUser(); // UserEntity:2 현재 로그인된 사용자의 캐쉬 데이터.
  const client = useApolloClient();
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    console.log(ok);
    if (ok && userData?.loggedInUser.id) {
      client.writeFragment({
        id: `UserEntity:${userData.loggedInUser.id}`, // 캐쉬id: UserEntity:2
        fragment: gql`
          fragment VerifiedUser on UserEntity {
            emailVerified
          }
        `, // fragment의 타입은 UserEntity. (F12 > Apollo > Cache 참고).
        data: {
          emailVerified: true,
        }, // UserEntity.emailVerified 필드의 값을 선택하여 값 수정.
      });
      history.push("/");
    }
  };
  const [verifyEmailMutation] = useMutation<
    verifyEmail, // outputDTO
    verifyEmailVariables // inputDTO
  >(VERIFY_EMAIL_MUTATION, {
    onCompleted, // 2) FrontEnd 쪽의 cache도 변하도록 직접 지정. DB로 변화된 데이터 재요청X.
  }); // 1) Mutation 실행하여 ok:true 되면 DB 변화.

  const code = useLocationParam("code"); // /confirm?code=~~~
  useEffect(() => {
    if (code) {
      verifyEmailMutation({
        variables: {
          input: { code: code },
        },
      });
    } // eslint-disable-next-line
  }, []); // 최초로 1번만 effect함수가 실행되도록.
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <Helmet>
        <title>Verify Email | Uber Eats</title>
      </Helmet>
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">Please don't close this page.</h4>
    </div>
  );
};
