import request from "@/network/request";

const useUpload = () => {

  const upload = async (file: any) => {
    const { data, whenFinish, error } = request<File>({
      url: "/user/upload",
      method: "post",
      data: file,
    });
    return whenFinish.then(() => {
      return { data, error };
    });
  };

  return upload;
};

export default useUpload;
