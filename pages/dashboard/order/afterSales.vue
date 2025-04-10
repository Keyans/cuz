<template>
  <div class="container mx-auto py-6 px-4">
    <div class="flex items-center mb-6 text-sm text-gray-500">
      <span>订单</span>
      <span class="mx-2">/</span>
      <span class="font-medium text-gray-700">售后管理</span>
    </div>

    <!-- 筛选区域 -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">售后单号：</label>
          <input
            type="text"
            class="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="支持多单号查询，中文文编号，纯数..."
          />
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">订单号：</label>
          <input
            type="text"
            class="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="支持多单号查询，中文文编号，纯数..."
          />
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">售后类型：</label>
          <select class="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="">请选择</option>
            <option value="refund">退款</option>
            <option value="replace">补发</option>
            <option value="return">退款补发</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">物流类型：</label>
          <input 
            type="text" 
            class="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="请输入"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">物流单号：</label>
          <input 
            type="text" 
            class="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="支持多单号查询，中文文编号，纯数..."
          />
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">时间类型：</label>
          <select class="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="">请选择</option>
            <option value="apply">申请时间</option>
            <option value="audit">审核时间</option>
            <option value="process">处理时间</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">时间区间：</label>
          <div class="relative">
            <input 
              type="text" 
              class="border rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="选择时间"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="flex items-end space-x-2 col-span-1 xl:col-span-1">
          <button class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex-1">
            搜索
          </button>
          <button class="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 flex-1">
            重置
          </button>
        </div>
      </div>
    </div>

    <!-- 状态标签 -->
    <div class="mb-6 overflow-x-auto flex">
      <div class="flex space-x-2 min-w-max">
        <div class="cursor-pointer px-5 py-2 rounded-md border border-transparent bg-white text-gray-800 font-medium">
          全部
        </div>
        <div class="cursor-pointer px-5 py-2 rounded-md border border-transparent text-gray-500 hover:bg-gray-50">
          待审核
        </div>
        <div class="cursor-pointer px-5 py-2 rounded-md border border-transparent text-gray-500 hover:bg-gray-50">
          待补发
        </div>
        <div class="cursor-pointer px-5 py-2 rounded-md border border-transparent text-gray-500 hover:bg-gray-50">
          待确认
        </div>
        <div class="cursor-pointer px-5 py-2 rounded-md border border-transparent text-gray-500 hover:bg-gray-50">
          已完成
        </div>
        <div class="cursor-pointer px-5 py-2 rounded-md border border-transparent text-gray-500 hover:bg-gray-50">
          已关闭
        </div>
      </div>
    </div>

    <!-- 表格标记数字 -->
    <div class="relative mb-1">
      <div class="absolute left-0 top-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        1
      </div>
    </div>

    <!-- 售后列表 -->
    <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                售后单号
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                订单号
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                物流单号
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                售后类型
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                申请时间
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                审核时间
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                售后处理时间
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                售后状态
              </th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
                <div class="absolute right-4 top-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  2
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                SH394399484
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                XS33234355
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                XS33234355
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                退款补发
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                2025-01-23 23:21:02
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                2025-01-23 23:21:02
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                2025-01-23 23:21:02
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-green-100 text-green-800">
                  已完成
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-blue-600">
                <div class="flex space-x-3">
                  <a href="#" class="hover:text-blue-800">查看售后</a>
                  <a href="#" class="hover:text-blue-800">订单详情</a>
                </div>
              </td>
            </tr>
            <tr>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                SH394399484
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                XS33234355
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                XS33234355
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                补发
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                2025-01-23 23:21:02
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-pink-100 text-pink-800">
                  待审核
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-blue-600">
                <div class="flex space-x-3">
                  <a href="#" class="hover:text-blue-800">查看售后</a>
                  <a href="#" class="hover:text-blue-800">订单详情</a>
                </div>
              </td>
            </tr>
            <tr>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                SH394399484
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                XS33234355
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                XS33234355
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                退款
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                2025-01-23 23:21:02
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                2025-01-23 23:21:02
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-pink-100 text-pink-800">
                  待补发
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-blue-600">
                <div class="flex space-x-3">
                  <a href="#" class="hover:text-blue-800">查看售后</a>
                  <a href="#" class="hover:text-blue-800">订单详情</a>
                </div>
              </td>
            </tr>
            <tr>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                SH394399484
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                XS33234355
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                XS33234355
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                赔付
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                2025-01-23 23:21:02
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                2025-01-23 23:21:02
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                2025-01-23 23:21:02
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-yellow-100 text-yellow-800">
                  待确认
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-blue-600">
                <div class="flex space-x-3">
                  <a href="#" class="hover:text-blue-800">查看售后</a>
                  <a href="#" class="hover:text-blue-800">订单详情</a>
                  <a href="#" class="hover:text-blue-800">确认收货</a>
                </div>
              </td>
            </tr>
            <tr>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                YT34348434
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                SH394399484
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                SH394399484
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                赔付补发
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                2025-01-23 23:21:02
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                2025-01-23 23:21:02
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                2025-01-23 23:21:02
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-gray-100 text-gray-800">
                  已关闭
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-blue-600">
                <div class="flex space-x-3">
                  <a href="#" class="hover:text-blue-800">查看售后</a>
                  <a href="#" class="hover:text-blue-800">订单详情</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 移动端视图 - 会在小屏幕上显示 -->
      <div class="md:hidden block">
        <div class="p-4 border-b" v-for="i in 5" :key="i">
          <div class="flex justify-between items-center mb-2">
            <div class="text-sm font-medium">SH394399484</div>
            <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md" :class="{
              'bg-green-100 text-green-800': i === 1,
              'bg-pink-100 text-pink-800': i === 2,
              'bg-pink-100 text-pink-800': i === 3,
              'bg-yellow-100 text-yellow-800': i === 4,
              'bg-gray-100 text-gray-800': i === 5
            }">
              {{ ['已完成', '待审核', '待补发', '待确认', '已关闭'][i-1] }}
            </span>
          </div>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div class="text-gray-500">订单号:</div>
            <div>XS33234355</div>
            
            <div class="text-gray-500">物流单号:</div>
            <div>XS33234355</div>
            
            <div class="text-gray-500">售后类型:</div>
            <div>{{ ['退款补发', '补发', '退款', '赔付', '赔付补发'][i-1] }}</div>
            
            <div class="text-gray-500">申请时间:</div>
            <div>2025-01-23 23:21:02</div>
          </div>
          <div class="mt-3 pt-3 border-t border-gray-100 flex space-x-3 text-sm text-blue-600">
            <a href="#" class="hover:text-blue-800">查看售后</a>
            <a href="#" class="hover:text-blue-800">订单详情</a>
            <a href="#" v-if="i === 4" class="hover:text-blue-800">确认收货</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="flex justify-between items-center mt-6 flex-wrap">
      <div class="text-sm text-gray-700 mb-2 md:mb-0">
        <!-- 分页信息 -->
      </div>
      <nav class="inline-flex space-x-1">
        <button class="px-3 py-1 rounded border hover:bg-gray-100">
          &lt;
        </button>
        <button class="px-3 py-1 rounded border bg-blue-600 text-white">
          1
        </button>
        <button class="px-3 py-1 rounded border hover:bg-gray-100">
          2
        </button>
        <button class="px-3 py-1 rounded border hover:bg-gray-100">
          3
        </button>
        <button class="px-3 py-1 rounded border hover:bg-gray-100">
          4
        </button>
        <button class="px-3 py-1 rounded border hover:bg-gray-100">
          5
        </button>
        <button class="px-3 py-1 rounded border hover:bg-gray-100">
          &gt;
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

// 组件逻辑
const activeTab = ref(0);
const searchQuery = ref('');
const selectedType = ref('');
const selectedStatus = ref('');
const selectedDate = ref('');

// 状态标签数据
const statusTabs = ref([
  { id: 0, name: '全部', count: 38 },
  { id: 1, name: '待审核', count: 5 },
  { id: 2, name: '待补发', count: 3 },
  { id: 3, name: '待确认', count: 2 },
  { id: 4, name: '已完成', count: 28 },
  { id: 5, name: '已关闭', count: 0 }
]);

// 分页数据
const currentPage = ref(1);
const totalPages = ref(5);
const totalItems = ref(25);
const itemsPerPage = ref(5);

const changeTab = (index) => {
  activeTab.value = index;
};

const search = () => {
  // 实现搜索逻辑
  console.log('搜索查询:', searchQuery.value);
};

const resetSearch = () => {
  searchQuery.value = '';
  selectedType.value = '';
  selectedStatus.value = '';
  selectedDate.value = '';
};

onMounted(() => {
  // 初始化数据，可调用API获取售后订单列表
});
</script>

<style scoped>
/* 确保表格在小屏幕上可以水平滚动 */
.overflow-x-auto {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .container {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>