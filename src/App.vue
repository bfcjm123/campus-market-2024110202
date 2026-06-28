<template>
  <!-- 顶部导航栏 -->
  <nav style="padding: 16px; background: #f5f5f5; gap: 20px; display: flex;">
    <router-link to="/home">首页</router-link>
    <router-link to="/list">列表页</router-link>
    <router-link to="/publish">发布页</router-link>
    <router-link to="/message">消息页</router-link>
    <router-link to="/profile">个人中心</router-link>
    <router-link to="/board">看板页</router-link>
  </nav>

  <!-- 路由页面渲染出口 -->
  <router-view />
</template>

<style scoped>
nav a {
  text-decoration: none;
  color: #333;
  font-size: 16px;
}
nav a.router-link-active {
  color: #409eff;
  font-weight: bold;
}
</style>