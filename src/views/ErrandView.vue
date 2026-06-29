<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getErrands, type Errand } from '@/api/errand'
import ErrandCard from '@/components/ErrandCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const items = ref<Errand[]>([])
const activeStatus = ref('all')

onMounted(async () => {
  try {
    items.value = await getErrands()
  } catch (error) {
    console.error('获取跑腿委托列表失败:', error)
    items.value = []
  }
})

const filteredItems = () => {
  if (activeStatus.value === 'all') return items.value
  return items.value.filter(item => item.status === activeStatus.value)
}
</script>

<template>
  <div class="errand-view">
    <h2>跑腿委托</h2>

    <div class="status-bar">
      <span class="status" :class="{ active: activeStatus === 'all' }" @click="activeStatus = 'all'">全部</span>
      <span class="status" :class="{ active: activeStatus === 'open' }" @click="activeStatus = 'open'">待接单</span>
      <span class="status" :class="{ active: activeStatus === 'closed' }" @click="activeStatus = 'closed'">进行中</span>
      <span class="status" :class="{ active: activeStatus === 'done' }" @click="activeStatus = 'done'">已完成</span>
    </div>

    <div v-if="filteredItems().length > 0" class="errand-list">
      <ErrandCard v-for="item in filteredItems()" :key="item.id" :item="item" />
    </div>
    <EmptyState v-else text="暂无跑腿委托信息" />
  </div>
</template>

<style scoped>
.errand-view {
  padding: 0;
}

h2 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
}

.status-bar {
  display: flex;
  gap: 0;
  margin-bottom: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.status {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.status.active {
  background: #ffb6c1;
  color: #fff;
}

.errand-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
