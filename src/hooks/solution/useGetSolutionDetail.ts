import request from "@/network/request";
import { SolutionItem } from "@/type/detail";
import { Ref, ref } from "vue";

const useGetSolutionDetail = (id: any) => {
  const data = ref({}) as Ref<SolutionItem>;
  const error = ref(undefined) as Ref<string | undefined>;
  const fetching = ref(true);

  const getSolution = async () => {
    const { data, whenFinish, fetching, error } = request<SolutionItem>({
      url: `/solution/get-solution/${id}`,
      method: "get",
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

export default useGetSolutionDetail;
