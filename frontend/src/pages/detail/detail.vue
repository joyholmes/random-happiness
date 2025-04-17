<template>
  <view class="container">
    <!-- 主要内容区域 -->
    <view class="main">
      <view class="detail-card" v-if="event">
        <!-- 图标和事件描述 -->
        <view class="content-wrapper">
          <view class="icon-wrapper">
            <text class="icon">{{ getEventIcon(event) }}</text>
          </view>
          <text class="title">{{ event.description }}</text>
          <text class="time">生成时间：{{ formatDateTime(event.shownTime) }}</text>
          
          <!-- 图片展示 -->
          <view 
            class="image-wrapper" 
            v-if="event.imageUrl"
            :style="{ backgroundImage: `url(${event.imageUrl})` }"
          ></view>
        </view>
      </view>

      <!-- 按钮区域 -->
      <view class="button-group">
        <button class="back-button" @click="goBack">返回历史记录</button>
        <navigator url="/pages/index/index" open-type="switchTab" class="home-link">
          返回主界面
        </navigator>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 如果使用了 onShow，也需要从 @dcloudio/uni-app 导入
// import { onShow } from '@dcloudio/uni-app'

const event = ref(null)

// 获取路由参数
const props = defineProps({
  id: {
    type: [Number, String],
    default: null
  }
})

onMounted(() => {
  // 从页面参数中获取ID
  const eventId = props.id || parseInt(uni.getLaunchOptionsSync().query.id)
  loadEvent(eventId)
})

function loadEvent(eventId) {
  const events = uni.getStorageSync('happyEvents') || []
  event.value = events.find(e => e.id === parseInt(eventId))
  
  if (!event.value) {
    uni.showToast({
      title: '事件不存在',
      icon: 'none'
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }
}

function formatDateTime(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  
  return `${year}-${month}-${day} ${hours}:${minutes}`
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

function goBack() {
  uni.navigateBack({
    delta: 1
  })
}
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #f8fafc;
  box-sizing: border-box;
  padding: 30rpx;
  padding-top: calc(180rpx + constant(safe-area-inset-top));
  padding-top: calc(180rpx + env(safe-area-inset-top));
  padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
}

.main {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.detail-card {
  background-color: #ffffff;
  border-radius: 40rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  margin-bottom: 40rpx;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-wrapper {
  width: 160rpx;
  height: 160rpx;
  background-color: #dbeafe;
  border-radius: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40rpx;
}

.icon {
  font-size: 80rpx;
  color: #3b82f6;
}

.title {
  font-size: 36rpx;
  font-weight: 500;
  color: #1f2937;
  text-align: center;
  margin-bottom: 20rpx;
  line-height: 1.5;
  padding: 0 20rpx;
}

.time {
  font-size: 28rpx;
  color: #6b7280;
  margin-bottom: 40rpx;
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

.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
}

.back-button {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background: #3b82f6;
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 500;
  border-radius: 44rpx;
  text-align: center;
}

.home-link {
  font-size: 28rpx;
  color: #6b7280;
  padding: 20rpx;
}
</style> 