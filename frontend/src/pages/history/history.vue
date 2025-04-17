<template>
  <view class="container">
    <!-- 主要内容区域 -->
    <view class="main">
      <view class="history-card">
        <text class="title">历史记录</text>

        <!-- 历史记录列表 -->
        <view class="history-list">
          <view v-if="shownEvents.length === 0" class="empty-tip">
            暂无历史记录
          </view>
          
          <navigator 
            v-for="(event, index) in shownEvents" 
            :key="event.id"
            :url="'/pages/detail/detail?id=' + event.id"
            class="history-item"
          >
            <view class="event-row">
              <view class="event-info">
                <view class="icon-wrapper">
                  <text class="icon">{{ getEventIcon(event) }}</text>
                </view>
                <text class="event-text">{{ event.description }}</text>
              </view>
              <text class="date-text">{{ formatDate(event.shownTime) }}</text>
            </view>
            
            <view v-if="index < shownEvents.length - 1" class="divider"></view>
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'

const shownEvents = ref([])

onMounted(() => {
  loadShownEvents()
})

onShow(() => {
  loadShownEvents()
})

function loadShownEvents() {
  const events = uni.getStorageSync('happyEvents') || []
  // 过滤已展示的事件并按展示时间倒序排序
  shownEvents.value = events
    .filter(event => event.isShown)
    .sort((a, b) => new Date(b.shownTime) - new Date(a.shownTime))
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.getMonth() + 1}-${date.getDate()}`
}

function getEventIcon(event) {
  // 根据事件描述返回不同的图标
  if (event.description.includes('音乐')) return '🎵'
  if (event.description.includes('散步') || event.description.includes('公园')) return '🌳'
  if (event.description.includes('朋友') || event.description.includes('问候')) return '👋'
  if (event.description.includes('饮料') || event.description.includes('品尝')) return '☕'
  if (event.description.includes('书')) return '📚'
  if (event.description.includes('运动')) return '🏃'
  if (event.description.includes('风景') || event.description.includes('窗外')) return '🏞️'
  if (event.description.includes('感恩')) return '🙏'
  if (event.description.includes('整理') || event.description.includes('空间')) return '🧹'
  if (event.description.includes('食谱') || event.description.includes('尝试')) return '🍳'
  if (event.description.includes('云')) return '☁️'
  if (event.description.includes('呼吸')) return '🧘'
  if (event.description.includes('回忆')) return '💭'
  if (event.description.includes('奖励')) return '🎁'
  if (event.description.includes('旅行')) return '✈️'
  return '✨' // 默认图标
}
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #f8fafc;
  box-sizing: border-box;
  padding-top: calc(180rpx + constant(safe-area-inset-top)); /* iOS 11.2 之前 */
  padding-top: calc(180rpx + env(safe-area-inset-top)); /* iOS 11.2 及以后 */
  padding-bottom: calc(120rpx + constant(safe-area-inset-bottom)); /* iOS 11.2 之前 */
  padding-bottom: calc(120rpx + env(safe-area-inset-bottom)); /* iOS 11.2 及以后 */
}

.main {
  max-width: 750rpx;
  margin: 0 auto;
  padding: 30rpx;
  box-sizing: border-box;
}

.history-card {
  background-color: #ffffff;
  border-radius: 40rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

.title {
  font-size: 36rpx;
  font-weight: 500;
  color: #1f2937;
  text-align: center;
  margin-bottom: 40rpx;
  display: block;
}

.history-list {
  box-sizing: border-box;
}

.empty-tip {
  text-align: center;
  color: #94a3b8;
  padding: 40rpx 0;
  font-size: 28rpx;
}

.history-item {
  padding: 20rpx 0;
}

.event-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10rpx 0;
}

.event-info {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0; /* 防止flex子元素溢出 */
}

.icon-wrapper {
  width: 80rpx;
  height: 80rpx;
  background-color: #dbeafe;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; /* 防止图标被压缩 */
  margin-right: 20rpx;
}

.icon {
  font-size: 40rpx;
  color: #3b82f6;
}

.event-text {
  font-size: 28rpx;
  color: #374151;
  flex: 1;
  min-width: 0; /* 确保文本可以正确换行 */
  margin-right: 20rpx;
  word-break: break-all; /* 允许在任意字符间换行 */
}

.date-text {
  font-size: 24rpx;
  color: #94a3b8;
  flex-shrink: 0; /* 防止日期被压缩 */
  min-width: 80rpx; /* 给日期预留固定宽度 */
  text-align: right;
}

.divider {
  height: 2rpx;
  background-color: #f1f5f9;
  margin: 20rpx 0;
}
</style> 