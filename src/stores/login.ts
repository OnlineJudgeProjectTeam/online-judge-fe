import { PersonRes } from '@/type/user';
import { defineStore } from "pinia";
import { ref } from 'vue';



export const userStore = defineStore("user", () => {
  const user = ref<PersonRes>();
  
  
  return user
})



// state: () =>{
  //     return{
  //       user:ref<PersonRes>()
  //     }
  //   },
    
  //   persist:{
  //   enabled:true,
  //   strategies: [
  //     {
  //       key: 'user',
  //       storage: localStorage,
  //     }
  //   ]
  // }
  