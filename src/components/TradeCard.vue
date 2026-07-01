<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Trade } from '@/api/trade'
import { useFavoriteStore } from '@/stores/favorite'

const props = defineProps<{
  trade: Trade
}>()

const router = useRouter()
const favoriteStore = useFavoriteStore()

const goToDetail = () => {
  router.push(`/trade/${props.trade.id}`)
}

const handleFavorite = (e: Event) => {
  e.stopPropagation()
  favoriteStore.toggleFavorite({
    type: 'trade',
    id: props.trade.id,
    title: props.trade.title,
    description: props.trade.description,
    location: props.trade.location,
  })
}

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
  <div class="trade-card" @click="goToDetail">
    <div class="trade-img" :style="{ backgroundImage: trade.image ? `url(${trade.image})` : 'none' }">
      <svg v-if="!trade.image" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
    </div>
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
        <span class="info">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          {{ trade.publisher }}
        </span>
        <span class="info">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {{ trade.location }}
        </span>
        <button class="fav-btn" :class="{ active: favoriteStore.isFavorite('trade', trade.id) }" @click="handleFavorite">
          {{ favoriteStore.isFavorite('trade', trade.id) ? '已收藏' : '收藏' }}
        </button>
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  align-items: center;
  font-size: 12px;
  color: #bbb;
  margin-top: auto;
}

.info {
  display: flex;
  align-items: center;
  gap: 3px;
}

.fav-btn {
  padding: 3px 10px;
  border-radius: 12px;
  border: 1px solid #ffb6c1;
  background: #fff;
  color: #ffb6c1;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.fav-btn:hover {
  background: #fff0f3;
}

.fav-btn.active {
  background: #ffb6c1;
  color: #fff;
  border-color: #ffb6c1;
}
</style>
