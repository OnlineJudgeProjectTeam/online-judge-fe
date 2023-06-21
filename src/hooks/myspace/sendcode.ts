import request from "@/network/request";

const useSendCode = () => {

  const sendcode = async (email: any) => {
    const { data, whenFinish, error } = request<String>({
      url: `/user/update-password-send?email=${email}`,
      method: "get",
    });
    return whenFinish.then(() => {
      return { data, error };
    });
  };

  return sendcode;
};

export default useSendCode;
