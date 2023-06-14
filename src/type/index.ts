import { Ref } from "vue";

export interface Res<T> {
  data: Ref<T | undefined>;
  fetching: Ref<boolean>;
  whenFinish: Promise<void>;
}
