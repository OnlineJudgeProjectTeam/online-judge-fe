import { ref } from "vue";
import request from "@/network/request";

const useLike = (liked: boolean, likes: number, id: number) => {
  const isLike = ref(liked);
  const likeCount = ref(likes);

  const likeHandler = () => {
    const { data, whenFinish } = request<string>({
      url: `/solution/like/${id}`,
      method: "put",
    });
    whenFinish.then(() => {
      if (data) {
        likeCount.value += isLike.value ? -1 : 1;
        isLike.value = !isLike.value;
      }
    });
  };

  return { isLike, likeCount, likeHandler };
};

export default useLike;
