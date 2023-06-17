import { Token } from "@/type/user";

const TOKEN_KEY = "__OJ__token";

export function setToken(token: Token) {
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export const getToken = () => {
  const tokenStr = window.localStorage.getItem(TOKEN_KEY);
  console.log(tokenStr);

  if (!tokenStr) return "您还未登录！请登录以使用全部功能" as const;

  const token = JSON.parse(tokenStr) as Token;
  console.log(token);
  if (!token.value) return "Token 不合法，请重新登录！" as const;

  // if (token.expire * 1000 < Date.now()) {
  //   clearToken();
  //   return "登录已过期，请重新登录！" as const;
  // }

  return token;
};
