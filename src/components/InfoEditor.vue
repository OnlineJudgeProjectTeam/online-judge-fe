<template>
    <el-form :model="form" label-width="120px">

    <input type="file" ref="fileInput" @change="handleFileChange">
    <el-button @click="onUpload">上传头像</el-button>

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
import { userStore } from "../stores/login";
import { ref, reactive } from "vue";
// import { useRouter } from "vue-router";
import useUpload from "../hooks/myspace/upLoad.ts";

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
};

const update = useUpdate();
const store = userStore();

const form = reactive({
  email: store.$state.email,
  username: store.$state.username,
  name: store.$state.name,
  sex: store.$state.sex,
  school: store.$state.school,
  company: store.$state.company,
  description: store.$state.description,
  avatar: store.$state.avatar,
})

const onSubmit = () => {
  update(form).then((res: any) => {
    if (!res.error.value) {
      store.$state.name=form.name;
      store.$state.sex=form.sex;
      store.$state.school=form.school;
      store.$state.company=form.company;
      store.$state.description=form.description;
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
      store.$state.avatar=res.data.value;
      update(form);
    }
    // else{
    // }
  });
  console.log('submit!');
}
</script>

<style scoped>
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

    