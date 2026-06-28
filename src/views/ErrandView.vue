<script setup lang="ts"></script>

<template>
  <div class="errand-view">
    <h2>跑腿委托</h2>

    <!-- 状态筛选 -->
    <div class="status-bar">
      <span class="status active">全部</span>
      <span class="status">待接单</span>
      <span class="status">进行中</span>
      <span class="status">已完成</span>
    </div>

    <!-- 委托列表 -->
    <div class="errand-list">
      <div class="errand-card">
        <div class="errand-top">
          <h4>帮取快递</h4>
          <span class="reward">¥5</span>
        </div>
        <p class="errand-desc">菜鸟驿站A12号柜，大件需手提</p>
        <div class="errand-footer">
          <span class="errand-status pending">待接单</span>
          <span class="errand-time">10分钟前</span>
        </div>
      </div>
      <div class="errand-card">
        <div class="errand-top">
          <h4>代买午餐</h4>
          <span class="reward">¥8</span>
        </div>
        <p class="errand-desc">食堂二楼黄焖鸡+米饭，送到6号楼</p>
        <div class="errand-footer">
          <span class="errand-status doing">进行中</span>
          <span class="errand-time">25分钟前</span>
        </div>
      </div>
      <div class="errand-card">
        <div class="errand-top">
          <h4>打印资料</h4>
          <span class="reward">¥3</span>
        </div>
        <p class="errand-desc">打印店在东门，黑白双面30页，送至图书馆</p>
        <div class="errand-footer">
          <span class="errand-status pending">待接单</span>
          <span class="errand-time">1小时前</span>
        </div>
      </div>
      <div class="errand-card">
        <div class="errand-top">
          <h4>送还借书</h4>
          <span class="reward">¥4</span>
        </div>
        <p class="errand-desc">从7号楼送到图书馆还书处，共3本</p>
        <div class="errand-footer">
          <span class="errand-status done">已完成</span>
          <span class="errand-time">昨天</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.errand-view {
  padding: 0;
}

h2 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
}

.status-bar {
  display: flex;
  gap: 0;
  margin-bottom: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}
.status {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}
.status.active {
  background: #ffb6c1;
  color: #fff;
}

.errand-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.errand-card {
  background: #fff;
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.errand-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}
.errand-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.errand-top h4 {
  font-size: 15px;
  color: #333;
}
.reward {
  font-size: 16px;
  color: #e8689c;
  font-weight: 600;
}
.errand-desc {
  font-size: 13px;
  color: #888;
  margin-bottom: 8px;
}
.errand-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.errand-status {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 12px;
}
.errand-status.pending {
  background: #fff3e0;
  color: #f57c00;
}
.errand-status.doing {
  background: #e3f2fd;
  color: #1976d2;
}
.errand-status.done {
  background: #f5f5f5;
  color: #999;
}
.errand-time {
  font-size: 12px;
  color: #bbb;
}
</style>
