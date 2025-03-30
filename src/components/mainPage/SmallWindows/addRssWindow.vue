<!-- src/components/mainPage/SmallWindows/addRssWindow.vue -->
<template>
  <el-dialog v-model="dialogFormVisible" title="评分" width="500">
    <el-form :model="form">
      <el-input v-model="form.rss_address" placeholder="请输入你的rss订阅地址" autocomplete="off"></el-input>
      <el-input v-model="form.rss_name" placeholder="请取个名字" autocomplete="off"></el-input>
      <el-tag size="small" type="success" v-if="form.categorySelected">{{ form.categorySelected }}</el-tag>
      <div>
        <el-row :gutter="20">
          <el-col :span="4" v-for="(item, index) in iconList" :key="index" @click="form.categorySelected = item.text">
            <div class="icon-text-container">
              <component :is="item.icon" size="10px"></component>
              <span>{{ item.text }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-button type="primary" plain @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" plain @click="sendData">确定</el-button>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { reactive } from "vue";
import {
  Burger,
  Camera,
  Coffee,
  Cpu,
  Film, Headset,
  Money, More, Reading,
  Ship, ShoppingBag,
  Soccer,
  VideoPlay
} from "@element-plus/icons-vue";

const  emit= defineEmits(['add-Rss']);
const sendData = () => {
  console.log(form);
  console.log('你是谁？');
  emit('add-Rss', {...form});
  form.rss_address = '';
  form.category = '';
  form.rss_name = '';
  form.categorySelected = '';
}
// 图标和对应的文字列表
const iconList = [
  { icon: Burger, text: '美食' },
  { icon: Coffee, text: '休闲' },
  { icon: ShoppingBag, text: '购物' },
  { icon: Soccer, text: '运动' },
  { icon: Cpu, text: '科技' },
  { icon: Money, text: '金融' },
  { icon: Ship, text: '旅行' },
  { icon: Camera, text: '照相' },
  { icon: VideoPlay, text: '视频' },
  { icon: Film, text: '电影' },
  { icon: Headset, text: '音乐' },
  { icon: Reading, text: '阅读' },
  { icon: More, text: '其他' }
];

// 事件处理
const dialogFormVisible = defineModel();
const form = reactive({
  rss_address: '',
  rss_name: '',
  category: '',
  categorySelected: ''
});
</script>

<style scoped>
.icon-text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon-text-container:hover {
  background-color: rgb(216.8, 235.6, 255);
}
</style>
