<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getErrandById, type Errand } from '@/api/errand'

const route = useRoute()
const router = useRouter()
const item = ref<Errand | null>(null)

onMounted(async () => {
  try {
    const id = Number(route.params.id)
    item.value = await getErrandById(id)
  } catch (error) {
    console.error('获取详情失败:', error)
  }
})

const getStatusText = (status: string) => {
  const map: Record<string, string> = { open: '待接单', closed: '进行中', done: '已完成' }
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
      <span class="reward">¥{{ item.reward }}</span>
    </div>
    <div class="detail-tags">
      <span class="tag">{{ item.taskType }}</span>
      <span class="tag" :class="item.status">{{ getStatusText(item.status) }}</span>
    </div>
    <div class="route-section">
      <div class="route-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#388e3c" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <div>
          <span class="route-label">取件地点</span>
          <span class="route-text">{{ item.from }}</span>
        </div>
      </div>
      <div class="route-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ddd" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </div>
      <div class="route-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8689c" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <div>
          <span class="route-label">送达地点</span>
          <span class="route-text">{{ item.to }}</span>
        </div>
      </div>
    </div>
    <div class="detail-info">
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
      <h3>任务描述</h3>
      <p>{{ item.description }}</p>
    </div>
    <button class="contact-btn">接单</button>
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

.reward {
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

.tag.closed {
  background: #e3f2fd;
  color: #1976d2;
}

.tag.done {
  background: #f5f5f5;
  color: #999;
}

.route-section {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
}

.route-item {
  flex: 1;
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.route-item div {
  display: flex;
  flex-direction: column;
}

.route-label {
  font-size: 12px;
  color: #999;
}

.route-text {
  font-size: 14px;
  color: #333;
}

.route-arrow {
  flex-shrink: 0;
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
