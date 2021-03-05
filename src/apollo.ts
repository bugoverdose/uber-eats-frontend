import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false); // reactive variable 생성. 디폴트값은 false.
// 업데이트하기 위해 export

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // 백엔드의 playground 주소. (프론트엔드와 포트 번호는 달라야 함)
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            // local only field명: isLoggedIn
            read() {
              return isLoggedInVar();
            }, // read 메서드: 해당 isLoggedIn 필드에 담기는 값을 return
          },
        },
      },
    },
  }),
});
