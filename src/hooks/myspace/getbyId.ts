import request from "@/network/request";
import { OtherInfo } from "@/type/user";

const usegetbyId = () => {

  const getbyId = async (id: number) => {
    const { data, whenFinish, error } = request<OtherInfo>({
      url: `/user/u/${id}`,
      method: "get",
    });
    return whenFinish.then(() => {
      return { data, error };
    });
  };

  return getbyId;
};

export default usegetbyId;
