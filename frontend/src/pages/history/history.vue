<template>
  <view class="container mx-auto px-4 py-6 max-w-md">
    <!-- 主要内容区域 -->
    <view class="main">
      <view class="bg-white rounded-3xl shadow-sm p-8 mb-6">
        <text class="text-xl font-medium text-center text-gray-800 mb-8 block">历史记录</text>

        <!-- 历史记录列表 -->
        <view class="space-y-6">
          <view v-if="shownEvents.length === 0" class="text-center text-gray-500 py-4">
            暂无历史记录
          </view>
          
          <navigator 
            v-for="(event, index) in shownEvents" 
            :key="event.id"
            :url="'/pages/detail/detail?id=' + event.id"
            class="block"
          >
            <view class="flex items-center justify-between py-2">
              <view class="flex items-center">
                <view class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <text class="text-blue-500 text-lg">{{ getEventIcon(event) }}</text>
                </view>
                <text class="text-gray-700">{{ event.description }}</text>
              </view>
              <text class="text-sm text-gray-500">{{ formatDate(event.shownTime) }}</text>
            </view>
            
            <view v-if="index < shownEvents.length - 1" class="border-t border-gray-100 mt-4"></view>
          </navigator>
        </view>
      </view>

      <!-- 返回按钮 -->
      <navigator url="/pages/index/index" open-type="switchTab" class="block w-full text-center text-gray-600 text-sm">
        返回主界面
      </navigator>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onShow } from 'vue'

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