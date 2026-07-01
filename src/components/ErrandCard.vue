<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Errand } from '@/api/errand'
import { useFavoriteStore } from '@/stores/favorite'

const props = defineProps<{
  item: Errand
}>()

const router = useRouter()
const favoriteStore = useFavoriteStore()

const goToDetail = () => {
  router.push(`/errand/${props.item.id}`)
}

const handleFavorite = (e: Event) => {
  e.stopPropagation()
  favoriteStore.toggleFavorite({
    type: 'errand',
    id: props.item.id,
    title: props.item.title,
    description: props.item.description,
    location: props.item.from,
  })
}

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
  <div class="errand-card" @click="goToDetail">
    <div class="errand-header">
      <h4>{{ item.title }}</h4>
      <span class="reward">¥{{ item.reward }}</span>
    </div>
    <p class="desc">{{ item.description }}</p>
    <div class="errand-route">
      <span class="route-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        {{ item.from }}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ddd" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      <span class="route-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        {{ item.to }}
      </span>
    </div>
    <div class="errand-footer">
      <span class="tag">{{ item.taskType }}</span>
      <span class="tag" :class="item.status">{{ getStatusText(item.status) }}</span>
      <span class="info">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        {{ item.deadline }}
      </span>
      <button class="fav-btn" :class="{ active: favoriteStore.isFavorite('errand', item.id) }" @click="handleFavorite">
        {{ favoriteStore.isFavorite('errand', item.id) ? '已收藏' : '收藏' }}
      </button>
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
  display: flex;
  align-items: center;
  gap: 3px;
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
