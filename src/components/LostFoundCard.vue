<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { LostFound } from '@/api/lostFound'

const props = defineProps<{
  item: LostFound
}>()

const router = useRouter()

const goToDetail = () => {
  router.push(`/lost-found/${props.item.id}`)
}

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    open: '进行中',
    closed: '已解决',
  }
  return map[status] || status
}
</script>

<template>
  <div class="lost-found-card" @click="goToDetail">
    <div class="item-badge" :class="item.type">
      <svg v-if="item.type === 'lost'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    </div>
    <div class="item-body">
      <h4>{{ item.title }}</h4>
      <p class="desc">{{ item.description }}</p>
      <div class="item-meta">
        <span class="info">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {{ item.location }}
        </span>
        <span class="info">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {{ item.eventTime }}
        </span>
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
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
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

.info {
  display: flex;
  align-items: center;
  gap: 3px;
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
</style>
