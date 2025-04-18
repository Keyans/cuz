<template>
  <div class="container mx-auto py-6 px-4">
    <div class="flex justify-between items-center mb-6 flex-wrap">
      <h1 class="text-2xl font-bold">刊登任务</h1>
    </div>

    <!-- 筛选器 -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">搜索</label>
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="请输入商品标题"
            />
            <button v-if="searchQuery" @click="clearSearch" class="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">所属店铺</label>
          <el-select
            v-model="selectedStores"
            multiple
            collapse-tags
            collapse-tags-tooltip
            placeholder="请选择"
            clearable
            class="w-full"
          >
            <el-option
              v-for="item in storeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="flex flex-col items-end justify-end">
          <div class="flex space-x-2 w-full">
            <button @click="clearFilters" class="btn-outline flex-1 py-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              清除筛选
            </button>
            <button @click="applyFilters" class="btn-primary flex-1 py-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              搜索
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 状态标签 -->
    <div class="flex mb-4 overflow-x-auto whitespace-nowrap py-2">
      <div 
        v-for="(tab, index) in statusTabs" 
        :key="index"
        :class="[
          'cursor-pointer px-4 py-2 text-center min-w-[100px] rounded-md mr-2',
          activeStatusTab === index ? 'bg-blue-50 text-blue-600 font-medium' : 'bg-white text-gray-600'
        ]"
        @click="activeStatusTab = index"
      >
        {{ tab.label }} ({{ tab.count }})
      </div>
    </div>

    <!-- 批量操作按钮 -->
    <div class="flex space-x-4 mb-4">
      <button 
        class="btn-primary px-4 py-2" 
        :disabled="!selectedRows.length" 
        :class="{'opacity-50 cursor-not-allowed': !selectedRows.length}"
      >
        批量发布
      </button>
      <button 
        class="btn-danger px-4 py-2" 
        :disabled="!selectedRows.length" 
        :class="{'opacity-50 cursor-not-allowed': !selectedRows.length}"
      >
        批量删除
      </button>
    </div>

    <!-- 任务列表 -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-3 py-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" 
                  :checked="selectedRows.length === taskData.length && taskData.length > 0"
                  @change="toggleSelectAll"
                />
              </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                商品信息
              </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                所属店铺
              </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                sku货号
              </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                时间
              </th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody v-if="taskData.length > 0" class="bg-white divide-y divide-gray-200">
            <tr v-for="task in taskData" :key="task.id" class="hover:bg-gray-50">
              <td class="px-3 py-4 whitespace-nowrap">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" 
                  :checked="selectedRows.includes(task.id)"
                  @change="toggleSelectRow(task.id)"
                />
              </td>
              <td class="px-3 py-4">
                <div class="flex items-start">
                  <img :src="task.image" alt="product" class="h-16 w-16 rounded object-cover mr-3" />
                  <div class="flex flex-col">
                    <div class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{{ task.title }}</div>
                    <div class="text-sm text-gray-500">ID: {{ task.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-3 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="text-sm text-gray-900">{{ task.store }}</span>
                </div>
              </td>
              <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ task.sku }}
              </td>
              <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex flex-col">
                  <span>创建时间: {{ task.createdAt }}</span>
                  <span>更新时间: {{ task.updatedAt }}</span>
                </div>
              </td>
              <td class="px-3 py-4 whitespace-nowrap text-sm">
                <div class="flex space-x-2">
                  <button :class="{'text-blue-600 hover:text-blue-800': task.status === 'pending', 'text-gray-400 cursor-not-allowed': task.status !== 'pending'}">
                    发布
                  </button>
                  <button class="text-blue-600 hover:text-blue-800">编辑</button>
                  <button class="text-red-600 hover:text-red-800">删除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 空数据展示 -->
      <div v-if="taskData.length === 0" class="py-16 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p class="mt-4 text-gray-500">暂无刊登任务数据</p>
        <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          新建刊登任务
        </button>
      </div>
    </div>

    <!-- 分页 -->
    <div class="flex justify-between items-center mt-6 flex-wrap">
      <div class="text-sm text-gray-700 mb-2 md:mb-0">
        显示 {{ (currentPage - 1) * pageSize + 1 }} 到 {{ Math.min(currentPage * pageSize, totalItems) }} 条，共 {{ totalItems }} 条
      </div>
      <nav class="flex space-x-2">
        <button 
          class="px-3 py-1 rounded border hover:bg-gray-100" 
          :disabled="currentPage === 1"
          :class="{'opacity-50 cursor-not-allowed': currentPage === 1}"
          @click="currentPage > 1 && (currentPage--)"
        >
          &lt;
        </button>
        <button 
          v-for="page in displayedPages" 
          :key="page" 
          class="px-3 py-1 rounded border"
          :class="page === currentPage ? 'bg-primary text-white' : 'hover:bg-gray-100'"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
        <button 
          class="px-3 py-1 rounded border hover:bg-gray-100"
          :disabled="currentPage === totalPages"
          :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages}"
          @click="currentPage < totalPages && (currentPage++)"
        >
          &gt;
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑
import { ref, computed, onMounted } from 'vue';

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
});

// 筛选状态
const searchQuery = ref('');
const selectedStores = ref([]);
const storeOptions = ref([
  { value: 'amazon', label: '亚马逊' },
  { value: 'ebay', label: 'eBay' },
  { value: 'shopify', label: 'Shopify' },
  { value: 'temu', label: 'Temu' },
  { value: 'tiktok', label: 'TikTok' }
]);

// 选中行
const selectedRows = ref<string[]>([]);

// 切换全选
const toggleSelectAll = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked;
  if (checked) {
    selectedRows.value = taskData.value.map(task => task.id);
  } else {
    selectedRows.value = [];
  }
};

// 切换单选
const toggleSelectRow = (id: string) => {
  const index = selectedRows.value.indexOf(id);
  if (index === -1) {
    selectedRows.value.push(id);
  } else {
    selectedRows.value.splice(index, 1);
  }
};

// 状态标签
const statusTabs = ref([
  { label: '待发布', count: 3, status: 'pending' },
  { label: '发布中', count: 1, status: 'publishing' },
  { label: '发布失败', count: 1, status: 'failed' },
  { label: '发布成功', count: 1, status: 'success' },
]);
const activeStatusTab = ref(0);

// 分页数据
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(50);

const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));

// 显示的页码按钮
const displayedPages = computed(() => {
  const pages = [];
  const maxDisplayed = 5; // 最多显示5个页码按钮
  
  if (totalPages.value <= maxDisplayed) {
    // 如果总页数小于等于最大显示页数，显示所有页码
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // 计算要显示的页码范围
    let start = Math.max(1, currentPage.value - 2);
    let end = Math.min(totalPages.value, start + maxDisplayed - 1);
    
    // 如果接近尾页，调整起始位置
    if (end === totalPages.value) {
      start = Math.max(1, totalPages.value - maxDisplayed + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }
  
  return pages;
});

// 模拟数据
const taskData = ref([
  {
    id: 'TASK20241',
    title: '短袖t恤男ins潮牌个性潮流百搭半截袖宽松五分袖印花内搭体恤衣服',
    image: 'https://via.placeholder.com/100',
    store: '亚马逊',
    sku: 'outCode whiteM blackS',
    status: 'pending',
    createdAt: '2025-01-08 17:38',
    updatedAt: '2025-01-08 17:38'
  },
  {
    id: 'TASK20242',
    title: '时尚短袖T恤女装春夏新款韩版宽松印花上衣',
    image: 'https://via.placeholder.com/100',
    store: 'eBay',
    sku: 'TS2023001',
    status: 'publishing',
    createdAt: '2025-01-07 14:22',
    updatedAt: '2025-01-08 09:15'
  },
  {
    id: 'TASK20243',
    title: '儿童连帽卫衣春秋装男童套头上衣',
    image: 'https://via.placeholder.com/100',
    store: 'Shopify',
    sku: 'KD2023005',
    status: 'failed',
    createdAt: '2025-01-06 11:45',
    updatedAt: '2025-01-06 16:30'
  },
  {
    id: 'TASK20244',
    title: '男士休闲裤直筒宽松工装裤',
    image: 'https://via.placeholder.com/100',
    store: 'TikTok',
    sku: 'MP2023010',
    status: 'success',
    createdAt: '2025-01-05 09:20',
    updatedAt: '2025-01-05 12:45'
  },
  {
    id: 'TASK20245',
    title: '女士牛仔外套春秋款宽松短款上衣',
    image: 'https://via.placeholder.com/100',
    store: 'Temu',
    sku: 'WJ2023015',
    status: 'pending',
    createdAt: '2025-01-04 16:50',
    updatedAt: '2025-01-04 16:50'
  }
]);

// 清除搜索
const clearSearch = () => {
  searchQuery.value = '';
};

// 清除所有筛选
const clearFilters = () => {
  searchQuery.value = '';
  selectedStores.value = [];
};

// 应用筛选
const applyFilters = () => {
  // 在实际应用中，这里应该调用API获取筛选后的数据
  console.log('应用筛选:', {
    search: searchQuery.value,
    stores: selectedStores.value
  });
  
  // 重置页码
  currentPage.value = 1;
};

onMounted(() => {
  // 初始化数据，可以在这里调用API获取任务列表
});
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded;
}
.btn-danger {
  @apply bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded;
}
.btn-outline {
  @apply border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .container {
    padding-left: 12px;
    padding-right: 12px;
  }
  
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .btn-primary, .btn-danger, .btn-outline {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }
}
</style>