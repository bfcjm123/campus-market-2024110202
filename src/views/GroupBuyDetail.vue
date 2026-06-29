<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getGroupBuyById, type GroupBuy } from '@/api/groupBuy'

const route = useRoute()
const router = useRouter()
const item = ref<GroupBuy | null>(null)

onMounted(async () => {
  try {
    const id = Number(route.params.id)
    item.value = await getGroupBuyById(id)
  } catch (error) {
    console.error('获取详情失败:', error)
  }
})

const getStatusText = (status: string) => {
  const map: Record<string, string> = { open: '招募中', closed: '已截止' }
  return map[status] || status
}
</script>

<template>
  <div class="detail-view" v-if="item">
    <div class="detail-back" @click="router.back()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      返回列表
    </div>
    <div class="detail-header">
      <h2>{{ item.title }}</h2>
      <span class="type-tag">{{ item.type }}</span>
    </div>
    <div class="detail-tags">
      <span class="tag" :class="item.status">{{ getStatusText(item.status) }}</span>
    </div>
    <div class="progress-section">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${(item.currentCount / item.targetCount) * 100}%` }"></div>
      </div>
      <span class="progress-text">{{ item.currentCount }}/{{ item.targetCount }}人</span>
    </div>
    <div class="detail-info">
      <div class="info-row">
        <span class="label">活动地点</span>
        <span>{{ item.location }}</span>
      </div>
      <div class="info-row">
        <span class="label">截止时间</span>
        <span>{{ item.deadline }}</span>
      </div>
      <div class="info-row">
        <span class="label">发布人</span>
        <span>{{ item.publisher }}</span>
      </div>
    </div>
    <div class="detail-desc">
      <h3>活动描述</h3>
      <p>{{ item.description }}</p>
    </div>
    <button class="contact-btn">我要参加</button>
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

.type-tag {
  font-size: 13px;
  padding: 4px 14px;
  border-radius: 20px;
  background: #e8f5e9;
  color: #388e3c;
}

.detail-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  background: #e3f2fd;
  color: #1976d2;
}

.tag.closed {
  background: #f5f5f5;
  color: #999;
}

.progress-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffb6c1, #ff9aaf);
  border-radius: 4px;
}

.progress-text {
  font-size: 14px;
  color: #e8689c;
  font-weight: 500;
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
