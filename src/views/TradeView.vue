<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTrades, type Trade } from '@/api/trade'
import TradeCard from '@/components/TradeCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const trades = ref<Trade[]>([])

onMounted(async () => {
  try {
    trades.value = await getTrades()
  } catch (error) {
    console.error('获取二手交易列表失败:', error)
    trades.value = []
  }
})
</script>

<template>
  <div class="trade-view">
    <h2>二手交易</h2>

    <div class="search-bar">
      <input type="text" placeholder="搜索二手物品..." />
      <button>搜索</button>
    </div>

    <div class="filter-tags">
      <span class="tag active">全部</span>
      <span class="tag">书籍</span>
      <span class="tag">电子设备</span>
      <span class="tag">生活用品</span>
      <span class="tag">运动器材</span>
      <span class="tag">服饰</span>
    </div>

    <div v-if="trades.length > 0" class="trade-list">
      <TradeCard v-for="trade in trades" :key="trade.id" :trade="trade" />
    </div>
    <EmptyState v-else text="暂无二手交易信息" />
  </div>
</template>

<style scoped>
.trade-view {
  padding: 0;
}

h2 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
}

.search-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.search-bar input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

.search-bar input:focus {
  border-color: #ffb6c1;
}

.search-bar button {
  padding: 10px 20px;
  background: #ffb6c1;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.filter-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tag {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  background: #f5f5f5;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.tag.active,
.tag:hover {
  background: #ffb6c1;
  color: #fff;
}

.trade-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
