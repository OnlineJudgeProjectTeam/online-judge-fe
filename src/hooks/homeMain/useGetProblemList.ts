import { Ref, ref } from "vue";
import request from "../../network/request";

const useGetProblemList = () => {
  const error = ref(undefined) as Ref<string | undefined>;
  const fetching = ref(true);
  const data = ref({}) as Ref<PageInfo>;
  const whenFinish = ref(Promise.resolve());

  const getProblemList = async (probleminfo: ProblemInfo) => {
    const { data, whenFinish, fetching, error } = request<PageInfo>({
      url: `/problem/get-problem-list?pageNum=${probleminfo?.pageNum}&pageSize=${probleminfo?.pageSize}&navSize=${probleminfo?.navSize}&name=${probleminfo?.name}&tags=${probleminfo?.tags}&difficulty=${probleminfo?.difficulty}`,
      method: "get",
      data: probleminfo,
    });
    await whenFinish;
    return { data, fetching, error, whenFinish };
  };

  const query = async (probleminfo: ProblemInfo) => {
    const res = await getProblemList(probleminfo);
    if (res.error.value) {
      error.value = res.error.value;
    } else {
      data.value = res.data.value!;
    }
    fetching.value = false;
    whenFinish.value = res.whenFinish;
    return whenFinish.value;
  };

  return { data, fetching, error, whenFinish, query };
};

export default useGetProblemList;
