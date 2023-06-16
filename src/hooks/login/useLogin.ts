import request from "@/network/request";
import { PersonRes } from "@/type/user";
import { Ref, ref } from "vue";

const useLogin = (userinfo:any) => {
  const data = ref({}) as Ref<PersonRes>;
  const error = ref(undefined) as Ref<string | undefined>;
  const fetching = ref(true);

  const login =async () => {
    const { data, whenFinish, fetching, error } = request<PersonRes>({
      url: '/user/login',
      method: "post",
      data : userinfo
    });
    await whenFinish;
    return { data, fetching, error };
  }

  const query =async () => {
    const res = await login();
    if (res.error.value) {
      error.value = res.error.value;
    } else {
      data.value = res.data.value!;
    }
    fetching.value = false;
  }

  query();

  return { data, fetching, error };
}

export default useLogin;