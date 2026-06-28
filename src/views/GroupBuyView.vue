<script setup lang="ts"></script>

<template>
  <div class="group-buy-view">
    <h2>拼单搭子</h2>

    <!-- 分类 -->
    <div class="category-row">
      <span class="cat active">全部</span>
      <span class="cat">美食拼单</span>
      <span class="cat">学习搭子</span>
      <span class="cat">运动搭子</span>
      <span class="cat">出行拼车</span>
    </div>

    <!-- 拼单卡片 -->
    <div class="group-list">
      <div class="group-card">
        <div class="group-header">
          <h4>奶茶第二杯半价</h4>
          <span class="group-tag">美食拼单</span>
        </div>
        <p class="group-desc">喜茶买一送一，还差一位，北门自取</p>
        <div class="group-footer">
          <span class="member">🙋 1/2人</span>
          <span class="time">5分钟前</span>
        </div>
      </div>
      <div class="group-card">
        <div class="group-header">
          <h4>图书馆自习搭子</h4>
          <span class="group-tag">学习搭子</span>
        </div>
        <p class="group-desc">每天晚上7-10点，三楼自习室，互相监督打卡</p>
        <div class="group-footer">
          <span class="member">🙋 2/4人</span>
          <span class="time">30分钟前</span>
        </div>
      </div>
      <div class="group-card">
        <div class="group-header">
          <h4>羽毛球约球</h4>
          <span class="group-tag">运动搭子</span>
        </div>
        <p class="group-desc">周六下午3点体育馆，缺2人凑双打</p>
        <div class="group-footer">
          <span class="member">🙋 2/4人</span>
          <span class="time">2小时前</span>
        </div>
      </div>
      <div class="group-card">
        <div class="group-header">
          <h4>周末拼车去市中心</h4>
          <span class="group-tag">出行拼车</span>
        </div>
        <p class="group-desc">周日上午9点校门口出发，分摊打车费约10元/人</p>
        <div class="group-footer">
          <span class="member">🙋 2/4人</span>
          <span class="time">昨天</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group-buy-view {
  padding: 0;
}

h2 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
}

.category-row {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.cat {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  background: #f5f5f5;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}
.cat.active,
.cat:hover {
  background: #ffb6c1;
  color: #fff;
}

.group-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.group-card {
  background: #fff;
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.group-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}
.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.group-header h4 {
  font-size: 15px;
  color: #333;
}
.group-tag {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 12px;
  background: #e8f5e9;
  color: #388e3c;
}
.group-desc {
  font-size: 13px;
  color: #888;
  margin-bottom: 8px;
}
.group-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #bbb;
}
.member {
  color: #e8689c;
}
</style>
