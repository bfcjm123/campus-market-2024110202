<script setup lang="ts">
import type { Trade } from '@/api/trade'

defineProps<{
  trade: Trade
}>()

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    open: '在售',
    closed: '已成交',
    done: '已完成',
  }
  return map[status] || status
}
</script>

<template>
  <div class="trade-card">
    <div class="trade-img" :style="{ backgroundImage: trade.image ? `url(${trade.image})` : 'none' }"></div>
    <div class="trade-body">
      <div class="trade-header">
        <h4>{{ trade.title }}</h4>
        <span class="price">¥{{ trade.price }}</span>
      </div>
      <p class="desc">{{ trade.description }}</p>
      <div class="trade-meta">
        <span class="tag">{{ trade.category }}</span>
        <span class="tag">{{ trade.condition }}</span>
        <span class="tag" :class="trade.status">{{ getStatusText(trade.status) }}</span>
      </div>
      <div class="trade-footer">
        <span class="info">{{ trade.publisher }}</span>
        <span class="info">{{ trade.location }} · {{ trade.publishTime }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trade-card {
  display: flex;
  gap: 14px;
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.trade-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.trade-img {
  width: 100px;
  height: 80px;
  border-radius: 8px;
  background: #f0f0f0;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
}

.trade-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.trade-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.trade-header h4 {
  font-size: 15px;
  color: #333;
}

.price {
  font-size: 16px;
  color: #e8689c;
  font-weight: 600;
}

.desc {
  font-size: 13px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.trade-meta {
  display: flex;
  gap: 6px;
}

.tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  background: #f0f7ff;
  color: #409eff;
}

.tag.closed,
.tag.done {
  background: #f5f5f5;
  color: #999;
}

.trade-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #bbb;
  margin-top: auto;
}
</style>
