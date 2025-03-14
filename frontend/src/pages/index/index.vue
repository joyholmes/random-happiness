<template>
  <view class="container mx-auto px-4 py-6 max-w-md">
    <!-- 主要内容区域 -->
    <view class="main">
      <!-- 事件显示区域 -->
      <view class="bg-white rounded-3xl shadow-sm p-8 mb-6">
        <text class="text-xl font-medium text-center text-gray-800 mb-8 block">今日幸福时刻</text>
        
        <!-- 图标和事件描述 -->
        <view class="flex flex-col items-center mb-8">
          <view class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <text class="text-blue-500 text-4xl" v-if="!currentEvent">✨</text>
            <text class="text-blue-500 text-4xl" v-else>🎵</text>
          </view>
          <text class="text-lg text-center text-gray-700 mb-6" v-if="currentEvent">{{ currentEvent.description }}</text>
          <text class="text-lg text-center text-gray-700 mb-6" v-else>点击下方按钮生成幸福时刻</text>
          
          <!-- 添加图片展示 -->
          <view class="w-full aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden mb-6" v-if="currentEvent && currentEvent.imageUrl">
            <image :src="currentEvent.imageUrl" mode="aspectFill" class="w-full h-full object-cover"></image>
          </view>
          <view class="w-full aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden mb-6 bg-gray-100 flex items-center justify-center" v-else-if="currentEvent && isLoading">
            <text class="text-gray-500">图片加载中...</text>
          </view>
        </view>

        <!-- 进度显示 -->
        <text class="text-sm text-center text-gray-500 block">已生成 {{ shownCount }}/{{ totalCount }} 个幸福时刻</text>
      </view>

      <!-- 按钮区域 -->
      <view class="space-y-4">
        <button 
          class="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-4 px-6 rounded-2xl"
          @click="generateEvent"
        >
          {{ currentEvent ? '换一个幸福时刻' : '生成幸福时刻' }}
        </button>
        
        <view class="grid grid-cols-2 gap-4">
          <navigator url="/pages/history/history" class="text-gray-600 text-center text-sm">
            查看历史记录
          </navigator>
          <button class="text-gray-600 text-center text-sm" @click="confirmReset">
            重置列表
          </button>
        </view>
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
  // 每次显示页面时重新加载统计数据
  loadEventStats()
})

function loadEventStats() {
  const events = uni.getStorageSync('happyEvents') || []
  totalCount.value = events.length
  shownCount.value = events.filter(event => event.isShown).length
  
  // 如果有当前事件，加载它
  const currentEventId = uni.getStorageSync('currentEventId')
  if (currentEventId) {
    currentEvent.value = events.find(event => event.id === currentEventId)
  }
}

function generateEvent() {
  const events = uni.getStorageSync('happyEvents') || []
  
  // 过滤出未展示的事件
  const unshownEvents = events.filter(event => !event.isShown)
  
  if (unshownEvents.length === 0) {
    uni.showToast({
      title: '所有事件已生成，请重置列表',
      icon: 'none'
    })
    return
  }
  
  // 随机选择一个未展示的事件
  const randomIndex = Math.floor(Math.random() * unshownEvents.length)
  const selectedEvent = unshownEvents[randomIndex]
  
  // 显示加载状态
  isLoading.value = true
  
  // 模拟API请求延迟
  setTimeout(() => {
    // 构建图片URL
    const encodedPrompt = encodeURIComponent(selectedEvent.description)
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`
    
    // 更新事件状态
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
    
    // 保存到本地存储
    uni.setStorageSync('happyEvents', updatedEvents)
    uni.setStorageSync('currentEventId', selectedEvent.id)
    
    // 更新当前事件和统计数据
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

function confirmReset() {
  uni.showModal({
    title: '确认重置',
    content: '确定要重置所有事件列表吗？',
    success: (res) => {
      if (res.confirm) {
        resetEvents()
      }
    }
  })
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
  
  uni.showToast({
    title: '重置成功',
    icon: 'success'
  })
}
</script>

<style>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
}

.aspect-w-16 image {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
}

button:active {
  transform: scale(0.98);
}

.bg-gradient-to-r {
  background-size: 200% auto;
  transition: 0.3s;
}

.bg-gradient-to-r:hover {
  background-position: right center;
}
</style> 