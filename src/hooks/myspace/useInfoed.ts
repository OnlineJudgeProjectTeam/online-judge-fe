import request from "@/network/request";
import { PersonRes } from "@/type/user";

const useUpdate = () => {

  const update = async (form: any) => {
    const { data, whenFinish, error } = request<PersonRes>({
      url: "/user/update",
      method: "post",
      data: form,
    });
    return whenFinish.then(() => {
      return { data, error };
    });
  };

  return update;
};

export default useUpdate;





