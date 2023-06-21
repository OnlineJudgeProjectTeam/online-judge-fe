import request from "@/network/request";
import { SolutionRes } from "@/type/detail";
import { Ref, ref } from "vue";

const useGetSolution = (problemId: any) => {
  const data = ref({}) as Ref<SolutionRes>;
  const error = ref(undefined) as Ref<string | undefined>;
  const fetching = ref(true);

  const getSolution = async () => {
    const { data, whenFinish, fetching, error } = request<SolutionRes>({
      url: "/solution/get-solution-list",
      data: {
        pageNum: 1,
        pageSize: 10,
        navSize: 5,
        problemId,
      },
      method: "post",
    });
    await whenFinish;
    return { data, fetching, error };
  };

  const query = async () => {
    const res = await getSolution();
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

export default useGetSolution;
