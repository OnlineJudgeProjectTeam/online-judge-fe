import request from "@/network/request";

const useGetRandomProblem = () => {

  const getRandomProblem = async () => {
    const { data, whenFinish, error } = request<string>({
      url: `/problem/get-random-problem`,
      method: "get",
    });
    return whenFinish.then(() => {
      return { data, error };
    });
  };

  return getRandomProblem;
};

export default useGetRandomProblem;