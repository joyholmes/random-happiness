<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch')
  // 初始化事件列表
  initHappyEvents()
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})

function initHappyEvents() {
  // 检查是否已经初始化过事件列表
  const events = uni.getStorageSync('happyEvents')
  if (!events) {
    // 预设的幸福事件列表
    const presetEvents = [
      { id: 1, description: "听一首让你感动的音乐", isShown: false, shownTime: null, imageUrl: null },
      { id: 2, description: "去公园散步，感受春天的气息", isShown: false, shownTime: null, imageUrl: null },
      { id: 3, description: "给一位朋友发送问候消息", isShown: false, shownTime: null, imageUrl: null },
      { id: 4, description: "品尝一杯喜欢的饮料", isShown: false, shownTime: null, imageUrl: null },
      { id: 5, description: "看一本有趣的书籍", isShown: false, shownTime: null, imageUrl: null },
      { id: 6, description: "做15分钟的舒展运动", isShown: false, shownTime: null, imageUrl: null },
      { id: 7, description: "欣赏窗外的风景", isShown: false, shownTime: null, imageUrl: null },
      { id: 8, description: "写下三件今天感恩的事", isShown: false, shownTime: null, imageUrl: null },
      { id: 9, description: "整理一下自己的空间", isShown: false, shownTime: null, imageUrl: null },
      { id: 10, description: "尝试一个简单的新食谱", isShown: false, shownTime: null, imageUrl: null },
      { id: 11, description: "观察云朵的变化", isShown: false, shownTime: null, imageUrl: null },
      { id: 12, description: "闭目深呼吸5分钟", isShown: false, shownTime: null, imageUrl: null },
      { id: 13, description: "回忆一个美好的回忆", isShown: false, shownTime: null, imageUrl: null },
      { id: 14, description: "给自己一个小小的奖励", isShown: false, shownTime: null, imageUrl: null },
      { id: 15, description: "计划一次短途旅行", isShown: false, shownTime: null, imageUrl: null }
    ]
    
    // 存储到本地
    uni.setStorageSync('happyEvents', presetEvents)
  }
}
</script>

<style>
/* 重置样式 */
page {
  margin: 0;
  padding: 0;
  min-height: 100%;
  background-color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  padding-top: constant(safe-area-inset-top); /* iOS 11.2 之前 */
  padding-top: env(safe-area-inset-top); /* iOS 11.2 及以后 */
}

/* 修复页面溢出问题 */
uni-page-body,
uni-page-wrapper,
uni-page {
  min-height: 100%;
  height: 100%;
}

/* 修复按钮默认样式 */
button {
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  text-align: left;
  line-height: normal;
}

button::after {
  border: none;
}

/* 通用样式类 */
.container {
  width: 100%;
  padding: 0 30rpx;
  padding-top: calc(88rpx + constant(safe-area-inset-top)); /* iOS 11.2 之前 */
  padding-top: calc(88rpx + env(safe-area-inset-top)); /* iOS 11.2 及以后 */
  box-sizing: border-box;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.text-center {
  text-align: center;
}

.bg-white {
  background-color: #ffffff;
}

.rounded {
  border-radius: 20rpx;
}

.p-20 {
  padding: 20rpx;
}

.m-20 {
  margin: 20rpx;
}

.mb-20 {
  margin-bottom: 20rpx;
}

.text-gray-800 {
  color: #1f2937;
}

.text-gray-500 {
  color: #6b7280;
}

.text-blue-500 {
  color: #3b82f6;
}

.font-medium {
  font-weight: 500;
}

.text-lg {
  font-size: 32rpx;
  line-height: 48rpx;
}

.text-sm {
  font-size: 28rpx;
  line-height: 40rpx;
}
</style> 