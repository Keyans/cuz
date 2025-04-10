<template>
  <button 
    :class="[
      'px-4 py-2 rounded focus:outline-none flex items-center',
      typeClasses,
      sizeClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      block ? 'w-full justify-center' : ''
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <component v-if="icon" :is="icon" class="mr-1" :class="iconSizeClass" />
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'link' | 'outline';
  size?: 'small' | 'medium' | 'large';
  icon?: any;
  text?: string;
  disabled?: boolean;
  block?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'medium',
  disabled: false,
  block: false
});

const emit = defineEmits(['click']);

const typeClasses = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'bg-blue-600 hover:bg-blue-700 text-white';
    case 'success':
      return 'bg-green-600 hover:bg-green-700 text-white';
    case 'warning':
      return 'bg-yellow-600 hover:bg-yellow-700 text-white';
    case 'danger':
      return 'bg-red-600 hover:bg-red-700 text-white';
    case 'link':
      return 'bg-transparent hover:underline text-blue-600';
    case 'outline':
      return 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700';
    default:
      return 'bg-gray-100 hover:bg-gray-200 text-gray-700';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'text-xs px-2 py-1';
    case 'large':
      return 'text-base px-6 py-3';
    default:
      return 'text-sm';
  }
});

const iconSizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'w-3 h-3';
    case 'large':
      return 'w-5 h-5';
    default:
      return 'w-4 h-4';
  }
});

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event);
  }
}
</script> 