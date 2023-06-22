import request from "@/network/request";

const usedel = () => {

  const del = async (id: number) => {
    const { data, whenFinish, error } = request<number>({
      url: `/solution/delete/${id}`,
      method: "delete",
    });
    return whenFinish.then(() => {
      return { data, error };
    });
  };

  return del;
};

export default usedel;
