<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getLostFounds, type LostFound } from '@/api/lostFound'
import LostFoundCard from '@/components/LostFoundCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const items = ref<LostFound[]>([])
const activeTab = ref('all')
const pageSize = 3
const displayCount = ref(pageSize)

onMounted(async () => {
  try {
    items.value = await getLostFounds()
  } catch (error) {
    console.error('获取失物招领列表失败:', error)
    items.value = []
  }
})

const filteredItems = computed(() => {
  if (activeTab.value === 'all') return items.value
  return items.value.filter(item => item.type === activeTab.value)
})

const displayedItems = computed(() => {
  return filteredItems.value.slice(0, displayCount.value)
})

const hasMore = computed(() => {
  return displayCount.value < filteredItems.value.length
})

const loadMore = () => {
  displayCount.value += pageSize
}
</script>

<template>
  <div class="lost-found-view">
    <h2>失物招领</h2>

    <div class="tab-bar">
      <span class="tab" :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">全部</span>
      <span class="tab" :class="{ active: activeTab === 'lost' }" @click="activeTab = 'lost'">丢失物品</span>
      <span class="tab" :class="{ active: activeTab === 'found' }" @click="activeTab = 'found'">捡到物品</span>
    </div>

    <div v-if="filteredItems.length > 0">
      <div class="item-list">
        <LostFoundCard v-for="item in displayedItems" :key="item.id" :item="item" />
      </div>
      <div v-if="hasMore" class="load-more" @click="loadMore">加载更多</div>
    </div>
    <EmptyState v-else text="暂无失物招领信息" />
  </div>
</template>

<style scoped>
.lost-found-view {
  padding: 0;
  display: flex;
  flex-direction: column;
}

h2 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
}

.tab-bar {
  display: flex;
  gap: 0;
  margin-bottom: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.tab.active {
  background: #ffb6c1;
  color: #fff;
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.load-more {
  text-align: center;
  padding: 14px;
  color: #e8689c;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s;
}

.load-more:hover {
  color: #ff9aaf;
}
</style>
