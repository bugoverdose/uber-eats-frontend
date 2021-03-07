import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "./constants";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
// 웹사이트 나갔다 돌아왔을 때도 token이 유지되도록 local storage에 저장해서 활용.

export const isLoggedInVar = makeVar(Boolean(token)); // reactive variable 생성. 토큰이 없으면 디폴트 값은 false.
export const authTokenVar = makeVar(token); // 로그인되지 않았으면 디폴트값은 null
// isLoggedInVar(true), authTokenVar(token)처럼 값 업데이트 가능. 새로운 값을 인자에 대입하면서 실행.

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // 백엔드의 playground 주소. (프론트엔드와 포트 번호는 달라야 함)
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            }, // read 메서드가 return하는 값 = 해당 isLoggedIn 필드에 담기는 값
          }, // local only field명: isLoggedIn & token
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
