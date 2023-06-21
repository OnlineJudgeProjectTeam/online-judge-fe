import request from "@/network/request";
import { userStore } from "@/stores/login";
import { SubmitListRes } from "@/type/detail";
import { storeToRefs } from "pinia";
import { Ref, ref } from "vue";

const useGetSubmitList = (problemId: any) => {
  const data = ref({}) as Ref<SubmitListRes>;
  const error = ref(undefined) as Ref<string | undefined>;
  const fetching = ref(true);

  const getSubmitList = async (
    page: number = 1,
    language: number = -1,
    status: number = -1
  ) => {
    const store = userStore();
    const { userData } = storeToRefs(store);

    const { data, whenFinish, fetching, error } = request<SubmitListRes>({
      url: `/submission/get-submission-list?userId=${
        userData.value!.id
      }&pageNum=${page}&pageSize=${20}&navSize=${5}&problemId=${problemId}${
        language !== -1 ? `&language=${language}` : ""
      }${status !== -1 ? `&pass=${status}` : ""}`,
      method: "get",
    });
    await whenFinish;
    return { data, fetching, error };
  };

  const query = async () => {
    const res = await getSubmitList();
    if (res.error.value) {
      error.value = res.error.value;
    } else {
      data.value = res.data.value!;
    }
    fetching.value = false;
  };

  const requery = async (
    language: number,
    status: number = 0,
    page: number = 1
  ) => {
    const res = await getSubmitList(page, language, status);
    if (res.error.value) {
      error.value = res.error.value;
    } else {
      data.value = res.data.value!;
    }
    fetching.value = false;
  };

  query();

  return { data, fetching, error, requery };
};

export default useGetSubmitList;
