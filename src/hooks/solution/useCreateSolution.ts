import request from "@/network/request";
import { useRouter } from "vue-router";

const useCreateSolution = (problemId: any) => {
  const router = useRouter();

  interface CreateRes {
    id: number;
    userId: number;
    problemId: number;
    likes: number;
    createdTime: string;
    updateTime: string;
    language: number;
  }

  const createSolution = (content: string, language: number) => {
    const { data, whenFinish } = request<CreateRes>({
      url: "/solution/create",
      data: {
        problemId,
        content,
        language,
      },
      method: "post",
    });

    whenFinish.then(() => {
      if (data.value) {
        router.push(`/solution?id=${data.value.id}`);
      }
    });
  };

  return createSolution;
};

export default useCreateSolution;
