<script setup>
import {Edit, Orange, Search, Setting, Star, SwitchButton, User} from "@element-plus/icons-vue";
import {ref} from "vue";
import RatingWindow from "@/components/mainPage/SmallWindows/RatingWindow.vue";
import EditWindow from "@/components/mainPage/SmallWindows/EditWindow.vue";
import InfoWindows from "@/components/mainPage/SmallWindows/InfoWindows.vue";
import ExitWindow from "@/components/mainPage/SmallWindows/ExitWindow.vue";
import SettingWindow from "@/components/mainPage/SmallWindows/SettingWindow.vue";
import HelpWindow from "@/components/mainPage/SmallWindows/HelpWindow.vue";
import {useUserStore} from "@/stores/useUserStore.js"
import {useCategoryStore} from "@/stores/useCategoryStore.js";
import {storeToRefs} from "pinia";

const showRatingWindow = ref(false)
const showEditWindow = ref(false)
const showInfoWindow = ref(false)
const showExitWindow = ref(false)
const showSettingWindow = ref(false)
const showHelpWindow = ref(false)
const input = ref('')
const userStore = useUserStore()
const categoryStore = useCategoryStore()
const { userItems } = storeToRefs(categoryStore)
const emit = defineEmits(['search']); // 定义向父组件传递的事件

const getAllItems = () => {
  return Object.entries(userItems.value).flatMap(([categoryId, items]) =>
      items.map(item => ({ ...item, categoryId }))
  );
};

// 搜索逻辑（复用给建议列表和回车事件）
const performSearch = (query) => {
  if (!query) return [];
  const searchText = query.toLowerCase();
  return getAllItems().filter(item =>
      item.title.toLowerCase().includes(searchText) ||
      item.comments.toLowerCase().includes(searchText)
  );
};

// 自动建议搜索
const querySearch = (queryString, cb) => {
  const results = performSearch(queryString);
  cb(results.map(item => ({ ...item, value: item.title })));
};

// 回车事件处理
const handleEnter = () => {
  const results = performSearch(input.value);
  if (results.length > 0) {
    // 去重并传递所有匹配的 categoryId
    const categoryIds = [...new Set(results.map(item => item.categoryId))];
    console.log(categoryIds);
    emit('search', categoryIds);
  }
};
</script>

<template>
  <div class="header-container">
    <div class="left-section"></div>
    <el-autocomplete
        v-model="input"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        clearable
        :prefix-icon="Search"
        class="inline-input w-50"
        placeholder="Please Input"
        @keyup.enter.native="handleEnter"
    />
    <div class="right-section">
      <img :src="userStore.avatar" alt="" style="width: 50px; height: 50px; border-radius: 50%;" >
      <el-text class>{{userStore.username}}</el-text>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right" size="25px">
            <Menu />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item><el-text @click="showInfoWindow = true"><el-icon><User /></el-icon>主页</el-text></el-dropdown-item>
            <el-dropdown-item><el-text @click="showRatingWindow = true"><el-icon><Star /></el-icon>评分</el-text></el-dropdown-item>
            <el-dropdown-item><el-text @click="showEditWindow = true"><el-icon><Edit /></el-icon>编辑</el-text></el-dropdown-item>
            <el-dropdown-item><el-text @click="showSettingWindow = true"><el-icon><Setting /></el-icon>设置</el-text></el-dropdown-item>
            <el-dropdown-item><el-text @click="showHelpWindow = true"><el-icon><Orange /></el-icon>帮助</el-text></el-dropdown-item>
            <el-dropdown-item divided><el-text @click="showExitWindow = true"><el-icon><SwitchButton /></el-icon>退出</el-text></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <RatingWindow v-model="showRatingWindow" />
  <EditWindow v-model="showEditWindow"/>
  <InfoWindows v-model="showInfoWindow" />
  <ExitWindow v-model="showExitWindow"/>
  <SettingWindow v-model="showSettingWindow"/>
  <HelpWindow v-model="showHelpWindow" />
</template>

<style scoped>.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 新增 */
}

.right-section {
  display: flex;
  align-items: center;
}
</style>
