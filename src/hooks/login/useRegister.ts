import request from "@/network/request";
import { PersonRes } from "@/type/user";

const useRegister = () => {

  const register = async (userinfo: any) => {
    const { data, whenFinish, error } = request<PersonRes>({
      url: "/user/register",
      method: "post",
      data: userinfo,
    });
    return whenFinish.then(() => {
      return { data, error };
    });
  };

  return register;
};

export default useRegister;