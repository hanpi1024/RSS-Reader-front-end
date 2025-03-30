<template>
  <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      label-width="auto"
      class="demo-ruleForm"
  >
    <el-form-item label="Email">
      <el-input v-model="ruleForm.email" placeholder="请输入rss地址源" />
    </el-form-item >
    <el-form-item>
      <el-button type="primary" @click="submitLoginForm()">
        Submit
      </el-button>
    </el-form-item>
  </el-form>i
</template>

<script lang="ts" setup>
import {reactive} from 'vue'
const ruleForm = reactive({
  email:'',
})

function submitLoginForm()
{
  fetch('http://localhost:5000/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ action: 'loginPage', userEmail: ruleForm.email })
  })
}
</script>
