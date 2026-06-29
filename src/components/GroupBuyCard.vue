<script setup lang="ts">
import type { GroupBuy } from '@/api/groupBuy'

defineProps<{
  item: GroupBuy
}>()

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    open: '招募中',
    closed: '已截止',
  }
  return map[status] || status
}
</script>

<template>
  <div class="group-buy-card">
    <div class="group-header">
      <h4>{{ item.title }}</h4>
      <span class="group-tag">{{ item.type }}</span>
    </div>
    <p class="desc">{{ item.description }}</p>
    <div class="group-progress">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${(item.currentCount / item.targetCount) * 100}%` }"></div>
      </div>
      <span class="progress-text">{{ item.currentCount }}/{{ item.targetCount }}人</span>
    </div>
    <div class="group-footer">
      <span class="tag" :class="item.status">{{ getStatusText(item.status) }}</span>
      <span class="info">{{ item.location }} · {{ item.deadline }}</span>
    </div>
  </div>
</template>

<style scoped>
.group-buy-card {
  background: #fff;
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.group-buy-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.group-header h4 {
  font-size: 15px;
  color: #333;
}

.group-tag {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 12px;
  background: #e8f5e9;
  color: #388e3c;
}

.desc {
  font-size: 13px;
  color: #999;
  margin-bottom: 10px;
}

.group-progress {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffb6c1, #ff9aaf);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 13px;
  color: #e8689c;
  font-weight: 500;
  min-width: 60px;
  text-align: right;
}

.group-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 12px;
  background: #e3f2fd;
  color: #1976d2;
}

.tag.closed {
  background: #f5f5f5;
  color: #999;
}

.info {
  font-size: 12px;
  color: #bbb;
}
</style>
