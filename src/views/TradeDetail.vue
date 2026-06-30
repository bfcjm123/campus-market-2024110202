<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTradeById, type Trade } from '@/api/trade'

const route = useRoute()
const router = useRouter()
const item = ref<Trade | null>(null)

onMounted(async () => {
  try {
    const id = route.params.id as string
    item.value = await getTradeById(id)
  } catch (error) {
    console.error('获取详情失败:', error)
  }
})

const getStatusText = (status: string) => {
  const map: Record<string, string> = { open: '在售', closed: '已成交', done: '已完成' }
  return map[status] || status
}
</script>

<template>
  <div class="detail-view" v-if="item">
    <div class="detail-back" @click="router.back()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      返回列表
    </div>
    <div class="detail-img">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ddd" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
    </div>
    <div class="detail-header">
      <h2>{{ item.title }}</h2>
      <span class="price">¥{{ item.price }}</span>
    </div>
    <div class="detail-tags">
      <span class="tag">{{ item.category }}</span>
      <span class="tag">{{ item.condition }}</span>
      <span class="tag" :class="item.status">{{ getStatusText(item.status) }}</span>
    </div>
    <div class="detail-info">
      <div class="info-row">
        <span class="label">发布人</span>
        <span>{{ item.publisher }}</span>
      </div>
      <div class="info-row">
        <span class="label">交易地点</span>
        <span>{{ item.location }}</span>
      </div>
      <div class="info-row">
        <span class="label">发布时间</span>
        <span>{{ item.publishTime }}</span>
      </div>
    </div>
    <div class="detail-desc">
      <h3>商品描述</h3>
      <p>{{ item.description }}</p>
    </div>
    <button class="contact-btn">联系卖家</button>
  </div>
  <div v-else class="loading">加载中...</div>
</template>

<style scoped>
.detail-view {
  padding: 0;
  display: flex;
  flex-direction: column;
}

.detail-back {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #e8689c;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 16px;
}

.detail-back:hover {
  color: #ff9aaf;
}

.detail-img {
  width: 100%;
  height: 200px;
  background: #f5f5f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.detail-header h2 {
  font-size: 20px;
  color: #333;
}

.price {
  font-size: 22px;
  color: #e8689c;
  font-weight: 600;
}

.detail-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.tag {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  background: #f0f7ff;
  color: #409eff;
}

.tag.closed,
.tag.done {
  background: #f5f5f5;
  color: #999;
}

.detail-info {
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #555;
}

.info-row + .info-row {
  border-top: 1px solid #f5f5f5;
}

.label {
  color: #999;
}

.detail-desc {
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
}

.detail-desc h3 {
  font-size: 15px;
  color: #333;
  margin-bottom: 8px;
}

.detail-desc p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.contact-btn {
  width: 100%;
  padding: 14px;
  background: #ffb6c1;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

.contact-btn:hover {
  background: #ff9aaf;
}

.loading {
  text-align: center;
  padding: 60px;
  color: #999;
}
</style>
