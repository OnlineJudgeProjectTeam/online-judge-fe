import request from "@/network/request";
import { PersonRes } from "@/type/user";
import { Ref, ref } from "vue";

const useLogin = () => {
  const data = ref({}) as Ref<PersonRes>;
  const error = ref(undefined) as Ref<string | undefined>;
  const fetching = ref(true);

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
