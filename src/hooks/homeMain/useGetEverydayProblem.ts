import { Ref, ref } from "vue";
import request from "../../network/request";

const useGetEverydayProblem = () => {
  const errorEvery = ref(undefined) as Ref<string | undefined>;
  const fetchingEvery = ref(true);
  const whenFinishEvery = ref(Promise.resolve());

  const getEverydayProblem = async () => {
    const { data, whenFinish, fetching,error } = request<ProblemRes>({
      url: `/everyday-problem/get-everyday-problem`,
      method: "get",
    });
    await whenFinish;
    return { data, fetching,error,whenFinish };
  };

  const dataEvery = ref({}) as Ref<ProblemRes>;

  const queryEvery = async () => {
    const res = await getEverydayProblem();
    if (res.error.value) {
      errorEvery.value = res.error.value;
    } else {
      dataEvery.value = res.data.value!;
    }
    fetchingEvery.value = false;
    whenFinishEvery.value = res.whenFinish;
    return whenFinishEvery.value;
  };


  return { dataEvery, fetchingEvery, errorEvery,queryEvery};

};

export default useGetEverydayProblem;