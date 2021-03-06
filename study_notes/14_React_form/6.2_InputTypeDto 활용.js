// LoginMutation : 프론트에서만 사용되는 mutation명. codegen에 사용(ts 관련 interface들 생성)
// $변수명:타입! // gql문에서 $는 변수를 의미.   // 백엔드로 전달되는 gql문은 playground 형식과 동일.
const LOGIN_MUTATION = gql`
  mutation PotatoMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      error
      token
    }
  }
`;
// ~~
const onValidSubmit = () => {
  const { email, password } = getValues();
  loginMutation({
    variables: {
      email,
      password,
    },
  });
};
// =========================================================================
// schema.graphql에 @InputType 등 자동생성 => 그대로 활용 가능. (InputType 사용시 globalTypes 모듈화 버그 멈추는 기능도 존재)
const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInputDto!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;
// ~~
const onValidSubmit = () => {
  const { email, password } = getValues(); // 모든 validation을 통과하여 submit된 입력값들.
  loginMutation({
    variables: {
      loginInput: { email, password },
    },
  });
};
// =========================================================================
