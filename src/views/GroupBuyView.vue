<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getGroupBuys, type GroupBuy } from '@/api/groupBuy'
import GroupBuyCard from '@/components/GroupBuyCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const items = ref<GroupBuy[]>([])
const activeCategory = ref('全部')
const pageSize = 3
const displayCount = ref(pageSize)

const categories = ['全部', '拼餐', '团购', '出行搭子']

onMounted(async () => {
  try {
    items.value = await getGroupBuys()
  } catch (error) {
    console.error('获取拼单搭子列表失败:', error)
    items.value = []
  }
})

const filteredItems = computed(() => {
  if (activeCategory.value === '全部') return items.value
  return items.value.filter(item => item.type === activeCategory.value)
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
  <div class="group-buy-view">
    <h2>拼单搭子</h2>

    <div class="category-row">
      <span
        v-for="cat in categories"
        :key="cat"
        class="cat"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >{{ cat }}</span>
    </div>

    <div v-if="filteredItems.length > 0">
      <div class="group-list">
        <GroupBuyCard v-for="item in displayedItems" :key="item.id" :item="item" />
      </div>
      <div v-if="hasMore" class="load-more" @click="loadMore">加载更多</div>
    </div>
    <EmptyState v-else text="暂无拼单搭子信息" />
  </div>
</template>

<style scoped>
.group-buy-view {
  padding: 0;
  display: flex;
  flex-direction: column;
}

h2 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
}

.category-row {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.cat {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  background: #f5f5f5;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.cat.active,
.cat:hover {
  background: #ffb6c1;
  color: #fff;
}

.group-list {
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
