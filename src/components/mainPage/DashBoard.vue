<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.76 226.69">
      <path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/>
      <path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/>
    </svg>
    <el-button type="primary" plain @click="changeWidth" style="margin-left: 10px">
      <el-icon v-if="isCollapse"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </el-button>
    <el-icon @click="handleAll"><Grid /></el-icon>
    <el-menu
        id="menu"
        default-active=""
        class="el-menu-vertical"
        :collapse="isCollapse"
    >
    <el-sub-menu v-for="category in fullCategories" :key="category.id" :index="String(category.id)" >
        <template #title>
          <el-icon @click = "handleClick(String(category.id))"><component :is="category.icon" /></el-icon>
          <span>{{category.text}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="item in category.items" :key="item.id" :index="item.id">
            {{ item.title }}
            <el-button type="text" @click.stop.prevent="deleteItem(item, category.id)" style="float: right; margin-left: 20px;">
              <el-icon><Delete /></el-icon>
            </el-button>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-button-group style="margin-left: 10px">
        <el-button @click="showAddRssWindow = true"><el-icon><Plus /></el-icon></el-button>
      </el-button-group>
    </el-menu>
  </div>
  <add-rss-window @add-rss="handleAddRss" v-model="showAddRssWindow"/>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import {Expand, Fold, Plus, Delete, Grid} from '@element-plus/icons-vue'
import AddRssWindow from "@/components/mainPage/SmallWindows/addRssWindow.vue";
import { useCategoryStore ,STATIC_CATEGORIES} from "@/stores/useCategoryStore"
import {useUserStore} from "@/stores/useUserStore";

const userStore = useUserStore();
const userId = userStore.userId;
const categoryStore = useCategoryStore();
const emit = defineEmits(['categorySelected', 'ifAll']);
const showAddRssWindow = ref(false);
const isCollapse = ref(true);
const fullCategories = computed(()=>categoryStore.fullCategories)

const handleAll = () => {
  emit('ifAll','all');
};
const handleAddRss = (formData: { categorySelected: string, rss_name: string, rss_address: string }) => {
  console.log(formData);
  const newText = formData.categorySelected;
  const newName = formData.rss_name;
  const newAddress = formData.rss_address;
  const categoryId = STATIC_CATEGORIES.find(category => category.text === newText)?.id;
  console.log(categoryId);
  // 这里要先交给后端，后端返回数据才能处理生成卡片
  if (categoryId) {
    const newItem = {
      // id: Date.now().toString(), // 使用时间戳作为唯一ID
      // text: newName,
      // address: newAddress
      title: "星巴克",
      comments: "星巴克，美妙又beans",
      imageSrc: "/images/starbucks.jpg",
      cardLink: "/food/3"
    };
    categoryStore.addItem(categoryId, newItem);
  }
};

const deleteItem = (item: any, categoryId: any) => {
  console.log(item);
  console.log(categoryId);
  categoryStore.removeItem(categoryId, item);
  console.log(fullCategories);
};

const changeWidth = () => {
  isCollapse.value = !isCollapse.value;
};

const handleClick = (key: string) => {
  console.log(key);
  console.log('被选择的列');
  emit('categorySelected', key);
};
</script>

<style>
.el-menu-vertical {
  width: 180px;
  min-height: 600px;
}
.el-menu--collapse {
  width: 80px;
  min-height: 700px;
}
</style>
