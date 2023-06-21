import { RankingInfo,RankingPage } from './../../type/ranking/index';
import { Ref, ref } from "vue";
import request from "../../network/request";

const useGetRank = () => {
  const error = ref(undefined) as Ref<string | undefined>;
  const fetching = ref(true);
  const data = ref({}) as Ref<RankingPage>;
  const whenFinish = ref(Promise.resolve());

  const getRank = async (rankinginfo: RankingInfo) => {
    const { data, whenFinish, fetching, error } = request<RankingPage>({
      url: `/user/rank?pageNum=${rankinginfo?.pageNum}&pageSize=${rankinginfo?.pageSize}&navSize=${rankinginfo?.navSize}&order=${rankinginfo.order}`,
      method: "get",
    });
    await whenFinish;
    return { data, fetching, error, whenFinish };
  };

  const query = async (rankinginfo: RankingInfo) => {
    const res = await getRank(rankinginfo);
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

export default useGetRank;
