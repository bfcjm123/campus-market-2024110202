<script setup lang="ts">
import type { Errand } from '@/api/errand'

defineProps<{
  item: Errand
}>()

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    open: '待接单',
    closed: '进行中',
    done: '已完成',
  }
  return map[status] || status
}
</script>

<template>
  <div class="errand-card">
    <div class="errand-header">
      <h4>{{ item.title }}</h4>
      <span class="reward">¥{{ item.reward }}</span>
    </div>
    <p class="desc">{{ item.description }}</p>
    <div class="errand-route">
      <span class="route-item">📍 {{ item.from }}</span>
      <span class="route-arrow">→</span>
      <span class="route-item">📍 {{ item.to }}</span>
    </div>
    <div class="errand-footer">
      <span class="tag">{{ item.taskType }}</span>
      <span class="tag" :class="item.status">{{ getStatusText(item.status) }}</span>
      <span class="info">截止: {{ item.deadline }}</span>
    </div>
  </div>
</template>

<style scoped>
.errand-card {
  background: #fff;
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.errand-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.errand-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.errand-header h4 {
  font-size: 15px;
  color: #333;
}

.reward {
  font-size: 16px;
  color: #e8689c;
  font-weight: 600;
}

.desc {
  font-size: 13px;
  color: #999;
  margin-bottom: 10px;
}

.errand-route {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #666;
}

.route-item {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.route-arrow {
  color: #ddd;
  flex-shrink: 0;
}

.errand-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 12px;
  background: #f0f7ff;
  color: #409eff;
}

.tag.closed {
  background: #e3f2fd;
  color: #1976d2;
}

.tag.done {
  background: #f5f5f5;
  color: #999;
}

.info {
  font-size: 12px;
  color: #bbb;
}
</style>
