import { computed, ref } from "vue";
import starImg from "@assets/images/star.png";
import fullStarImg from "@assets/images/star-yellow.png";
import request from "@/network/request";

const useFavorite = (
  _isFavorite: number,
  _favoriteNum: number,
  problemId: number
) => {
  const isFavorite = ref(_isFavorite);
  const favoriteNum = ref(_favoriteNum);

  const star = computed(() => {
    return isFavorite.value ? fullStarImg : starImg;
  });

  const favorite = () => {
    const { data, whenFinish, error } = request<string>({
      url: `/favorite/add-favorite?problemId=${problemId}`,
      method: "get",
    });
    whenFinish.then(() => {
      if (data) {
        favoriteNum.value += isFavorite.value ? -1 : 1;
        isFavorite.value = isFavorite.value ? 0 : 1;
      } else if (error) {
      }
    });
  };

  return {
    star,
    favoriteNum,
    favorite,
  };
};

export default useFavorite;
