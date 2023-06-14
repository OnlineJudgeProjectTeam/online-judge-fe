import { Token } from "@/type/user";
import { getToken } from "@/utils/token";
import axios, { AxiosRequestConfig } from "axios";
import { Ref, ref } from "vue";

const baseURL = "";

const requestSet = new Set<string>();

function request<T>(config: AxiosRequestConfig) {
  const key =
    JSON.stringify(config.data) + config.url! + JSON.stringify(config.params);

  const data = ref(undefined) as Ref<T | undefined>;
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
          const { data: _data } = res;
          data.value = _data;
        })
        .catch((err) => {
          console.log(err);
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
  };
}

export default request;
