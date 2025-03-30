<script setup>
import { ref, watch } from 'vue'
import { useToggle, useDark } from '@vueuse/core'
import { MoonNight, Sunrise } from "@element-plus/icons-vue"

// 对话框显示控制
const dialogFormVisible = defineModel()

const isDark = useDark()
const toggleDark = useToggle(isDark)

// 同步开关状态（根据暗黑模式初始状态设置）
const light_dark = ref(!isDark.value)

// 监听开关变化
watch(light_dark, (newVal) => {
  toggleDark(!newVal) // 开关状态与暗黑模式相反
})

// 监听暗黑模式变化同步开关状态
watch(isDark, (newVal) => {
  light_dark.value = !newVal
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="设置" width="500">
    <el-switch v-model="light_dark"
        :active-icon="Sunrise"
        active-text="白天模式"
        :inactive-icon="MoonNight"
        inactive-text="黑夜模式"
    />
  </el-dialog>
</template>