import request from "@/network/request";

const usePutLike = () => {

  const putLike = async (id:number) => {
    const { data, whenFinish, error } = request<string>({
      url: `/solution/like/${id}`,
      method: "put",
    });
    return whenFinish.then(() => {
      return { data, error };
    });
  };

  return putLike;
};

export default usePutLike;