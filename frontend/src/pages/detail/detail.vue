<template>
  <view class="container mx-auto px-4 py-6 max-w-md">
    <!-- 主要内容区域 -->
    <view class="main">
      <view class="bg-white rounded-3xl shadow-sm p-8 mb-6" v-if="event">
        <!-- 图标和事件描述 -->
        <view class="flex flex-col items-center mb-8">
          <view class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <text class="text-blue-500 text-4xl">{{ getEventIcon(event) }}</text>
          </view>
          <text class="text-xl font-medium text-gray-800 mb-4 text-center">{{ event.description }}</text>
          <text class="text-sm text-gray-500 mb-6">生成时间：{{ formatDateTime(event.shownTime) }}</text>
          
          <!-- 图片展示 -->
          <view class="w-full aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden" v-if="event.imageUrl">
            <image :src="event.imageUrl" mode="aspectFill" class="w-full h-full object-cover"></image>
          </view>
        </view>
      </view>

      <!-- 按钮区域 -->
      <view class="space-y-4">
        <navigator url="/pages/history/history" class="block w-full text-center text-gray-600 text-sm">
          返回历史记录
        </navigator>
        <navigator url="/pages/index/index" open-type="switchTab" class="block w-full text-center text-gray-600 text-sm">
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
</style> 