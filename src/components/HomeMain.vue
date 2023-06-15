<script lang="ts" setup>
  import { ref } from 'vue';

  const isShowc = ref<boolean>()
  async function displayc() {
    isShowc.value = !isShowc.value
  }
  const isShowd = ref<boolean>()
  async function displayd() {
    isShowd.value = !isShowd.value
  }
  

</script>

<template>
  <div class="container">
    <div class="choose">
      <div class="submit">
        <div class="search">
          <input type="text" placeholder="请输入题目名称">
          <div class="btn">
            <img src="../assets/images/search.png" alt="搜索">
          </div>
        </div>
          <div class="classify" @click="displayc">
            <div class="text">
              分类
              <a class="choice" :class="{hide: isShowc === false}">123</a>
              <a class="choice" :class="{hide: isShowc === false}">234</a>
              <a class="choice" :class="{hide: isShowc === false}">345</a>
            </div>
            <div class="btn" >
              <img src="../assets/images/down.png" alt="">
            </div>
          </div>
          <div class="degree" @click="displayd">
            <div class="text">
              难度
              <a class="choice" :class="{hide: isShowd === false}">1</a>
              <a class="choice" :class="{hide: isShowd === false}">2</a>
              <a class="choice" :class="{hide: isShowd === false}">3</a>
            </div>
            <div class="btn" >
              <img src="../assets/images/down.png" alt="">
            </div>
          </div>
      </div>
      <div class="random">
      随机一题
      </div>
    </div>
    <div class="title">
      
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container{
  margin: 0 auto;
  width: 75%;
  height: 92vh;
}
.choose{
  display: flex;
  height: 5vh;
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom:1px solid black;
}
.submit{
  display: flex;
}
input{
  outline: none;
  border: none;
}
.search{
  display: flex;
  margin-bottom: 10px;
  margin-left: 10px;
  border:1px solid black;
}
.classify{
  display: flex;
  margin-left: 60px;
  margin-right: 30px;
  margin-bottom: 10px;
  border:1px solid black;
  &:hover{
    background-color: rgb(247, 247,247);
  }
  .btn{
    margin-left: 10px;
  }
}
.degree{
  display: flex;
  margin-left: 30px;
  margin-bottom: 10px;
  border:1px solid black;
  &:hover{
    background-color: rgb(247, 247,247);
  }
  .btn{
    margin-left: 10px;
  }
}
.text{
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.choice{
    margin-top: 10px;
    text-align: center;
}
.hide{
  display: none;
}

.random{
  color: greenyellow;
  cursor: pointer;
  margin-left: auto;
  margin-right: 10px;
}
.btn{
  margin-top: 3px;
  margin-right: 3px;
}
img{
  height: 18px;
  width: 18px;
}
</style>