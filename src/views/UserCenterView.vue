<script setup lang="ts"></script>

<template>
  <div class="user-center-view">
    <!-- 用户信息卡片 -->
    <div class="user-card">
      <div class="avatar"></div>
      <div class="user-info">
        <h3>校园小达人</h3>
        <p>计算机学院 · 大三</p>
      </div>
    </div>

    <!-- 数据统计 -->
    <div class="stat-row">
      <div class="stat-item">
        <span class="stat-num">12</span>
        <span class="stat-label">我的发布</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">5</span>
        <span class="stat-label">我的收藏</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">8</span>
        <span class="stat-label">跑腿完成</span>
      </div>
    </div>

    <!-- 功能菜单 -->
    <div class="menu-list">
      <div class="menu-item">
        <span class="menu-icon">📋</span>
        <span>我的发布</span>
        <span class="arrow">›</span>
      </div>
      <div class="menu-item">
        <span class="menu-icon">❤️</span>
        <span>我的收藏</span>
        <span class="arrow">›</span>
      </div>
      <div class="menu-item">
        <span class="menu-icon">🛒</span>
        <span>我的拼单</span>
        <span class="arrow">›</span>
      </div>
      <div class="menu-item">
        <span class="menu-icon">🏃</span>
        <span>跑腿记录</span>
        <span class="arrow">›</span>
      </div>
      <div class="menu-item">
        <span class="menu-icon">⚙️</span>
        <span>设置</span>
        <span class="arrow">›</span>
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
}
.user-info h3 {
  font-size: 18px;
  margin-bottom: 4px;
}
.user-info p {
  font-size: 13px;
  opacity: 0.85;
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

.menu-list {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 14px;
  color: #333;
}
.menu-item:hover {
  background: #fef8f9;
}
.menu-item + .menu-item {
  border-top: 1px solid #f5f5f5;
}
.menu-icon {
  font-size: 18px;
}
.arrow {
  margin-left: auto;
  color: #ccc;
  font-size: 18px;
}
</style>
