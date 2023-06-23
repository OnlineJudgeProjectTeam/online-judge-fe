import { Ref, ref } from "vue";
import request from "../../network/request";
import { RecordGate, Record, RecordInfo } from "@/type/user/index";

const useGetRecord = () => {
  const error = ref(undefined) as Ref<string | undefined>;
  const fetching = ref(true);
  const data = ref({}) as Ref<RecordInfo>;
  const whenFinish = ref(Promise.resolve());

  const getRecord = async (probleminfo: RecordGate) => {
    const { data, whenFinish, fetching, error } = request<RecordInfo>({
      url: `/submission/get-submission-list?pageNum=${probleminfo?.pageNum}&pageSize=${probleminfo?.pageSize}&navSize=${probleminfo?.navSize}&startTime=${probleminfo?.startTime}&endTime=${probleminfo?.endTime}`,
      method: "get",
      data: probleminfo,
    });
    await whenFinish;
    return { data, fetching, error, whenFinish };
  };

  const query = async (probleminfo: RecordGate) => {
    const res = await getRecord(probleminfo);
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

export default useGetRecord;
