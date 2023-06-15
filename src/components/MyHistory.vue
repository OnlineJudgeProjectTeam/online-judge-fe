<template>
  <el-calendar>
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '✔️' : '' }}
        <br>
        {{ '做题记录' }}
      </p>
    </template>
  </el-calendar>

  <div class="demo-progress">
    <el-progress :text-inside="true" :stroke-width="26" :percentage="70" />
    <el-progress
      :text-inside="true"
      :stroke-width="24"
      :percentage="100"
      status="success"
    />
    <el-progress
      :text-inside="true"
      :stroke-width="22"
      :percentage="80"
      status="warning"
    />
    <el-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="50"
      status="exception"
    />
  </div>
  
</template>

<style>
.is-selected {
  color: #1989fa;
}

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

</style>


<script setup lang="ts">

</script>