<script setup lang="ts"></script>

<template>
  <div class="message-view">
    <h2>消息中心</h2>

    <!-- 消息分类 -->
    <div class="msg-tabs">
      <span class="msg-tab active">全部</span>
      <span class="msg-tab">系统通知</span>
      <span class="msg-tab">聊天消息</span>
    </div>

    <!-- 消息列表 -->
    <div class="msg-list">
      <div class="msg-item">
        <div class="msg-icon system">📢</div>
        <div class="msg-body">
          <h4>系统通知</h4>
          <p>你发布的「二手自行车」有人感兴趣啦</p>
          <span class="msg-time">5分钟前</span>
        </div>
        <div class="msg-dot"></div>
      </div>
      <div class="msg-item">
        <div class="msg-icon chat">💬</div>
        <div class="msg-body">
          <h4>小明</h4>
          <p>请问这个还在吗？可以优惠吗？</p>
          <span class="msg-time">20分钟前</span>
        </div>
        <div class="msg-dot"></div>
      </div>
      <div class="msg-item">
        <div class="msg-icon system">📢</div>
        <div class="msg-body">
          <h4>系统通知</h4>
          <p>你参与的拼单「奶茶第二杯半价」已满人</p>
          <span class="msg-time">1小时前</span>
        </div>
      </div>
      <div class="msg-item">
        <div class="msg-icon chat">💬</div>
        <div class="msg-body">
          <h4>学弟小李</h4>
          <p>失物招领的校园卡是我的，怎么联系？</p>
          <span class="msg-time">3小时前</span>
        </div>
      </div>
      <div class="msg-item">
        <div class="msg-icon system">📢</div>
        <div class="msg-body">
          <h4>系统通知</h4>
          <p>你接取的跑腿委托「帮取快递」已确认完成</p>
          <span class="msg-time">昨天</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-view {
  padding: 0;
}

h2 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
}

.msg-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}
.msg-tab {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}
.msg-tab.active {
  background: #ffb6c1;
  color: #fff;
}

.msg-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.msg-item {
  display: flex;
  gap: 12px;
  background: #fff;
  padding: 14px;
  cursor: pointer;
  transition: background 0.2s;
  align-items: center;
}
.msg-item:hover {
  background: #fef8f9;
}
.msg-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
.msg-icon.system {
  background: #fff3e0;
}
.msg-icon.chat {
  background: #e3f2fd;
}
.msg-body {
  flex: 1;
  min-width: 0;
}
.msg-body h4 {
  font-size: 14px;
  color: #333;
  margin-bottom: 2px;
}
.msg-body p {
  font-size: 13px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.msg-time {
  font-size: 12px;
  color: #ccc;
}
.msg-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e8689c;
  flex-shrink: 0;
}
</style>
