<script setup lang="ts">
defineProps<{
  text?: string
  icon?: string
}>()
</script>

<template>
  <div class="empty-state">
    <div class="empty-icon" v-html="icon || `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='#ccc' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/><polyline points='17 8 12 3 7 8'/><line x1='12' y1='3' x2='12' y2='15'/></svg>`"></div>
    <p>{{ text || '暂无数据' }}</p>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #999;
  flex: 1;
  min-height: 300px;
}

.empty-icon {
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 14px;
}
</style>
