import request from "@/network/request";
import { PwdGate } from "@/type/user";


const useEditCode = () => {

  const editcode = async (form: any) => {
    const { data, whenFinish, error } = request<PwdGate>({
      url: "/user/update-password",
      method: "post",
      data: form,
    });
    return whenFinish.then(() => {
      return { data, error };
    });
  };

  return editcode;
};

export default useEditCode;
