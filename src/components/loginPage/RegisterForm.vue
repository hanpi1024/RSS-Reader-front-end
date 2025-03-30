<template>
  <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      label-width="auto"
      class="demo-ruleForm"
  >
    <el-form-item label="Email" >
      <el-input v-model="ruleForm.email" />
    </el-form-item >
    <el-form-item label="Name" >
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="Password" >
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" @blur="handleBlur" @focus="handleFocus"/>
    </el-form-item>
    <el-form-item label="Confirm" >
      <el-input
          v-model="ruleForm.checkPass"
          type="password"
          autocomplete="off"
          required
          @blur="handleBlur"
          @focus="handleFocus"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitRegisterForm()">
        Submit
      </el-button>
      <el-button @click="resetForm()">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import {ElLoading, ElNotification} from "element-plus";
import {useUserStore} from '@/stores/useUserStore'

const emit = defineEmits(['focus','blur'])
const ruleForm = reactive({
  pass: '',
  checkPass: '',
  email:'',
  name:''
})
function submitRegisterForm()  {
  const elLoading = ElLoading.service();
  fetch('/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ action: 'register', userEmail: ruleForm.email, password: ruleForm.pass, username:ruleForm.name })
  })
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          elLoading.close(); // 关闭加载动画
          if (data.success) {
            useUserStore().setUserInfo({avatar: data.avatar, userId: data.userID, username:data.userID})
            useUserStore().setRssSource('')
            ElNotification({
              title: 'Success',
              message: '注册成功!',
              type: 'success',
            });
          } else {
            ElNotification({
              title: 'Error',
              message: '注册失败，邮箱重复',
              type: 'error',
            });
          }
        }, 1000); // 等待2秒
      })
      .catch(error => {
        setTimeout(() => {
          elLoading.close(); // 关闭加载动画
          console.error('Error:', error);
          ElNotification({
            title: 'Warning',
            message: '请求失败，请重试！',
            type: 'warning',
          });
        }, 1000); // 等待2秒
      });
}
const resetForm = () => {
  ruleForm.pass = ''
  ruleForm.checkPass = ''
  ruleForm.email = ''
  ruleForm.name = ''
}
const handleFocus = () => {
  emit('focus')
}
const handleBlur = () => {
  emit('blur')
}
</script>
