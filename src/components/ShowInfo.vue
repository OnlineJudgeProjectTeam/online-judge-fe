<template>
  <br>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">          
     <label
      class="button"
      for="file-input"
     >
      <span><el-avatar :size="120" :src="form.avatar" /></span>
    </label>
      </el-aside>
      <el-main>
        <br><br>
      </el-main>
    </el-container>
  </div>
  <br>
    <el-form :model="form" label-width="120px">
    <el-form-item label="用户名" class="small">
      <el-input v-model="form.username" disabled placeholder="form.username" />    
    </el-form-item>

    <el-form-item label="邮箱" class="small">
      <el-input v-model="form.email" disabled placeholder="form.email" />    
    </el-form-item>

    <el-form-item label="昵称" class="small">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="性别" class="verysmall">
      <el-select v-model="form.sex" class="m-2" placeholder="选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
      </el-select>
    </el-form-item>
    
    <el-form-item label="学校">
      <el-input v-model="form.school" class="medium" />
    </el-form-item>
    <el-form-item label="公司">
      <el-input v-model="form.company" class="medium"/>
    </el-form-item>
    <el-form-item label="个人描述">
      <el-input v-model="form.description" rows="6" type="textarea" class="medium"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
// import { School } from '@element-plus/icons-vue';
import useUpdate from "../hooks/myspace/useInfoed.ts";
import { ref,reactive } from "vue";
import { storeToRefs } from "pinia";
// import { useRouter } from "vue-router";
import useUpload from "../hooks/myspace/upLoad.ts";
import { userStore } from "../stores/login";

const store = userStore();
const { userData } = storeToRefs(store);

const options = [
  {
    value: 0,
    label: '女',
  },
  {
    value: 1,
    label: '男',
  },
]

const selectedFile = ref<File | null>(null);
const upload = useUpload();

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  selectedFile.value = file || null;
  onUpload();
};

const update = useUpdate();

const form = reactive({
  id: userData.value!.id,
  email: userData.value!.email,
  username: userData.value!.username,
  name: userData.value!.name,
  sex: userData.value!.sex,
  school: userData.value!.school,
  company: userData.value!.company,
  description: userData.value!.description,
  avatar: userData.value!.avatar,
  token: userData.value!.token,
  createdtime: userData.value!.createdTime,
  password: userData.value!.password
})


const onSubmit = () => {
  update(form).then((res: any) => {
    if (!res.error.value) {
      // userData.value!.name=form.name;
      // userData.value!.sex=form.sex;
      // userData.value!.school=form.school;
      // userData.value!.company=form.company;
      // userData.value!.description=form.description;
      store.setUser(form);
      alert('提交成功！');
    }
    // else{
    // }
  });
  console.log('submit!');
}

const onUpload = () => {
    const image = selectedFile.value;
    let formData = new FormData();
    if(image){
      formData.append('image',image);
    }
    else{
      alert("请先选择文件");
      return;
    }
    upload(formData).then((res: any) => {
    if (!res.error.value) {
      form.avatar=res.data.value;
      store.setUser(form);
      update(form);
    }
    // else{
    // }
  });
  console.log('submit!');
}
</script>

<style scoped>
/* input[type="file"] {
  display: none;
} */
.file-input{
  display: none;
}
.el-avatar{
  position: relative;
  left:25%;
}
.small{
width: 10cm;
}
.verysmall{
width: 6cm;
}
.medium{
width: 15cm;
}
</style>

    