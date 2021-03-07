/*
1) select & option 태그들
  - enum 타입의 각 key들(입력 가능한 값들)에 대해 option 생성.
  - select에 name & ref 속성 설정하여 form에 등록.
  - option들의 key prop에 index 설정. uniqueness 충족하도록. (map 사용했으므로)

  <select name="role" ref={register({ required: true })}>
    {Object.keys(UserRole).map((role, index) => (
      <option key={index}>{role}</option>
    ))}
  </select>

2) useForm의 defaultValues 옵션으로 해당 input의 디폴트 값 설정 가능.
  const { formState } = useForm<~>({
    mode: "onBlur", 
    defaultValues: {
      email: "@gmail.com",
      role: UserRole.Client,
    },
  }); // defaultValues 옵션: 특정 input의 디폴트 값. 
         : 사용자에게 보이는 값 & mutation에 담기는 데이터 모두에 반영.
*/
// [globalTypes.ts] DTO => schema => codegen으로 자동 생성됨. 
export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}
// ================================================================
// [pages/create-account.tsx]
const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($createAccountInput: CreateAccountInputDto!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
} // enum 타입인 UserRole는 globalTypes에서 그대로 활용 가능. (dto => schema => codegen type)

export const CreateAccount = () => {
  const { register, handleSubmit } = useForm<ICreateAccountForm>({
    mode: "onBlur",
    defaultValues: { role: UserRole.Client },
  }); // defaultValues 옵션: 특정 input의 디폴트 값. 사용자에게 보이는 값 & mutation에 담기는 데이터 모두에 반영.

  // const onCompleted = (data: CreateAccountMutation) => {}; // onCompleted 옵션: mutation이 백엔드로 성공적으로 보내졌을 때 실행될 함수.

  const onError = (error: ApolloError) => {
    console.log(error);
  }; // 전혀 예상 못한 상황들. mutation이 제대로 보내지지 않았을 때.

  const [
    CreateAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      // onCompleted,
      onError,
    }
  ); // 제네릭은 DTO 기준 type validation 목적. (dto => schema => codegen types)

  const onValidSubmit = () => {};

  return (
    <div className="h-screen flex flex-col items-center mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Uber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={uberLogo} alt="Uber Eats" className="w-52 mb-10" />
        <h4 className="w-full font-semibold text-2xl">Let's get started</h4>
        <form
          onSubmit={handleSubmit(onValidSubmit)}
          className="grid gap-3 mt-5 w-full"
        > 
        {/* 기타input들 */}
          <select
            name="role"
            ref={register({ required: true })}
            className="capsule-input"
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          {/* button 태그 - submit */}
        </form>
        {/* 기타 Link to */}
      </div>
    </div>
  );
};
