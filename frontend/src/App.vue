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
/* 全局样式 */
page {
  background-color: #f8fafc; /* bg-slate-50 */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style> 