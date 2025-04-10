<template>
  <div class="bg-white shadow">
    <div class="flex items-center p-4">
      <div v-for="(field, index) in fields" :key="index" class="flex-1 mr-4">
        <template v-if="field.type === 'input'">
          <input 
            type="text" 
            :placeholder="field.placeholder" 
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            v-model="queryParams[field.key]"
          />
        </template>
        <template v-else-if="field.type === 'select'">
          <div class="relative">
            <select 
              class="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              v-model="queryParams[field.key]"
            >
              <option v-for="option in field.options" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </template>
        <template v-else-if="field.type === 'tag-select'">
          <div class="flex items-center border border-gray-300 rounded">
            <div 
              v-for="tag in field.options" 
              :key="tag.value"
              @click="toggleTag(field.key, tag.value)"
              class="px-3 py-2 cursor-pointer text-sm"
              :class="isTagSelected(field.key, tag.value) ? 'bg-blue-50 text-blue-600' : 'text-gray-700'"
            >
              {{ tag.label }}
              <button 
                v-if="isTagSelected(field.key, tag.value)" 
                @click.stop="removeTag(field.key, tag.value)"
                class="ml-1 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
        </template>
      </div>
      <div class="flex-none ml-4">
        <button 
          @click="search"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          搜索
        </button>
        <button 
          @click="reset"
          class="ml-2 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none"
        >
          重置
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';

interface FieldOption {
  label: string;
  value: string | number;
}

interface QueryField {
  key: string;
  type: 'input' | 'select' | 'tag-select';
  placeholder?: string;
  options?: FieldOption[];
}

interface Props {
  fields: QueryField[];
  initialValues?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  initialValues: () => ({})
});

const emit = defineEmits(['search', 'reset']);

const queryParams = reactive<Record<string, any>>({...props.initialValues});
const selectedTags = reactive<Record<string, string[]>>({});

// 初始化标签选择
for (const field of props.fields) {
  if (field.type === 'tag-select') {
    selectedTags[field.key] = props.initialValues[field.key] || [];
  }
}

function isTagSelected(fieldKey: string, value: string | number) {
  return selectedTags[fieldKey]?.includes(value.toString());
}

function toggleTag(fieldKey: string, value: string | number) {
  if (!selectedTags[fieldKey]) {
    selectedTags[fieldKey] = [];
  }
  
  const valueStr = value.toString();
  if (isTagSelected(fieldKey, value)) {
    selectedTags[fieldKey] = selectedTags[fieldKey].filter(v => v !== valueStr);
  } else {
    selectedTags[fieldKey].push(valueStr);
  }
  
  queryParams[fieldKey] = [...selectedTags[fieldKey]];
}

function removeTag(fieldKey: string, value: string | number) {
  if (selectedTags[fieldKey]) {
    selectedTags[fieldKey] = selectedTags[fieldKey].filter(v => v !== value.toString());
    queryParams[fieldKey] = [...selectedTags[fieldKey]];
  }
}

function search() {
  emit('search', {...queryParams});
}

function reset() {
  // 重置所有查询参数
  for (const key in queryParams) {
    if (Array.isArray(queryParams[key])) {
      queryParams[key] = [];
    } else if (typeof queryParams[key] === 'object') {
      queryParams[key] = {};
    } else {
      queryParams[key] = '';
    }
  }
  
  // 重置标签选择
  for (const key in selectedTags) {
    selectedTags[key] = [];
  }
  
  emit('reset');
}

// 监听props变化更新查询参数
watch(() => props.initialValues, (newVal) => {
  for (const key in newVal) {
    queryParams[key] = newVal[key];
  }
}, { deep: true });
</script> 