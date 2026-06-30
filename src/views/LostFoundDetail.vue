<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getLostFoundById, type LostFound } from '@/api/lostFound'

const route = useRoute()
const router = useRouter()
const item = ref<LostFound | null>(null)

onMounted(async () => {
  try {
    const id = route.params.id as string
    item.value = await getLostFoundById(id)
  } catch (error) {
    console.error('获取详情失败:', error)
  }
})

const getStatusText = (status: string) => {
  const map: Record<string, string> = { open: '进行中', closed: '已解决' }
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
      <span class="badge" :class="item.type">{{ item.type === 'lost' ? '丢失' : '捡到' }}</span>
    </div>
    <div class="detail-tags">
      <span class="tag" :class="item.status">{{ getStatusText(item.status) }}</span>
    </div>
    <div class="detail-info">
      <div class="info-row">
        <span class="label">物品名称</span>
        <span>{{ item.itemName }}</span>
      </div>
      <div class="info-row">
        <span class="label">发生地点</span>
        <span>{{ item.location }}</span>
      </div>
      <div class="info-row">
        <span class="label">发生时间</span>
        <span>{{ item.eventTime }}</span>
      </div>
      <div class="info-row">
        <span class="label">联系人</span>
        <span>{{ item.contact }}</span>
      </div>
      <div class="info-row">
        <span class="label">目标人</span>
        <span>{{ item.targetUser }}</span>
      </div>
    </div>
    <div class="detail-desc">
      <h3>详细描述</h3>
      <p>{{ item.description }}</p>
    </div>
    <button class="contact-btn">联系对方</button>
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

.badge {
  font-size: 13px;
  padding: 4px 14px;
  border-radius: 20px;
  font-weight: 500;
}

.badge.lost {
  background: #fff3e0;
  color: #f57c00;
}

.badge.found {
  background: #e8f5e9;
  color: #388e3c;
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
  background: #fff3e0;
  color: #f57c00;
}

.tag.closed {
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
