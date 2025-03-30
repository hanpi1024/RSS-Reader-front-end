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
      <el-input v-model="ruleForm.email" />
    </el-form-item >
    <el-form-item label="Password" >
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" @blur="handleBlur()" @focus="handleFocus()" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitLoginForm()">
        Submit
      </el-button>
      <el-button @click="resetForm()">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {reactive} from 'vue'
import {ElLoading, ElNotification} from "element-plus";
import {useUserStore} from '@/stores/useUserStore'
const emit = defineEmits(['focus', 'blur'])
const ruleForm = reactive({
  pass: '',
  email:'',
})

function submitLoginForm()
{
  const elLoading = ElLoading.service();

  fetch('http://localhost:5000/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ action: 'login', userEmail: ruleForm.email, password: ruleForm.pass })
  })
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          elLoading.close(); // 关闭加载动画
          if (data.success) {
            useUserStore().setUserInfo({avatar: data.avatar, userId: data.userID, username:data.userName})
            useUserStore().setRssSource(data.rssSource)
            ElNotification({
              title: 'Success',
              message: '登录成功!',
              type: 'success',
            });
          } else {
            ElNotification({
              title: 'Error',
              message: '验证失败，请检查用户名和密码！',
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
  ruleForm.email = ''
  ruleForm.pass = ''
}
const handleFocus = () => {
  emit('focus')
}

const handleBlur = () => {
  emit('blur')
}
</script>
