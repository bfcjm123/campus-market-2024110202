<script setup lang="ts"></script>

<template>
  <div class="trade-view">
    <h2>二手交易</h2>

    <!-- 搜索栏 -->
    <div class="search-bar">
      <input type="text" placeholder="搜索二手物品..." />
      <button>搜索</button>
    </div>

    <!-- 分类筛选 -->
    <div class="filter-tags">
      <span class="tag active">全部</span>
      <span class="tag">书籍</span>
      <span class="tag">电子设备</span>
      <span class="tag">生活用品</span>
      <span class="tag">运动器材</span>
      <span class="tag">服饰</span>
    </div>

    <!-- 物品列表 -->
    <div class="trade-list">
      <div class="trade-card">
        <div class="trade-img"></div>
        <div class="trade-body">
          <h4>二手iPad Air 5</h4>
          <p class="desc">自用iPad，无磕碰，配件齐全</p>
          <div class="trade-meta">
            <span class="price">¥2,800</span>
            <span class="info">电子设备 · 3分钟前</span>
          </div>
        </div>
      </div>
      <div class="trade-card">
        <div class="trade-img"></div>
        <div class="trade-body">
          <h4>线性代数教材</h4>
          <p class="desc">九成新，无笔记划线</p>
          <div class="trade-meta">
            <span class="price">¥12</span>
            <span class="info">书籍 · 20分钟前</span>
          </div>
        </div>
      </div>
      <div class="trade-card">
        <div class="trade-img"></div>
        <div class="trade-body">
          <h4>瑜伽垫+拉力带</h4>
          <p class="desc">毕业清仓，用过一学期</p>
          <div class="trade-meta">
            <span class="price">¥35</span>
            <span class="info">运动器材 · 1小时前</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trade-view {
  padding: 0;
}

h2 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
}

.search-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.search-bar input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}
.search-bar input:focus {
  border-color: #ffb6c1;
}
.search-bar button {
  padding: 10px 20px;
  background: #ffb6c1;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.filter-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.tag {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  background: #f5f5f5;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}
.tag.active,
.tag:hover {
  background: #ffb6c1;
  color: #fff;
}

.trade-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.trade-card {
  display: flex;
  gap: 14px;
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.trade-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}
.trade-img {
  width: 100px;
  height: 80px;
  border-radius: 8px;
  background: #f0f0f0;
  flex-shrink: 0;
}
.trade-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.trade-body h4 {
  font-size: 15px;
  color: #333;
}
.desc {
  font-size: 13px;
  color: #999;
}
.trade-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price {
  font-size: 16px;
  color: #e8689c;
  font-weight: 600;
}
.info {
  font-size: 12px;
  color: #bbb;
}
</style>
