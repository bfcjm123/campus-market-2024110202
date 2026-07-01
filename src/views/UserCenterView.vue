<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useFavoriteStore } from '@/stores/favorite'
import EmptyState from '@/components/EmptyState.vue'
import { getTrades, type Trade } from '@/api/trade'
import { getLostFounds, type LostFound } from '@/api/lostFound'
import { getGroupBuys, type GroupBuy } from '@/api/groupBuy'
import { getErrands, type Errand } from '@/api/errand'

const userStore = useUserStore()
const favoriteStore = useFavoriteStore()

const myTrades = ref<Trade[]>([])
const myLostFounds = ref<LostFound[]>([])
const myGroupBuys = ref<GroupBuy[]>([])
const myErrands = ref<Errand[]>([])

const loading = ref(true)

const typeNameMap: Record<string, string> = {
  trade: '二手交易',
  lostFound: '失物招领',
  groupBuy: '拼单搭子',
  errand: '跑腿委托',
}

onMounted(async () => {
  try {
    const userName = userStore.user.name
    const [trades, lostFounds, groupBuys, errands] = await Promise.all([
      getTrades(),
      getLostFounds(),
      getGroupBuys(),
      getErrands(),
    ])
    myTrades.value = trades.filter(t => t.publisher === userName)
    myLostFounds.value = lostFounds.filter(t => t.contact === userName)
    myGroupBuys.value = groupBuys.filter(t => t.publisher === userName)
    myErrands.value = errands.filter(t => t.publisher === userName)
  } catch (error) {
    console.error('获取数据失败:', error)
  } finally {
    loading.value = false
  }
})

const totalPublish = () => {
  return myTrades.value.length + myLostFounds.value.length + myGroupBuys.value.length + myErrands.value.length
}
</script>

<template>
  <div class="user-center-view">
    <!-- 用户资料区 -->
    <div class="user-card">
      <div class="avatar">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
      <div class="user-info">
        <div class="user-name-row">
          <h3>{{ userStore.user.name }}</h3>
          <span class="nickname">{{ userStore.user.nickname }}</span>
        </div>
        <p>{{ userStore.user.grade }} · {{ userStore.user.college }} · {{ userStore.user.major }}</p>
        <p class="class-info">{{ userStore.user.class }}</p>
        <p class="signature">「{{ userStore.user.signature }}」</p>
        <p class="bio">{{ userStore.user.bio }}</p>
      </div>
    </div>

    <!-- 联系方式 -->
    <div class="section">
      <h4 class="section-title">联系方式</h4>
      <div class="contact-list">
        <div class="contact-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>{{ userStore.user.phone }}</span>
        </div>
        <div class="contact-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5-2 4-2 4 2 4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/></svg>
          <span>{{ userStore.user.qq }}</span>
        </div>
        <div class="contact-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span>{{ userStore.user.email }}</span>
        </div>
      </div>
    </div>

    <!-- 数据统计 -->
    <div class="stat-row">
      <div class="stat-item">
        <span class="stat-num">{{ totalPublish() }}</span>
        <span class="stat-label">我的发布</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">{{ favoriteStore.favoriteCount }}</span>
        <span class="stat-label">我的收藏</span>
      </div>
    </div>

    <!-- 我的收藏区 -->
    <div class="section">
      <h4 class="section-title">我的收藏</h4>
      <div v-if="favoriteStore.favorites.length === 0">
        <EmptyState text="暂无收藏内容" />
      </div>
      <div v-else class="fav-list">
        <div v-for="(item, index) in favoriteStore.favorites" :key="index" class="fav-item">
          <div class="fav-info">
            <span class="fav-type">{{ typeNameMap[item.type] }}</span>
            <span class="fav-title">{{ item.title }}</span>
            <span class="fav-desc">{{ item.description }}</span>
          </div>
          <button class="remove-btn" @click="favoriteStore.removeFavorite(item.type, item.id)">取消收藏</button>
        </div>
      </div>
    </div>

    <!-- 我的发布区 -->
    <div class="section">
      <h4 class="section-title">我的发布</h4>
      <div v-if="loading">
        <EmptyState text="加载中..." />
      </div>
      <div v-else-if="totalPublish() === 0">
        <EmptyState text="暂无发布内容" />
      </div>
      <div v-else class="publish-list">
        <!-- 二手交易 -->
        <div v-for="item in myTrades" :key="'trade-' + item.id" class="publish-item">
          <span class="pub-type">二手交易</span>
          <span class="pub-title">{{ item.title }}</span>
          <span class="pub-price">¥{{ item.price }}</span>
          <span class="pub-status">{{ item.status }}</span>
        </div>
        <!-- 失物招领 -->
        <div v-for="item in myLostFounds" :key="'lf-' + item.id" class="publish-item">
          <span class="pub-type">失物招领</span>
          <span class="pub-title">{{ item.title }}</span>
          <span class="pub-status">{{ item.status }}</span>
        </div>
        <!-- 拼单搭子 -->
        <div v-for="item in myGroupBuys" :key="'gb-' + item.id" class="publish-item">
          <span class="pub-type">拼单搭子</span>
          <span class="pub-title">{{ item.title }}</span>
          <span class="pub-status">{{ item.status }}</span>
        </div>
        <!-- 跑腿委托 -->
        <div v-for="item in myErrands" :key="'er-' + item.id" class="publish-item">
          <span class="pub-type">跑腿委托</span>
          <span class="pub-title">{{ item.title }}</span>
          <span class="pub-price">¥{{ item.reward }}</span>
          <span class="pub-status">{{ item.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-center-view {
  padding: 0;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: linear-gradient(135deg, #ffb6c1, #ff9aaf);
  border-radius: 12px;
  padding: 24px;
  color: #fff;
  margin-bottom: 16px;
}

.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info h3 {
  font-size: 18px;
  margin-bottom: 4px;
}

.nickname {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  opacity: 0.9;
}

.user-info p {
  font-size: 13px;
  opacity: 0.85;
  margin: 2px 0;
}

.class-info {
  font-size: 12px !important;
  opacity: 0.75 !important;
}

.signature {
  font-size: 12px !important;
  opacity: 0.85 !important;
  font-style: italic;
}

.bio {
  font-size: 12px !important;
  opacity: 0.7 !important;
  margin-top: 6px !important;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #666;
}

.stat-row {
  display: flex;
  background: #fff;
  border-radius: 10px;
  padding: 16px 0;
  margin-bottom: 16px;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-num {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.stat-label {
  font-size: 12px;
  color: #999;
}

.section {
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
}

.section-title {
  font-size: 15px;
  color: #333;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f5f5f5;
}

.fav-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f9f9f9;
}

.fav-item:last-child {
  border-bottom: none;
}

.fav-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  overflow: hidden;
}

.fav-type {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #fef0f3;
  color: #e8689c;
  flex-shrink: 0;
}

.fav-title {
  font-size: 13px;
  color: #333;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fav-desc {
  font-size: 12px;
  color: #bbb;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remove-btn {
  padding: 4px 10px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background: #fff;
  color: #999;
  font-size: 12px;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s;
}

.remove-btn:hover {
  border-color: #e8689c;
  color: #e8689c;
}

.publish-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
  border-bottom: 1px solid #f9f9f9;
}

.publish-item:last-child {
  border-bottom: none;
}

.pub-type {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #f0f7ff;
  color: #409eff;
  flex-shrink: 0;
}

.pub-title {
  font-size: 13px;
  color: #333;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pub-price {
  font-size: 13px;
  color: #e8689c;
  font-weight: 500;
  flex-shrink: 0;
}

.pub-status {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #f5f5f5;
  color: #999;
  flex-shrink: 0;
}
</style>
