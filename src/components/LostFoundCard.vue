<script setup lang="ts">
import type { LostFound } from '@/api/lostFound'

defineProps<{
  item: LostFound
}>()

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    open: '进行中',
    closed: '已解决',
  }
  return map[status] || status
}
</script>

<template>
  <div class="lost-found-card">
    <div class="item-badge" :class="item.type">{{ item.type === 'lost' ? '丢失' : '捡到' }}</div>
    <div class="item-body">
      <h4>{{ item.title }}</h4>
      <p class="desc">{{ item.description }}</p>
      <div class="item-meta">
        <span class="info">📍 {{ item.location }}</span>
        <span class="info">🕐 {{ item.eventTime }}</span>
      </div>
      <div class="item-footer">
        <span class="tag" :class="item.status">{{ getStatusText(item.status) }}</span>
        <span class="info">{{ item.contact }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lost-found-card {
  display: flex;
  gap: 14px;
  background: #fff;
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.lost-found-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.item-badge {
  writing-mode: vertical-lr;
  padding: 8px 6px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  flex-shrink: 0;
}

.item-badge.lost {
  background: #fff3e0;
  color: #f57c00;
}

.item-badge.found {
  background: #e8f5e9;
  color: #388e3c;
}

.item-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.item-body h4 {
  font-size: 15px;
  color: #333;
}

.desc {
  font-size: 13px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #bbb;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.tag {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 12px;
  background: #fff3e0;
  color: #f57c00;
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
