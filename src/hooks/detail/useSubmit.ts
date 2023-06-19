import request from "@/network/request";
import { SubmitRes } from "@/type/detail";

const useSubmit = () => {
  const submit = async (code: string, language: number, problemId: number) => {
    const { data, whenFinish, error } = request<SubmitRes>({
      url: "/problem/submit",
      data: {
        code,
        problemId,
        language,
      },
      method: "post",
    });

    return whenFinish.then(() => {
      return { data, error };
    });
  };

  return submit;
};

export default useSubmit;
