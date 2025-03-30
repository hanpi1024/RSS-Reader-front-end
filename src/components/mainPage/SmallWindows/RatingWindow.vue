<script setup>
import {reactive, ref} from "vue";
import {ElNotification} from "element-plus";
const dialogFormVisible = defineModel()
const formLabelWidth = '140px'
const form = reactive({
  rating_value:'',
  feedback:''
})
const rating_value = ref(0)
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])

function submitForm() {
  dialogFormVisible.value = false
  fetch('http://localhost:5000/rating', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ action: 'rating', rating_value: rating_value.value, feedback: form.feedback })
  })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          ElNotification({
            title: 'Success',
            message: '评分成功!',
            type: 'success',
          });
        } else {
          ElNotification({
            title: 'Error',
            message: '评分失败，请检查用户名和密码！'
        })
      }
    })
}
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="评分" width="500">
    <el-form :model="form">
      <el-form-item label="请给更多的✨小星星✨支持呀！" :label-width="formLabelWidth">
        <el-rate v-model="rating_value" :colors="colors" allow-half
        :texts="['太差了', '差', '一般', '好', '太棒了']" show-text clearable/>
      </el-form-item>
      <el-input v-model="form.feedback" placeholder="请输入意见反馈"></el-input>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button  @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" plain @click="submitForm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>