import { Ref, ref } from "vue";
import request from "../../network/request";

const useGetTotalAcRate = () => {
  const errorAc = ref(undefined) as Ref<string | undefined>;
  const fetchingAc = ref(true);

  const getTotalAcRate = async () => {
    const { data, whenFinish, fetching,error } = request<AcDataRes>({
      url: `/everyday-problem/get-everyday-problem`,
      method: "get",
    });
    await whenFinish;
    return { data, fetching,error };
  };

  const dataAc = ref({}) as Ref<AcDataRes>;

  const query = async () => {
    const res = await getTotalAcRate();
    if (res.error.value) {
      errorAc.value = res.error.value;
    } else {
      dataAc.value = res.data.value!;
    }
    fetchingAc.value = false;
  };

  query();

  return { dataAc, fetchingAc, errorAc };

};

export default useGetTotalAcRate;