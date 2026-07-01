<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <nav class="app-nav">
    <div class="nav-center">
      <div class="nav-links">
        <RouterLink to="/" class="nav-item">首页</RouterLink>
        <RouterLink to="/trade" class="nav-item">二手交易</RouterLink>
        <RouterLink to="/lost-found" class="nav-item">失物招领</RouterLink>
        <RouterLink to="/group-buy" class="nav-item">拼单搭子</RouterLink>
        <RouterLink to="/errand" class="nav-item">跑腿委托</RouterLink>
        <RouterLink to="/publish" class="nav-item">发布信息</RouterLink>
        <RouterLink to="/message" class="nav-item">消息中心</RouterLink>
      </div>
    </div>
    <RouterLink to="/user" class="user-avatar">
      <div class="avatar">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
      <span class="user-name">{{ userStore.user.name }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.app-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 8px 20px;
  background-color: #ffffff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

.nav-center {
  display: flex;
  justify-content: center;
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-item {
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
  color: #606266;
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: #ffe6ef;
  color: #e8689c;
}

.nav-item.router-link-active {
  background-color: #ffb6c1;
  color: #ffffff;
}

.user-avatar {
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  background: linear-gradient(135deg, #ffb6c1, #ff9aaf);
  color: #fff;
  text-decoration: none;
  transition: opacity 0.2s;
}

.user-avatar:hover {
  opacity: 0.85;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name {
  font-size: 13px;
  font-weight: 500;
}
</style>
