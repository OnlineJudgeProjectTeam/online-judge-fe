import request from "@/network/request";
import { ProblemRes } from "@/type/detail";
import { Ref, ref } from "vue";

const useGetProblem = (problemId: number, language: number) => {
  const data = ref({}) as Ref<ProblemRes>;
  const error = ref(undefined) as Ref<string | undefined>;
  const fetching = ref(true);

  const getProblem = async () => {
    const { data, whenFinish, fetching, error } = request<ProblemRes>({
      url: `/problem/get-problem-content?problemId=${problemId}&language=${language}`,
      // url: `/problem/get-problem-content?problemId=${problemId}`,
      method: "get",
    });
    await whenFinish;
    return { data, fetching, error };
  };

  const query = async () => {
    const res = await getProblem();
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

export default useGetProblem;
