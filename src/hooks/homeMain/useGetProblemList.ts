import request from "../../network/request";

const useGetProblemList = () => {

  const getProblemList = async (probleminfo: ProblemInfo) => {
    const { data, whenFinish, error } = request<PageInfo>({
      url: `/problem/get-problem-list?pageNum=${probleminfo?.pageNum}&pageSize=${probleminfo?.pageSize}
      &navSize=?${probleminfo?.navSize}&name=${probleminfo?.name}&tags=${probleminfo?.tags}&difficulty=${probleminfo?.difficulty}`,
      method: "get",
      data: probleminfo,
    });
    return whenFinish.then(() => {
      return { data, error };
    });
  };

  return getProblemList;
};

export default useGetProblemList;