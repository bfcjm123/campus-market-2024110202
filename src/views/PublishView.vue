<script setup lang="ts"></script>

<template>
  <div class="publish-view">
    <h2>发布信息</h2>

    <!-- 类型选择 -->
    <div class="form-group">
      <label>信息类型</label>
      <div class="type-options">
        <span class="type-item active">二手交易</span>
        <span class="type-item">失物招领</span>
        <span class="type-item">拼单搭子</span>
        <span class="type-item">跑腿委托</span>
      </div>
    </div>

    <!-- 标题 -->
    <div class="form-group">
      <label>标题</label>
      <input type="text" placeholder="请输入信息标题" />
    </div>

    <!-- 描述 -->
    <div class="form-group">
      <label>详细描述</label>
      <textarea placeholder="请详细描述物品信息、丢失/捡到情况等" rows="4"></textarea>
    </div>

    <!-- 价格（仅二手交易） -->
    <div class="form-group">
      <label>价格</label>
      <input type="text" placeholder="请输入价格（选填）" />
    </div>

    <!-- 联系方式 -->
    <div class="form-group">
      <label>联系方式</label>
      <input type="text" placeholder="微信号/QQ号" />
    </div>

    <button class="submit-btn">发布</button>
  </div>
</template>

<style scoped>
.publish-view {
  padding: 0;
}

h2 {
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 18px;
}
.form-group label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  resize: vertical;
  font-family: inherit;
}
.form-group input:focus,
.form-group textarea:focus {
  border-color: #ffb6c1;
}

.type-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.type-item {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  background: #f5f5f5;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}
.type-item.active,
.type-item:hover {
  background: #ffb6c1;
  color: #fff;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #ffb6c1;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;
}
.submit-btn:hover {
  background: #ff9aaf;
}
</style>
