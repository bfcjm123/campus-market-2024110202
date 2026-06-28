<script setup lang="ts"></script>

<template>
  <nav class="app-nav">
    <RouterLink to="/" class="nav-item">首页</RouterLink>
    <RouterLink to="/trade" class="nav-item">二手交易</RouterLink>
    <RouterLink to="/lost-found" class="nav-item">失物招领</RouterLink>
    <RouterLink to="/group-buy" class="nav-item">拼单搭子</RouterLink>
    <RouterLink to="/errand" class="nav-item">跑腿委托</RouterLink>
    <RouterLink to="/publish" class="nav-item">发布信息</RouterLink>
    <RouterLink to="/message" class="nav-item">消息中心</RouterLink>
    <RouterLink to="/user" class="nav-item">个人中心</RouterLink>
  </nav>
</template>

<style scoped>
.app-nav {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background-color: #ffffff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
}

.nav-item {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
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
</style>
