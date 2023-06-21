import { Ref, ref } from "vue";
import request from "../../network/request";
import { SolutionsInfo,Page } from "@/type/selectedSolutions";

const useGetSolutionList = () => {
  const error = ref(undefined) as Ref<string | undefined>;
  const fetching = ref(true);
  const data = ref({}) as Ref<Page>;
  const whenFinish = ref(Promise.resolve());

  const getSolutionList = async (solutionsInfo: SolutionsInfo) => {
    const { data, whenFinish, fetching, error } = request<Page>({
      url: `/solution/get-solution-list`,
      method: "post",
      data:solutionsInfo,
    });
    await whenFinish;
    return { data, fetching, error, whenFinish };
  };

  const query = async (solutionsInfo: SolutionsInfo) => {
    const res = await getSolutionList(solutionsInfo);
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

export default useGetSolutionList;