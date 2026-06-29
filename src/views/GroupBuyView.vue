<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getGroupBuys, type GroupBuy } from '@/api/groupBuy'
import GroupBuyCard from '@/components/GroupBuyCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const items = ref<GroupBuy[]>([])

onMounted(async () => {
  try {
    items.value = await getGroupBuys()
  } catch (error) {
    console.error('获取拼单搭子列表失败:', error)
    items.value = []
  }
})
</script>

<template>
  <div class="group-buy-view">
    <h2>拼单搭子</h2>

    <div class="category-row">
      <span class="cat active">全部</span>
      <span class="cat">美食拼单</span>
      <span class="cat">学习搭子</span>
      <span class="cat">运动搭子</span>
      <span class="cat">出行拼车</span>
    </div>

    <div v-if="items.length > 0" class="group-list">
      <GroupBuyCard v-for="item in items" :key="item.id" :item="item" />
    </div>
    <EmptyState v-else text="暂无拼单搭子信息" />
  </div>
</template>

<style scoped>
.group-buy-view {
  padding: 0;
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
</style>
