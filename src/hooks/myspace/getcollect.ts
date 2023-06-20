import { Ref, ref } from "vue";
import request from "../../network/request";

const useGetCollect = () => {
  const error = ref(undefined) as Ref<string | undefined>;
  const fetching = ref(true);
  const data = ref({}) as Ref<PageInfo>;
  const whenFinish = ref(Promise.resolve());

  const getCollect = async (probleminfo: ProblemInfo) => {
    const { data, whenFinish, fetching, error } = request<PageInfo>({
      url: `/favorite/get-favorite-list?pageNum=${probleminfo?.pageNum}&pageSize=${probleminfo?.pageSize}&navSize=${probleminfo?.navSize}`,
      method: "get",
      data: probleminfo,
    });
    await whenFinish;
    return { data, fetching, error, whenFinish };
  };

  const query = async (probleminfo: ProblemInfo) => {
    const res = await getCollect(probleminfo);
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

export default useGetCollect;
