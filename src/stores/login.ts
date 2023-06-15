import { Person } from '@/type/user';
import { defineStore } from "pinia";
import { ref } from 'vue';

export const userStore = defineStore("user", () => {
  const user = ref<Person>();
  
  return user
})