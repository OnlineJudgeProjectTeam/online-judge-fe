import request from "@/network/request";

const useRegisterSend = () => {

  const registersend = async (email: string) => {
    const { data, whenFinish, error } = request<string>({
      url: `/user/register-send?email=${email}`,
      method: "get",
    });
    return whenFinish.then(() => {
      return { data, error };
    });
  };

  return registersend;
};

export default useRegisterSend;