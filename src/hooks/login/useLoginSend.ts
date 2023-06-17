import request from "@/network/request";

const useLoginSend = () => {

  const loginsend = async (email: string) => {
    const { data, whenFinish, error } = request<string>({
      url: `/user/login-send?email=${email}`,
      method: "get",
    });
    return whenFinish.then(() => {
      return { data, error };
    });
  };

  return loginsend;
};

export default useLoginSend;