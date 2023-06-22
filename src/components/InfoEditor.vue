<template>
  <!-- <br> -->
  <div class="main">
  <br>
     <label
      class="button"
      for="file-input"
     >
      <span><el-avatar :size="120" :src="form.avatar" /></span>
      <input type="file" ref="fileInput" class="file-input" id="file-input" @change="handleFileChange" />
    </label>
  <br>

  <div class="content">
  <span class="tag">用户名</span>
  <el-input v-model="form.username" disabled placeholder="form.username" />
  <span class="tag">邮箱</span>    
  <el-input v-model="form.email" disabled placeholder="form.email" /> 
  <span class="tag">昵称</span>    
  <el-input v-model="form.name"/> 

    <el-row :span="24" :gutter="10">
    <el-col :span="6">  
      <span class="tag">性别</span><br>   
    <el-select class="select" v-model="form.sex" placeholder="选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
    </el-select>
    </el-col>
    <el-col :span="18"><span class="tag">学校</span>    
  <el-input v-model="form.school"/> </el-col>
    </el-row>

  <span class="tag">公司</span>    
  <el-input v-model="form.company"/> 
  <span class="tag">个人描述</span>    
  <el-input 
      v-model="form.description" 
      rows="8" 
      type="textarea" 
      class="medium"
      maxlength="150"
      show-word-limit
      />
  <el-button class="submit" @click="onSubmit">提交</el-button><br>
  </div>
  </div>
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
  name: userData.value?.name,
  sex: userData.value?.sex,
  school: userData.value?.school,
  company: userData.value?.company,
  description: userData.value?.description,
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
    else{
      alert(res.error.value);
    }
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
      alert('上传成功！');
    }
    else{
      alert(res.error.value)
    }
  });
  console.log('submit!');
}
</script>

<style scoped>
/* input[type="file"] {
  display: none;
} */
.select{
  margin-left: 1.3mm;
}
.content{
  margin: 0 5vh;
}
.tag{
  color: dimgray;
}
.el-input{
  margin-left: 5px;
  margin-right: 5px;
}
.main{
  margin-left: 25mm;
  margin-top: 5mm;
  margin-bottom: 2mm;
  /* border-style: solid; */
  border-radius: 5px;
  /* border-color: darkgray; */
  /* box-shadow:darkgray 1px 2px 2px 2px ; */
  box-shadow: 0 0 8px rgba(0, 0, 0, .2);

}
.file-input{
  display: none;
}
.el-avatar{
  position: relative;
  left:38%;
}
.small{
width: 10cm;
}
.verysmall{
width: 6cm;
}
.medium{
margin-left: 1.3mm;
}
.submit{
  margin: 6mm;
}
</style>

    