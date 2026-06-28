<script setup lang="ts"></script>

<template>
  <div class="home-view">
    <!-- 横幅区域 -->
    <div class="banner">
      <h2>校园轻集市</h2>
      <p>你的校园生活好帮手</p>
    </div>

    <!-- 分类快捷入口 -->
    <div class="category-grid">
      <div class="category-item">
        <span class="icon">📦</span>
        <span>二手交易</span>
      </div>
      <div class="category-item">
        <span class="icon">🔍</span>
        <span>失物招领</span>
      </div>
      <div class="category-item">
        <span class="icon">🛒</span>
        <span>拼单搭子</span>
      </div>
      <div class="category-item">
        <span class="icon">🏃</span>
        <span>跑腿委托</span>
      </div>
    </div>

    <!-- 最新动态 -->
    <div class="section">
      <h3>最新动态</h3>
      <div class="card-list">
        <div class="card">
          <div class="card-img"></div>
          <div class="card-info">
            <span class="card-title">二手自行车</span>
            <span class="card-price">¥120</span>
          </div>
        </div>
        <div class="card">
          <div class="card-img"></div>
          <div class="card-info">
            <span class="card-title">高数教材</span>
            <span class="card-price">¥15</span>
          </div>
        </div>
        <div class="card">
          <div class="card-img"></div>
          <div class="card-info">
            <span class="card-title">校园卡丢失</span>
            <span class="card-tag lost">失物</span>
          </div>
        </div>
        <div class="card">
          <div class="card-img"></div>
          <div class="card-info">
            <span class="card-title">拼单奶茶</span>
            <span class="card-tag group">拼单</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  padding: 0;
}

.banner {
  background: linear-gradient(135deg, #ffb6c1, #ff9aaf);
  border-radius: 12px;
  padding: 32px 24px;
  margin-bottom: 20px;
  color: #fff;
}
.banner h2 {
  font-size: 24px;
  margin-bottom: 6px;
}
.banner p {
  font-size: 14px;
  opacity: 0.9;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}
.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 8px;
  background: #fff;
  border-radius: 10px;
  font-size: 13px;
  color: #555;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.category-item:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}
.category-item .icon {
  font-size: 28px;
}

.section h3 {
  font-size: 16px;
  margin-bottom: 12px;
  color: #333;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}
.card-img {
  height: 100px;
  background: #f0f0f0;
}
.card-info {
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-title {
  font-size: 14px;
  color: #333;
}
.card-price {
  font-size: 14px;
  color: #e8689c;
  font-weight: 600;
}
.card-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}
.card-tag.lost {
  background: #fff3e0;
  color: #f57c00;
}
.card-tag.group {
  background: #e8f5e9;
  color: #388e3c;
}
</style>
