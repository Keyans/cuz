<template>
  <el-dialog
    v-model="dialogVisible"
    title="插入变量"
    width="60%"
    :before-close="handleClose"
    class="variable-dialog"
  >
    <!-- 商品标题输入区域 -->
    <div class="mb-6">
      <div class="text-sm font-medium mb-2">商品标题：</div>
      <el-input
        type="textarea"
        v-model="productTitle"
        :rows="3"
        placeholder="请输入商品标题"
      />
    </div>
    
    <!-- 标题预览 -->
    <div class="mb-6">
      <div class="text-sm font-medium mb-2">标题预览：</div>
      <div class="p-3 bg-gray-50 border border-gray-200 rounded">
        {{ productTitle }}
      </div>
    </div>
    
    <!-- 变量面板 -->
    <div class="mb-6">
      <div class="text-sm font-medium mb-2">变量面板</div>
      <el-tabs>
        <el-tab-pane label="基础信息变量">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button @click="insertVariable('customProductName')" class="variable-btn">
              <span class="plus-icon">+</span> 定制商品名称
            </button>
            <button @click="insertVariable('templateName')" class="variable-btn">
              <span class="plus-icon">+</span> 模板名称
            </button>
            <button @click="insertVariable('designFileName')" class="variable-btn">
              <span class="plus-icon">+</span> 设计图片名称
            </button>
            <button @click="insertVariable('storeBrand')" class="variable-btn">
              <span class="plus-icon">+</span> 店铺授权品牌
            </button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="规格变量">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button @click="insertVariable('keyword')" class="variable-btn">
              <span class="plus-icon">+</span> 关键词
            </button>
            <button @click="insertVariable('randomKeyword')" class="variable-btn">
              <span class="plus-icon">+</span> 随机关键词
            </button>
            <button @click="insertVariable('keywordN')" class="variable-btn">
              <span class="plus-icon">+</span> 关键词N
            </button>
            <button @click="insertVariable('randomKeywordN')" class="variable-btn">
              <span class="plus-icon">+</span> 随机关键词N
            </button>
            
            <button @click="insertVariable('colorValue')" class="variable-btn">
              <span class="plus-icon">+</span> 颜色值
            </button>
            <button @click="insertVariable('randomColorValue')" class="variable-btn">
              <span class="plus-icon">+</span> 随机颜色值
            </button>
            <button @click="insertVariable('colorValueN')" class="variable-btn">
              <span class="plus-icon">+</span> 颜色值N
            </button>
            <button @click="insertVariable('randomColorValueN')" class="variable-btn">
              <span class="plus-icon">+</span> 随机颜色值N
            </button>
            
            <button @click="insertVariable('sizeValue')" class="variable-btn">
              <span class="plus-icon">+</span> 尺码值
            </button>
            <button @click="insertVariable('randomSizeValue')" class="variable-btn">
              <span class="plus-icon">+</span> 随机尺码值
            </button>
            <button @click="insertVariable('sizeValueN')" class="variable-btn">
              <span class="plus-icon">+</span> 尺码值N
            </button>
            <button @click="insertVariable('randomSizeValueN')" class="variable-btn">
              <span class="plus-icon">+</span> 随机尺码值N
            </button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    
    <!-- 自定义变量 -->
    <div class="mb-6">
      <div class="flex items-center">
        <div class="text-sm font-medium flex-grow">自定义变量</div>
        <el-button type="primary" size="small" @click="addCustomVariable">
          + 添加自定义变量
        </el-button>
      </div>
      
      <div class="mt-3 grid gap-3">
        <div class="flex items-center gap-2">
          <div class="w-32">
            <el-input v-model="customVarName" placeholder="通用词" size="default" />
          </div>
          <div class="flex-grow">
            <el-input 
              v-model="customVarValue" 
              placeholder="高级感，网红，日韩ins，简约创意，可爱卡通，淡态" 
              size="default" 
            />
          </div>
          <div class="flex gap-2">
            <el-button type="primary" plain size="small" @click="saveCustomVariable">保存</el-button>
            <el-button type="danger" plain size="small" @click="deleteCustomVariable">删除</el-button>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <div class="w-32">
            <el-input v-model="customGroupName" placeholder="自定义词组" size="default" />
          </div>
          <div class="flex-grow">
            <el-input 
              v-model="customGroupValue" 
              placeholder="自定义词组，用逗号分隔" 
              size="default" 
            />
          </div>
          <div class="flex gap-2">
            <el-button type="primary" plain size="small" @click="saveCustomGroup">保存</el-button>
            <el-button type="danger" plain size="small" @click="deleteCustomGroup">删除</el-button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  initialValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:visible', 'confirm'])

const dialogVisible = ref(props.visible)
const productTitle = ref(props.initialValue)
const customVarName = ref('')
const customVarValue = ref('')
const customGroupName = ref('')
const customGroupValue = ref('')

// 监听visible prop变化
watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal
})

// 监听dialogVisible变化
watch(dialogVisible, (newVal) => {
  emit('update:visible', newVal)
})

// 监听initialValue prop变化
watch(() => props.initialValue, (newVal) => {
  productTitle.value = newVal
})

// 关闭对话框
const handleClose = () => {
  dialogVisible.value = false
}

// 确认按钮处理
const handleConfirm = () => {
  emit('confirm', productTitle.value)
  dialogVisible.value = false
}

// 插入变量
const insertVariable = (variable: string) => {
  const variableMap: Record<string, string> = {
    'customProductName': '${定制商品名称}',
    'templateName': '${模板名称}',
    'designFileName': '${设计图片名称}',
    'storeBrand': '${店铺授权品牌}',
    'keyword': '${关键词}',
    'randomKeyword': '${随机关键词}',
    'keywordN': '${关键词N}',
    'randomKeywordN': '${随机关键词N}',
    'colorValue': '${颜色值}',
    'randomColorValue': '${随机颜色值}',
    'colorValueN': '${颜色值N}',
    'randomColorValueN': '${随机颜色值N}',
    'sizeValue': '${尺码值}',
    'randomSizeValue': '${随机尺码值}',
    'sizeValueN': '${尺码值N}',
    'randomSizeValueN': '${随机尺码值N}'
  }
  
  const variableText = variableMap[variable] || `\${${variable}}`
  const cursorPosition = document.activeElement === document.querySelector('textarea') 
    ? (document.querySelector('textarea') as HTMLTextAreaElement).selectionStart
    : productTitle.value.length
    
  if (cursorPosition !== null) {
    productTitle.value = 
      productTitle.value.substring(0, cursorPosition) + 
      variableText + 
      productTitle.value.substring(cursorPosition)
  } else {
    productTitle.value += variableText
  }
}

// 添加自定义变量
const addCustomVariable = () => {
  customVarName.value = ''
  customVarValue.value = ''
}

// 保存自定义变量
const saveCustomVariable = () => {
  if (customVarName.value.trim() && customVarValue.value.trim()) {
    // 实际应用中，这里应该调用API保存变量
    console.log('保存自定义变量', customVarName.value, customVarValue.value)
  }
}

// 删除自定义变量
const deleteCustomVariable = () => {
  customVarName.value = ''
  customVarValue.value = ''
}

// 保存自定义词组
const saveCustomGroup = () => {
  if (customGroupName.value.trim() && customGroupValue.value.trim()) {
    // 实际应用中，这里应该调用API保存词组
    console.log('保存自定义词组', customGroupName.value, customGroupValue.value)
  }
}

// 删除自定义词组
const deleteCustomGroup = () => {
  customGroupName.value = ''
  customGroupValue.value = ''
}
</script>

<style scoped>
.variable-btn {
  @apply flex items-center justify-center px-3 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 text-sm;
}

.plus-icon {
  @apply mr-1 font-bold text-blue-500;
}

.variable-dialog :deep(.el-dialog__body) {
  padding-top: 20px;
}

/* 移动端样式优化 */
@media (max-width: 768px) {
  .variable-dialog :deep(.el-dialog) {
    width: 90% !important;
    max-width: 100%;
  }
  
  .variable-dialog :deep(.el-dialog__body) {
    padding: 15px;
  }
  
  .grid {
    grid-template-columns: 1fr !important;
  }
  
  .flex.items-center {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .flex.items-center > * {
    margin-bottom: 8px;
    width: 100%;
  }
  
  .flex.gap-2 {
    width: 100%;
    justify-content: space-between;
  }
}
</style> 