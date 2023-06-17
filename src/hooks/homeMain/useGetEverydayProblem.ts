import { Ref, ref } from "vue";
import request from "../../network/request";

const useGetEverydayProblem = () => {
  const errorEvery = ref(undefined) as Ref<string | undefined>;
  const fetchingEvery = ref(true);

  const getEverydayProblem = async () => {
    const { data, whenFinish, fetching,error } = request<ProblemRes>({
      url: `/submission/get-total-ac-rate`,
      method: "get",
    });
    await whenFinish;
    return { data, fetching,error };
  };

  const dataEvery = ref({}) as Ref<ProblemRes>;

  const query = async () => {
    const res = await getEverydayProblem();
    if (res.error.value) {
      errorEvery.value = res.error.value;
    } else {
      dataEvery.value = res.data.value!;
    }
    fetchingEvery.value = false;
  };

  query();

  return { dataEvery, fetchingEvery, errorEvery };

};

export default useGetEverydayProblem;