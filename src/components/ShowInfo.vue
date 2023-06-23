<template>
  <!-- <br> -->
  test
  <div>{{ form }}</div>
  <!-- <div class="main">
  <br>
     <label
      class="button"
      for="file-input"
     >
      <span><el-avatar :size="120" :src="form.avatar" /></span>
    </label>
  <br>
 
  <div class="content">
  <div class="tag">用户名</div>
  <el-input v-model="form.value.username" disabled placeholder="form.username" />
  <div class="tag">邮箱</div>    
  <el-input v-model="form.email" disabled placeholder="form.email" /> 
  <div class="tag">昵称</div>    
  <el-input v-model="form.name"/> 

    <el-row :span="24" :gutter="10">
    <el-col :span="6">  
      <div class="tag">性别</div>   
    <el-select class="select" v-model="form.sex" placeholder="选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
    </el-select>
    </el-col>
    <el-col :span="18"><div class="tag">学校</div>    
  <el-input v-model="form.school"/> </el-col>
    </el-row>

  <div class="tag">公司</div>    
  <el-input v-model="form.company"/> 
  <div class="tag">个人描述</div>    
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
  </div> -->
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import usegetbyId from "../hooks/myspace/getbyId.ts";
import { useRoute } from "vue-router";
import { OtherInfo } from "@/type/user";
const { query } = useRoute();
const getbyId = usegetbyId()

getbyId(query.id as any).then((res: any) => {
//  const form = reactive<OtherInfo>(res.data.value);
const form =({
  id: res.data.value.id,
})
});


// var form = reactive({
//   id: data.id,
//   email: data.value!.email,
//   username: data.value!.username,
//   name: data.value?.name,
//   sex: data.value?.sex,
//   school: data.value?.school,
//   company: data.value?.company,
//   description: data.value?.description,
//   avatar: data.value!.avatar,
//   token: data.value!.token,
//   createdtime: data.value!.createdTime,
//   password: data.value!.password
// })

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
  margin: 2mm;
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

    