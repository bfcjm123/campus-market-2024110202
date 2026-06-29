<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getTrades, type Trade } from '@/api/trade'
import TradeCard from '@/components/TradeCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const trades = ref<Trade[]>([])
const keyword = ref('')
const activeCategory = ref('全部')
const pageSize = 3
const displayCount = ref(pageSize)

const categories = ['全部', '数码配件', '教材资料', '生活用品', '运动器材', '教辅资料']

onMounted(async () => {
  try {
    trades.value = await getTrades()
  } catch (error) {
    console.error('获取二手交易列表失败:', error)
    trades.value = []
  }
})

const filteredTrades = computed(() => {
  let list = trades.value
  if (activeCategory.value !== '全部') {
    list = list.filter(t => t.category === activeCategory.value)
  }
  if (keyword.value.trim()) {
    const kw = keyword.value.trim().toLowerCase()
    list = list.filter(t =>
      t.title.toLowerCase().includes(kw) ||
      t.description.toLowerCase().includes(kw)
    )
  }
  return list
})

const displayedTrades = computed(() => {
  return filteredTrades.value.slice(0, displayCount.value)
})

const hasMore = computed(() => {
  return displayCount.value < filteredTrades.value.length
})

const loadMore = () => {
  displayCount.value += pageSize
}
</script>

<template>
  <div class="trade-view">
    <h2>二手交易</h2>

    <div class="search-bar">
      <input v-model="keyword" type="text" placeholder="搜索二手物品..." />
      <button>搜索</button>
    </div>

    <div class="filter-tags">
      <span
        v-for="cat in categories"
        :key="cat"
        class="tag"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >{{ cat }}</span>
    </div>

    <div v-if="filteredTrades.length > 0">
      <div class="trade-list">
        <TradeCard v-for="trade in displayedTrades" :key="trade.id" :trade="trade" />
      </div>
      <div v-if="hasMore" class="load-more" @click="loadMore">加载更多</div>
    </div>
    <EmptyState v-else text="暂无二手交易信息" />
  </div>
</template>

<style scoped>
.trade-view {
  padding: 0;
  display: flex;
  flex-direction: column;
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
