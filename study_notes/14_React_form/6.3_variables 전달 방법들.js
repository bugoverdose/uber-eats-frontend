/*
  mutation에 변수 값들 전달하는 방법들
  1) getValues로 값을 받은 후, mutation 사용할 때 variables 옵션에 넣어 전달.
  2) useMutation의 인자2에서 variables 옵션에서 watch로 값 받고, mutation은 그대로 실행.
     즉, 사용할 mutation 자체를 함수 외부에서 설정.
*/
// getValues & variables 옵션
const { register, getValues, handleSubmit, errors } = useForm<ILoginForm>();
const [loginMutation, { loading, error, data }] = useMutation<
  LoginMutation,
  LoginMutationVariables
>(LOGIN_MUTATION);
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
// watch & variables 옵션
const { register,  getValues, watch,  handleSubmit, errors } = useForm<ILoginForm>();
const [loginMutation, { loading, error, data }] = useMutation<
  LoginMutation, 
  LoginMutationVariables
  >(LOGIN_MUTATION, {
  variables: {
    loginInput: { email: watch("email"), password: watch("password") },
  },
});
// ~~
const onValidSubmit = () => {
  loginMutation();
};
// =========================================================================