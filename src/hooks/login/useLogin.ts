import request from "@/network/request";
import { PersonRes } from "@/type/user";

const useLogin = () => {

  const login = async (userinfo: any) => {
    const { data, whenFinish, error } = request<PersonRes>({
      url: "/user/login",
      method: "post",
      data: userinfo,
    });
    return whenFinish.then(() => {
      return { data, error };
    });
  };

  return login;
};

export default useLogin;
