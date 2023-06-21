<script lang="ts" setup>
import Header from "@/components/Header.vue";
import SolutionDetail from "@/components/solution/SolutionDetail.vue";
</script>

<template>
  <div class="solution">
    <Header></Header>
    <div class="container">
      <SolutionDetail></SolutionDetail>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.solution {
  min-height: 100vh;
  background-color: #f6f6f6;

  .container {
    position: relative;
    margin: 12px 15vw;
    margin-bottom: 0;
  }
}
</style>
