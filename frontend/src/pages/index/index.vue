<template>
  <view class="container">
    <!-- 主要内容区域 -->
    <view class="main">
      <!-- 事件显示区域 -->
      <view class="event-card">
        <text class="title">今日幸福时刻</text>
        
        <!-- 图标和事件描述 -->
        <view class="event-content">
          <view class="icon-wrapper">
            <text class="icon" v-if="!currentEvent">✨</text>
            <text class="icon" v-else>{{ getEventIcon(currentEvent) }}</text>
          </view>
          <text class="description" v-if="currentEvent">{{ currentEvent.description }}</text>
          <text class="description" v-else>点击下方按钮生成幸福时刻</text>
          
          <!-- 添加图片展示 -->
          <view 
            class="image-wrapper" 
            v-if="currentEvent && currentEvent.imageUrl"
            :style="{ backgroundImage: `url(${currentEvent.imageUrl})` }"
          ></view>
          <view class="image-wrapper loading" v-else-if="currentEvent && isLoading">
            <text class="loading-text">图片加载中...</text>
          </view>
        </view>
      </view>

      <!-- 按钮区域 -->
      <view class="button-area">
        <button 
          class="generate-button"
          @click="generateEvent"
        >
          {{ currentEvent ? '换一个幸福时刻' : '生成幸福时刻' }}
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'

const currentEvent = ref(null)
const isLoading = ref(false)
const totalCount = ref(0)
const shownCount = ref(0)

onMounted(() => {
  loadEventStats()
})

onShow(() => {
  loadEventStats()
})

function loadEventStats() {
  const events = uni.getStorageSync('happyEvents') || []
  totalCount.value = events.length
  shownCount.value = events.filter(event => event.isShown).length
  
  const currentEventId = uni.getStorageSync('currentEventId')
  if (currentEventId) {
    currentEvent.value = events.find(event => event.id === currentEventId)
  }
}

function generateEvent() {
  const events = uni.getStorageSync('happyEvents') || []
  const unshownEvents = events.filter(event => !event.isShown)
  
  // 如果所有事件都已显示，自动重置列表
  if (unshownEvents.length === 0) {
    resetEvents()
    return generateEvent() // 递归调用生成新事件
  }
  
  // 随机选择一个未展示的事件
  const randomIndex = Math.floor(Math.random() * unshownEvents.length)
  const selectedEvent = unshownEvents[randomIndex]
  
  isLoading.value = true
  
  // 模拟API请求延迟
  setTimeout(() => {
    const encodedPrompt = encodeURIComponent(selectedEvent.description)
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`
    
    const updatedEvents = events.map(event => {
      if (event.id === selectedEvent.id) {
        return {
          ...event,
          isShown: true,
          shownTime: new Date().toISOString(),
          imageUrl: imageUrl
        }
      }
      return event
    })
    
    uni.setStorageSync('happyEvents', updatedEvents)
    uni.setStorageSync('currentEventId', selectedEvent.id)
    
    currentEvent.value = {
      ...selectedEvent,
      isShown: true,
      shownTime: new Date().toISOString(),
      imageUrl: imageUrl
    }
    isLoading.value = false
    loadEventStats()
  }, 1000)
}

function resetEvents() {
  const events = uni.getStorageSync('happyEvents') || []
  const resetEvents = events.map(event => ({
    ...event,
    isShown: false,
    shownTime: null,
    imageUrl: null
  }))
  
  uni.setStorageSync('happyEvents', resetEvents)
  uni.removeStorageSync('currentEventId')
  currentEvent.value = null
  loadEventStats()
}

// 添加获取事件图标的函数
function getEventIcon(event) {
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
  overflow: hidden;
  padding: 30rpx;
  padding-top: calc(180rpx + constant(safe-area-inset-top)); /* iOS 11.2 之前 */
  padding-top: calc(180rpx + env(safe-area-inset-top)); /* iOS 11.2 及以后 */
  padding-bottom: calc(200rpx + constant(safe-area-inset-bottom)); /* iOS 11.2 之前 */
  padding-bottom: calc(200rpx + env(safe-area-inset-bottom)); /* iOS 11.2 及以后 */
}

.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative; /* 为绝对定位的按钮提供参考 */
}

.event-card {
  background-color: #ffffff;
  border-radius: 40rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 36rpx;
  font-weight: 500;
  color: #1f2937;
  text-align: center;
  margin-bottom: 40rpx;
  display: block;
}

.event-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon-wrapper {
  width: 120rpx;
  height: 120rpx;
  background-color: #dbeafe;
  border-radius: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30rpx;
}

.icon {
  font-size: 60rpx;
  color: #3b82f6;
}

.description {
  font-size: 32rpx;
  color: #374151;
  text-align: center;
  margin-bottom: 30rpx;
  line-height: 1.5;
  padding: 0 20rpx;
}

.image-wrapper {
  width: 100%;
  height: 400rpx;
  border-radius: 20rpx;
  overflow: hidden;
  background-color: #f3f4f6;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-text {
  font-size: 28rpx;
  color: #6b7280;
}

.event-image {
  display: none;
}

.button-area {
  position: absolute;
  left: 40rpx;
  right: 40rpx;
  bottom: -120rpx; /* 调整按钮位置，确保不会被tabbar遮挡 */
  z-index: 1;
}

.generate-button {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 500;
  border-radius: 48rpx;
  border: none;
  text-align: center;
  transition: all 0.3s ease;
}

.generate-button:active {
  transform: scale(0.98);
  opacity: 0.9;
}
</style> 