<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="empty-state">
    <span class="empty-icon">📭</span>
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
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 14px;
}
</style>
