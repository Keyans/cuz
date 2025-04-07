<template>
  <teleport to="body">
    <transition name="dialog-fade-slide">
      <div v-if="visible" class="dialog-overlay" @click="handleOverlayClick">
        <div class="dialog" @click.stop :style="{ width }">
          <div class="dialog-header" v-if="!useSlots().header">
            <span>{{ title }}</span>
            <button class="close-btn" @click="closeDialog">×</button>
          </div>
          <slot name="header" v-else></slot>

          <div class="dialog-body">
            <slot></slot>
          </div>

          <div class="dialog-footer" v-if="!useSlots().footer">
            <button class="cancel-btn" @click="closeDialog">取消</button>
            <button class="confirm-btn" @click="handleConfirm">确认</button>
          </div>
          <slot name="footer" v-else></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
const visible = defineModel({ required: true, type: Boolean });

// 接收 props
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "fit-content",
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

// 监听弹窗状态变化
watch(
  () => props.modelValue,
  (newVal) => {
    visible.value = newVal;
  }
);

// 关闭弹窗
const closeDialog = () => {
  visible.value = false;
};

// 处理确认按钮点击
const handleConfirm = () => {
  emit("confirm");
  closeDialog();
};

// 处理遮罩层点击
const handleOverlayClick = (event: any) => {
  if (event.target === event.currentTarget) {
    closeDialog();
  }
};

// 事件发送
const emit = defineEmits(["confirm"]);
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* 定义弹出动画 */
.dialog-fade-slide-enter-active,
.dialog-fade-slide-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.dialog-fade-slide-enter-from,
.dialog-fade-slide-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}

.dialog {
  background: white;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.dialog-body {
  flex: 1;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn,
.confirm-btn {
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #f2f2f2;
}

.confirm-btn {
  background-color: #409eff;
  color: white;
}
</style>
