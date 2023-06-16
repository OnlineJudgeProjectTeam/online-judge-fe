import { PersonRes } from '@/type/user';
import { defineStore } from "pinia";
import { ref } from 'vue';

export const userStore = defineStore("user", () => {
  const user = ref<PersonRes>();
  
  return user
})