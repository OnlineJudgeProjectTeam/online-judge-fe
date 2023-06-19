import { Token } from "@/type/user";
import { clearToken, getToken } from "@/utils/token";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Ref, ref } from "vue";

const baseURL = "http://www.diandianjun.com.cn:8070";
// /api

const requestSet = new Set<string>();

function request<T>(config: AxiosRequestConfig) {
  const key =
    JSON.stringify(config.data) + config.url! + JSON.stringify(config.params);

  const data = ref(undefined) as Ref<T | undefined>;
  const error = ref(undefined) as Ref<string | undefined>;
  const fetching = ref(true);
  let whenFinish = Promise.resolve();

  if (requestSet.has(key)) {
  } else {
    const instance = axios.create({
      baseURL,
      timeout: 60000,
    });

    instance.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token && typeof token !== "string") {
          config.headers.Authorization = `${(token as Token).value}`;
        }
        return config;
      },
      (err) => {
        console.error(err);
        return err;
      }
    );

    whenFinish = new Promise<void>((resolve) => {
      instance(config)
        .then((res) => {
          console.log(res);
          const { data: _data, msg } = res.data;
          if (msg) throw new Error(msg);
          data.value = _data;
        })
        .catch((err) => {
          console.error(err);
          let errStr = "";
          if ((err as AxiosError).response) {
            if (err.response.status === 401) {
              clearToken();
              errStr = "no login";
            } else errStr = err.message;
          } else if ((err as Error) instanceof Error) {
            errStr = err.message;
          } else if (typeof err === "string") {
            errStr = err;
          } else {
            errStr = "unknown error";
          }
          error.value = errStr;
        })
        .finally(() => {
          fetching.value = false;
          resolve();
        });
    });

    whenFinish.then(() => {
      requestSet.delete(key);
    });
  }
  return {
    fetching,
    data,
    whenFinish,
    error,
  };
}

export default request;
