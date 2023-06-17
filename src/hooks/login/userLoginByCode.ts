import request from "@/network/request";
import { PersonRes } from "@/type/user";

const useLoginByCode = () => {

  const loginByCode = async (userinfo: any) => {
    const { data, whenFinish, error } = request<PersonRes>({
      url: "/user/login-by-code",
      method: "post",
      data: userinfo,
    });
    return whenFinish.then(() => {
      return { data, error };
    });
  };

  return loginByCode;
};

export default useLoginByCode;