<template>
  <div class="ai-assistant-container">
    <!-- 悬浮按钮 -->
    <button 
      @click="toggleChat" 
      class="ai-button flex items-center justify-center" 
      :class="{ 'active': isChatOpen }"
    >
      <div v-if="!isChatOpen" class="flex flex-col items-center">
        <img src="/assets/chat-logo.png" alt="AI助手" title="点击打开AI助手对话窗口" aria-label="点击打开AI助手对话窗口" class="w-14 h-14" />
      </div>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- 聊天窗口 -->
    <div v-show="isChatOpen" class="chat-window">
      <div class="chat-header flex items-center justify-between p-3 bg-primary text-white">
        <div class="flex items-center">
          <img src="/assets/favicon.png" alt="AI助手" class="w-6 h-6 mr-2" />
          <h3 class="font-medium">AI助手 小C</h3>
        </div>
        <button @click="toggleChat" class="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="chat-messages p-3" ref="messagesContainer">
        <!-- 欢迎信息和主题展示 -->
        <div v-if="showWelcome" class="welcome-container mb-4">
          <div class="text-center mb-4">
            <img src="/assets/favicon.png" alt="AI助手" class="w-16 h-16 mx-auto mb-2" />
            <h2 class="text-xl font-bold text-gray-800">有什么问题都可以问我</h2>
          </div>
          
          <!-- 常见问题标签 -->
          <div class="common-questions">
            <div 
              v-for="(question, index) in commonQuestions" 
              :key="index"
              @click="askCommonQuestion(question)"
              class="question-tag"
            >
              {{ question }}
              <svg class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
        
        <!-- 二维码区域 - 当有消息且不显示欢迎界面时显示 -->
        <div v-if="messages.length > 0 && !showWelcome" class="qrcode-container mb-4">
          <div v-if="showQRCode" class="qrcode-box mb-3">
            <div class="qrcode-header">
              {{ currentQRTitle }}
            </div>
            <div class="qrcode-image">
              <img :src="currentQRImage" :alt="currentQRTitle" class="w-full h-auto" />
            </div>
          </div>
        </div>
        
        <!-- 聊天消息 -->
        <div v-for="(message, index) in messages" :key="index" 
             :class="['message', message.type === 'user' ? 'user-message' : 'assistant-message']">
          <div class="message-content">
            <div v-if="message.type === 'assistant'" class="message-avatar">
              <img src="//assets/favicon.png" alt="AI助手" class="w-6 h-6" />
            </div>
            <div class="message-text">{{ message.text }}</div>
          </div>
          <div class="message-time text-xs text-gray-500">{{ message.time }}</div>
        </div>
        
        <!-- 输入中提示 -->
        <div v-if="isTyping" class="message assistant-message">
          <div class="message-content">
            <div class="message-avatar">
              <img src="//assets/favicon.png" alt="AI助手" class="w-6 h-6" />
            </div>
            <div class="message-text typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 固定在底部的标签菜单 -->
      <div class="tag-menu-wrapper">
        <div class="tag-menu-container">
          <div 
            v-for="(tag, index) in recommendedTags" 
            :key="index"
            @click="askTagQuestion(tag)"
            class="tag-menu-item"
          >
            {{ tag }}
          </div>
        </div>
      </div>
      
      <div class="chat-input p-3">
        <div class="flex">
          <input 
            type="text" 
            v-model="userInput" 
            @keyup.enter="sendMessage"
            placeholder="请描述您遇到的问题" 
            class="flex-1 p-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-primary"
          />
          <button 
            @click="sendMessage" 
            class="send-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';

// 聊天状态
const isChatOpen = ref(false);
const isTyping = ref(false);
const userInput = ref('');
const messages = ref([]);
const messagesContainer = ref(null);
const showWelcome = ref(true);
const showQRCode = ref(false);
const currentQRImage = ref('/assets/qrcode-manager.png');
const currentQRTitle = ref('扫码添加专属招商经理');

// 常见问题列表
const commonQuestions = [
  'POD模式如何开启？',
  '如何进行差异化选品？',
  '我的成本和利润如何计算？'
];

// 推荐标签
const recommendedTags = [
  '新话题', '招商经理', '关注指数', '海外POD货盘'
];

// 二维码图片映射
const qrCodeMap = {
  '招商经理': {
    title: '扫码添加专属招商经理',
    image: '/assets/qrcode-manager.png'
  },
  '关注指数': {
    title: '扫码关注公众号，了解最新资讯',
    image: '/assets/qrcode-official.png'
  }
};

// 默认欢迎消息
onMounted(() => {
  addMessage({
    type: 'assistant',
    text: '老板您好！我是CuzCuz的AI助手小C，很高兴为您服务。您可以点击下方问题或输入任何您想问的内容。',
    time: formatTime(new Date())
  });
});

// 切换聊天窗口
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
  
  // 如果是首次打开且没有消息，添加欢迎消息
  if (isChatOpen.value && messages.value.length === 0) {
    addMessage({
      type: 'assistant',
      text: '老板您好！我是CuzCuz的AI助手小C，很高兴为您服务。您可以点击下方问题或输入任何您想问的内容。',
      time: formatTime(new Date())
    });
  }
};

// 点击常见问题
const askCommonQuestion = (question) => {
  // 只隐藏主要的问题列表，保留底部标签栏
  showWelcome.value = false;
  showQRCode.value = false;
  
  // 添加用户问题
  addMessage({
    type: 'user',
    text: question,
    time: formatTime(new Date())
  });
  
  // 显示机器人正在输入状态
  isTyping.value = true;
  
  // 滚动到底部
  scrollToBottom();
  
  // 模拟API调用延迟
  setTimeout(() => {
    isTyping.value = false;
    
    // 获取问题的回答
    let response = getPresetResponse(question);
    
    // 添加助手回复
    addMessage({
      type: 'assistant',
      text: response,
      time: formatTime(new Date())
    });
    
    // 滚动到底部
    scrollToBottom();
  }, 1000);
};

// 点击标签
const askTagQuestion = (tag) => {
  // 只隐藏主要的问题列表，保留底部标签栏
  showWelcome.value = false;
  
  // 设置二维码
  if (qrCodeMap[tag]) {
    showQRCode.value = true;
    currentQRTitle.value = qrCodeMap[tag].title;
    currentQRImage.value = qrCodeMap[tag].image;
  } else {
    showQRCode.value = false;
  }
  
  // 添加用户问题
  addMessage({
    type: 'user',
    text: `关于"${tag}"的信息`,
    time: formatTime(new Date())
  });
  
  // 显示机器人正在输入状态
  isTyping.value = true;
  
  // 滚动到底部
  scrollToBottom();
  
  // 模拟API调用延迟
  setTimeout(() => {
    isTyping.value = false;
    
    // 获取标签的回答
    let response = getTagResponse(tag);
    
    // 添加助手回复
    addMessage({
      type: 'assistant',
      text: response,
      time: formatTime(new Date())
    });
    
    // 滚动到底部
    scrollToBottom();
  }, 1000);
};

// 发送消息
const sendMessage = async () => {
  if (!userInput.value.trim()) return;
  
  // 只隐藏主要的问题列表，保留底部标签栏
  showWelcome.value = false;
  showQRCode.value = false;
  
  // 添加用户消息
  addMessage({
    type: 'user',
    text: userInput.value,
    time: formatTime(new Date())
  });
  
  const question = userInput.value;
  userInput.value = '';
  
  // 显示机器人正在输入状态
  isTyping.value = true;
  
  // 滚动到底部
  await scrollToBottom();
  
  // 模拟API调用延迟
  setTimeout(() => {
    isTyping.value = false;
    
    // 根据问题提供响应
    let response = getResponse(question);
    
    // 添加助手回复
    addMessage({
      type: 'assistant',
      text: response,
      time: formatTime(new Date())
    });
    
    // 滚动到底部
    scrollToBottom();
  }, 1000);
};

// 添加消息到消息列表
const addMessage = (message) => {
  messages.value.push(message);
};

// 格式化时间
const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// 监听消息变化，自动滚动
watch(messages, () => {
  scrollToBottom();
});

// 获取预设问题的回答
const getPresetResponse = (question) => {
  if (question === 'POD模式如何开启？') {
    return 'POD（Print on Demand）模式开启步骤：\n\n1. 在商户中心完成店铺认证\n2. 进入"POD中心"选择供应商\n3. 查看可用产品并选择\n4. 上传您的设计并预览\n5. 设置价格并发布商品\n\n我们提供详细的视频教程，您可以在"帮助中心-视频教程"中查看完整步骤。';
  } 
  else if (question === '如何进行差异化选品？') {
    return '差异化选品的关键策略：\n\n1. 市场调研：分析竞争对手，寻找市场空白\n2. 目标受众定位：了解您的客户群体需求\n3. 利基市场：专注于细分市场\n4. 独特设计：创造独特的视觉设计或功能\n5. 高质量定制：提供定制化服务\n6. 数据分析：使用平台数据分析工具找出热门趋势\n\n您可以使用我们的"市场分析工具"查看不同类别的销售趋势和热门产品。';
  }
  else if (question === '我的成本和利润如何计算？') {
    return '利润计算公式：销售价格 - 成本 - 手续费 = 利润\n\n详细成本构成：\n1. 产品基础成本\n2. 印刷/定制成本\n3. 物流成本\n4. 平台佣金（通常为销售价的8-15%）\n5. 支付处理费（约2-3%）\n\n我们在商户后台提供了利润计算器，您可以在"产品管理-利润计算"中进行详细测算。建议定价时确保至少30%的利润空间以覆盖营销和其他运营成本。';
  }
  
  return getResponse(question);
};

// 获取标签相关的回答
const getTagResponse = (tag) => {
  if (tag === '新话题') {
    return '以下是近期热门的新话题：\n\n1. 可持续环保产品需求增长\n2. 个性化定制服务趋势\n3. 社交媒体营销新策略\n4. 跨境电商物流优化\n5. AI设计工具应用\n\n您对哪个话题感兴趣？可以告诉我，我会提供更详细的信息。';
  }
  else if (tag === '招商经理') {
    return '我们的招商经理可以为您提供以下服务：\n\n1. 一对一开店指导\n2. 产品选择建议\n3. 运营策略咨询\n4. 平台政策解读\n5. 资源对接\n\n如需联系招商经理，请留下您的联系方式和需求，我们会在24小时内安排专人与您联系。';
  }
  else if (tag === '关注指数') {
    return '关注指数是我们平台衡量产品热度的重要指标：\n\n- 90-100：极热产品，竞争激烈\n- 70-89：热门产品，有较好增长空间\n- 50-69：稳定产品，适合长期运营\n- 30-49：潜力产品，可能是蓝海\n- 0-29：冷门产品，需谨慎选择\n\n您可以在"产品研究"页面查看各类目的关注指数变化趋势。';
  }
  else if (tag === '海外POD货盘') {
    return '海外POD货盘服务包括：\n\n1. 欧美仓储直发服务\n2. 全球48个国家配送覆盖\n3. 多语言产品描述支持\n4. 海外支付解决方案\n5. 跨境合规及税务服务\n\n我们提供欧洲、北美、澳洲等多地区的POD服务，平均配送时间为5-12天。详情可查看"海外服务"专区或联系客服获取完整报价。';
  }
  
  return '关于"' + tag + '"的详细信息，我们的专业团队正在整理中。您可以留下具体问题，我们会尽快为您提供专业解答，或者联系我们的客服团队获取更多支持。';
};

// 根据问题生成响应
const getResponse = (question) => {
  // 简单的预设响应规则
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('联系') || lowerQuestion.includes('客服')) {
    return '您可以通过以下方式联系我们：\n电话：400-123-4567\n邮箱：support@cuzcuz.com\n工作时间：周一至周五 9:00-18:00';
  }
  
  if (lowerQuestion.includes('价格') || lowerQuestion.includes('费用') || lowerQuestion.includes('多少钱')) {
    return '我们提供多种产品和服务，价格因具体需求而异。您可以在产品页面查看详细价格，或者告诉我您具体需要什么服务，我会为您提供相关信息。';
  }
  
  if (lowerQuestion.includes('怎么下单') || lowerQuestion.includes('如何购买') || lowerQuestion.includes('订购流程')) {
    return '下单流程非常简单：\n1. 选择您想要的产品\n2. 点击"添加到购物车"\n3. 进入购物车结算\n4. 填写收货信息并选择支付方式\n5. 完成支付\n如有任何问题，我们的客服团队随时为您提供帮助！';
  }
  
  if (lowerQuestion.includes('发货') || lowerQuestion.includes('物流') || lowerQuestion.includes('送货')) {
    return '我们通常在确认付款后1-3个工作日内发货，使用顺丰或京东物流。国内一般3-5天送达，国际配送时间视目的地而定，约7-15个工作日。您可以在订单页面查看物流状态。';
  }
  
  // 默认回复
  return '感谢您的提问！我们将尽快为您解答。如需立即帮助，请联系我们的客服团队：400-123-4567或发送邮件至support@cuzcuz.com。';
};
</script>

<style scoped>
.ai-assistant-container {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.ai-button {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: var(--color-primary);
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: none;
  outline: none;
}

.ai-button:hover {
  transform: scale(1.05);
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}

.ai-button.active {
  background-color: #f44336;
}

.chat-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* 欢迎界面样式 */
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9);
}

.common-questions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.question-tag {
  padding: 12px 15px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  color: #212529;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.question-tag:hover {
  background-color: #e9ecef;
  border-color: #dee2e6;
  transform: translateY(-2px);
}

/* 二维码样式 */
.qrcode-container {
  padding: 0 10px;
}

.qrcode-box {
  border: 1px solid #e74c3c;
  border-radius: 8px;
  overflow: hidden;
}

.qrcode-header {
  padding: 8px 12px;
  background-color: #e74c3c;
  color: white;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}

.qrcode-image {
  padding: 15px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 底部标签菜单 */
.tag-menu-wrapper {
  padding: 10px 15px;
}

.tag-menu-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  background-color: white;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  padding: 0;
  border: none;
}

/* 隐藏滚动条 */
.tag-menu-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.tag-menu-item {
  padding: 5px 9px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 30px;
  font-size: 12px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.tag-menu-item:hover {
  background-color: #f5f5f5;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 10px;
}

.message {
  max-width: 80%;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
}

.user-message {
  align-self: flex-end;
}

.assistant-message {
  align-self: flex-start;
}

.message-content {
  display: flex;
  align-items: flex-start;
}

.message-avatar {
  margin-right: 8px;
  min-width: 24px;
}

.message-text {
  padding: 8px 12px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-line;
}

.user-message .message-text {
  background-color: var(--color-primary);
  color: white;
  border-bottom-right-radius: 4px;
}

.assistant-message .message-text {
  background-color: #f1f1f1;
  color: #333;
  border-bottom-left-radius: 4px;
}

.message-time {
  margin-top: 4px;
  font-size: 10px;
  opacity: 0.7;
}

.user-message .message-time {
  text-align: right;
  padding-right: 4px;
}

.assistant-message .message-time {
  padding-left: 32px;
}

/* 打字指示器动画 */
.typing-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  min-height: 20px;
}

.typing-indicator span {
  height: 8px;
  width: 8px;
  float: left;
  margin: 0 1px;
  background-color: #9E9EA1;
  display: block;
  border-radius: 50%;
  opacity: 0.4;
}

.typing-indicator span:nth-of-type(1) {
  animation: 1s blink infinite 0.3333s;
}

.typing-indicator span:nth-of-type(2) {
  animation: 1s blink infinite 0.6666s;
}

.typing-indicator span:nth-of-type(3) {
  animation: 1s blink infinite 0.9999s;
}

@keyframes blink {
  50% {
    opacity: 1;
  }
}

/* 响应式调整 */
@media (max-width: 640px) {
  .chat-window {
    width: calc(100vw - 40px);
    height: 60vh;
    bottom: 80px;
  }
}

.chat-input {
  padding: 10px 15px;
  border-top: none;
  background-color: #f9f9f9;
}

.chat-input input {
  height: 42px;
  border-color: #e0e0e0;
  padding-left: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.send-button {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #005eff;
  color: white;
  border-radius: 0 50% 50% 0;
  border: none;
  outline: none;
  transition: all 0.2s ease;
}

.send-button:hover {
  background-color: #0046c2;
}

.send-button svg {
  transform: rotate(90deg);
}
</style>