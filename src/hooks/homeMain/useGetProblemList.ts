import { Ref, ref } from "vue";
import request from "../../network/request";

const useGetProblemList = (probleminfo: ProblemInfo) => {
  const error = ref(undefined) as Ref<string | undefined>;
  const fetching = ref(true);

  const getProblemList = async () => {
    const { data, whenFinish, fetching,error } = request<PageInfo>({
      url: `/problem/get-problem-list?pageNum=${probleminfo?.pageNum}&pageSize=${probleminfo?.pageSize}&navSize=${probleminfo?.navSize}&name=${probleminfo?.name}&tags=${probleminfo?.tags}&difficulty=${probleminfo?.difficulty}`,
      method: "get",
      data: probleminfo,
    });
    await whenFinish;
    return { data, fetching,error };
  };

  const data = ref({}) as Ref<PageInfo>;

  const query = async () => {
    const res = await getProblemList();
    if (res.error.value) {
      error.value = res.error.value;
    } else {
      data.value = res.data.value!;
    }
    fetching.value = false;
  };

  query();

  return { data, fetching, error };

};

export default useGetProblemList;