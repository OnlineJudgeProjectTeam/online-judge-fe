import { PersonRes } from "@/type/user";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

const userKey = "__OJ__user";

export const userStore = defineStore("user", () => {
  const user = ref<PersonRes>();

  const setUser = (_user: PersonRes) => {
    localStorage.setItem(userKey, JSON.stringify(_user));
    user.value = _user;
  };

  const userData = computed(() => {
    if (!user.value) {
      let data: any = localStorage.getItem(userKey);
      if (data) {
        data = JSON.parse(data);
        user.value = data;
      }
    }
    return user.value;
  });

  return { userData, setUser };
});
