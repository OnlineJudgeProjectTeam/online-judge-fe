import request from "@/network/request";

const useChangeFavorite = () => {

  const changeFavorite = async (id:number) => {
    const { data, whenFinish, error } = request<string>({
      url: `/favorite/add-favorite?problemId=${id}`,
      method: "get",
    });
    return whenFinish.then(() => {
      return { data, error };
    });
  };

  return changeFavorite;
};

export default useChangeFavorite;