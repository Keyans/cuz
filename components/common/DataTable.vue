<template>
  <div>
    <!-- 表格 -->
    <div class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th v-for="column in columns" :key="column.key" scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ column.title }}
            </th>
            <th v-if="actions.length > 0" scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(item, index) in data" :key="index" class="hover:bg-gray-50">
            <td v-for="column in columns" :key="column.key" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <template v-if="column.render">
                <component :is="column.render" :record="item" :index="index" />
              </template>
              <template v-else>
                {{ getNestedValue(item, column.key) }}
              </template>
            </td>
            <td v-if="actions.length > 0" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex space-x-2">
                <button 
                  v-for="action in actions" 
                  :key="action.key"
                  @click="action.onClick(item, index)"
                  class="text-sm px-2.5 py-1.5 border border-gray-300 rounded flex items-center"
                  :class="[
                    action.type === 'primary' ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : 
                    action.type === 'danger' ? 'text-red-600 hover:text-red-700 hover:border-red-600' : 
                    'text-gray-700 hover:bg-gray-100'
                  ]"
                >
                  <component v-if="action.icon" :is="action.icon" class="w-4 h-4 mr-1" />
                  {{ action.text }}
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="data.length === 0" class="hover:bg-gray-50">
            <td :colspan="actions.length > 0 ? columns.length + 1 : columns.length" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
              {{ emptyText }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div v-if="pagination" class="flex justify-between items-center mt-4">
      <div class="text-sm text-gray-700">
        显示 {{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }} 到 
        {{ Math.min(pagination.current * pagination.pageSize, pagination.total) }} 条，
        共 {{ pagination.total }} 条
      </div>
      <nav class="flex space-x-2">
        <button 
          class="px-3 py-1 rounded border" 
          :class="pagination.current <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'"
          :disabled="pagination.current <= 1"
          @click="handlePageChange(pagination.current - 1)"
        >
          &lt;
        </button>
        <template v-for="page in pageList" :key="page">
          <button v-if="page !== '...'" 
            @click="handlePageChange(page)" 
            class="px-3 py-1 rounded border" 
            :class="page === pagination.current ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'"
          >
            {{ page }}
          </button>
          <span v-else class="px-3 py-1">...</span>
        </template>
        <button 
          class="px-3 py-1 rounded border" 
          :class="pagination.current >= pagination.totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'"
          :disabled="pagination.current >= pagination.totalPages"
          @click="handlePageChange(pagination.current + 1)"
        >
          &gt;
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Column {
  key: string;
  title: string;
  render?: any;
}

interface Action {
  key: string;
  text: string;
  type?: 'default' | 'primary' | 'danger';
  icon?: any;
  onClick: (record: any, index: number) => void;
}

interface Pagination {
  current: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onChange?: (page: number, pageSize: number) => void;
}

interface Props {
  columns: Column[];
  data: any[];
  actions?: Action[];
  pagination?: Pagination;
  emptyText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  actions: () => [],
  emptyText: '暂无数据'
});

// 获取嵌套对象的值，支持 'user.name' 这种点表示法
function getNestedValue(obj: any, key: string) {
  return key.split('.').reduce((o, k) => (o || {})[k], obj) || '';
}

// 计算分页显示的页码列表
const pageList = computed(() => {
  if (!props.pagination) return [];
  
  const { current, totalPages } = props.pagination;
  const result = [];
  
  // 固定显示前后各2页，中间用...表示
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      result.push(i);
    }
  } else {
    result.push(1);
    
    if (current > 3) {
      result.push('...');
    }
    
    const start = Math.max(2, current - 1);
    const end = Math.min(totalPages - 1, current + 1);
    
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    
    if (current < totalPages - 2) {
      result.push('...');
    }
    
    result.push(totalPages);
  }
  
  return result;
});

function handlePageChange(page: number) {
  if (!props.pagination || !props.pagination.onChange) return;
  props.pagination.onChange(page, props.pagination.pageSize);
}
</script> 