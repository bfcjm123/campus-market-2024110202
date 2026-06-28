<script setup lang="ts"></script>

<template>
  <div class="lost-found-view">
    <h2>失物招领</h2>

    <!-- 切换Tab -->
    <div class="tab-bar">
      <span class="tab active">丢失物品</span>
      <span class="tab">捡到物品</span>
    </div>

    <!-- 列表 -->
    <div class="item-list">
      <div class="item-card">
        <div class="item-badge lost">丢失</div>
        <div class="item-body">
          <h4>校园卡（张三 信息学院）</h4>
          <p class="item-desc">今天中午在食堂二楼丢失，卡面有贴纸</p>
          <span class="item-time">30分钟前 · 教学楼区域</span>
        </div>
      </div>
      <div class="item-card">
        <div class="item-badge found">捡到</div>
        <div class="item-body">
          <h4>黑色钱包</h4>
          <p class="item-desc">在图书馆三楼自习室桌面捡到，内有证件</p>
          <span class="item-time">1小时前 · 图书馆</span>
        </div>
      </div>
      <div class="item-card">
        <div class="item-badge lost">丢失</div>
        <div class="item-body">
          <h4>AirPods Pro 耳机盒</h4>
          <p class="item-desc">只有充电盒，昨晚在操场跑步时丢失</p>
          <span class="item-time">3小时前 · 操场</span>
        </div>
      </div>
      <div class="item-card">
        <div class="item-badge found">捡到</div>
        <div class="item-body">
          <h4>蓝色雨伞</h4>
          <p class="item-desc">挂在教学楼B栋门口伞架上无人认领</p>
          <span class="item-time">昨天 · 教学楼B栋</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lost-found-view {
  padding: 0;
}

h2 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
}

.tab-bar {
  display: flex;
  gap: 0;
  margin-bottom: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}
.tab {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}
.tab.active {
  background: #ffb6c1;
  color: #fff;
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.item-card {
  display: flex;
  gap: 14px;
  background: #fff;
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.item-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}
.item-badge {
  writing-mode: vertical-lr;
  padding: 8px 6px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  flex-shrink: 0;
}
.item-badge.lost {
  background: #fff3e0;
  color: #f57c00;
}
.item-badge.found {
  background: #e8f5e9;
  color: #388e3c;
}
.item-body {
  flex: 1;
}
.item-body h4 {
  font-size: 15px;
  color: #333;
  margin-bottom: 4px;
}
.item-desc {
  font-size: 13px;
  color: #888;
  margin-bottom: 6px;
}
.item-time {
  font-size: 12px;
  color: #bbb;
}
</style>
