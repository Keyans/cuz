<template>
  <div class="p-6 max-w-full">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">素材库</h1>
    </div>
    <!-- 顶部标签 -->
    <div class="flex border-b mb-4">
      <div class="px-4 py-2 border-b-2 border-blue-500 text-blue-500 font-medium">图片</div>
      <div class="px-4 py-2 text-gray-500">视频</div>
    </div>
    
    <!-- 主体区域 -->
    <div class="flex flex-col md:flex-row">
      <!-- 左侧导航 - 完全按照图片实现 -->
      <div class="w-full md:w-60 md:flex-shrink-0 md:pr-4 md:border-r flex flex-col h-full mb-4 md:mb-0">
        <!-- 主体内容 -->
        <div class="flex-1">
          <!-- 树形菜单 -->
          <el-tree
            :data="folderTree"
            :props="{ 
              children: 'children',
              label: 'name',
              disabled: 'disabled'
            }"
            node-key="id"
            highlight-current
            :default-expanded-keys="defaultExpandedKeys"
            :current-node-key="currentNodeKey"
            @node-click="handleNodeClick"
          >
            <template #default="{ node, data }">
              <div class="flex items-center py-1 w-full">
                <el-icon v-if="!data.children || data.children.length === 0" class="mr-2 text-gray-500">
                  <Folder />
                </el-icon>
                <el-icon v-else-if="node.expanded" class="mr-2 text-gray-500">
                  <FolderOpened />
                </el-icon>
                <el-icon v-else class="mr-2 text-gray-500">
                  <Folder />
                </el-icon>
                <span :class="{'text-blue-500': data.id === currentNodeKey, 'text-gray-700': data.id !== currentNodeKey}">
                  {{ node.label }}
                </span>
              </div>
            </template>
          </el-tree>
          
          <!-- 回收站 - 一级菜单 -->
          <div class="flex items-center py-2 hover:bg-gray-100 cursor-pointer mt-4" @click="handleRecycleBin">
            <el-icon class="ml-3 mr-2 text-gray-500"><Delete /></el-icon>
            <span class="text-gray-700">回收站</span>
          </div>
        </div>
        
        <!-- 存储信息 -->
        <div class="pb-4 mt-auto text-sm border-t border-gray-200">
          <div class="flex items-center py-2">
            <span class="ml-3 text-gray-500">4.6GB / 20GB</span>
          </div>
          <div class="flex ml-3">
            <span class="text-blue-500 cursor-pointer mr-2">详情</span>
            <span class="text-blue-500 cursor-pointer">扩容</span>
          </div>
          
          <!-- 进度条 -->
          <div class="ml-3 mr-6 mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div class="bg-blue-500 h-full" style="width: 25%;"></div>
          </div>
        </div>
      </div>
      
      <!-- 右侧内容区 -->
      <div class="flex-1 md:pl-4">
        <!-- 搜索栏 - 移动端和PC端响应式布局 -->
        <div class="border border-gray-200 rounded-md mb-4">
          <!-- PC端水平布局 - 大屏幕显示 -->
          <div class="hidden md:flex md:items-center md:p-3 md:whitespace-nowrap md:overflow-x-auto md:space-x-3">
            <!-- 素材信息 -->
            <div class="flex-shrink-0">
              <span class="text-gray-600 text-sm mr-1">素材信息</span>
            </div>
            
            <!-- 全部类型 -->
            <div class="flex-shrink-0 w-32">
              <el-select 
                v-model="categoryFilter" 
                placeholder="全部类型" 
                class="w-full"
                size="small"
              >
                <el-option label="全部类型" value="" />
                <el-option label="店铺图" value="store" />
                <el-option label="商品图" value="product" />
                <el-option label="飞鸽图" value="pigeon" />
              </el-select>
            </div>
            
            <!-- 请输入名称 -->
            <div class="flex-shrink-0 w-48">
              <el-input 
                v-model="searchKeyword" 
                placeholder="请输入名称" 
                size="small"
                clearable
                class="w-full"
                @keyup.enter="handleSearch"
              />
            </div>
            
            <!-- 审核状态 -->
            <div class="flex-shrink-0">
              <span class="text-gray-600 text-sm mr-1">审核状态</span>
            </div>
            
            <!-- 审核状态选择器 -->
            <div class="flex-shrink-0 w-32">
              <el-select 
                v-model="statusFilter" 
                placeholder="全部" 
                class="w-full"
                size="small"
              >
                <el-option label="全部" value="" />
                <el-option label="已通过" value="approved" />
                <el-option label="待审核" value="pending" />
                <el-option label="未通过" value="rejected" />
              </el-select>
            </div>
            
            <!-- 更新日期 -->
            <div class="flex-shrink-0">
              <span class="text-gray-600 text-sm mr-1">更新日期</span>
            </div>
            
            <!-- 日期选择器 -->
            <div class="flex-shrink-0 flex items-center w-64">
              <el-date-picker
                v-model="startDate"
                type="date"
                placeholder="开始日期"
                format="YYYY/MM/DD"
                size="small"
                class="w-full"
              />
              <span class="mx-1">-</span>
              <el-date-picker
                v-model="endDate"
                type="date"
                placeholder="结束日期"
                format="YYYY/MM/DD"
                size="small"
                class="w-full"
              />
            </div>
            
            <!-- 引用状态 -->
            <div class="flex-shrink-0">
              <span class="text-gray-600 text-sm mr-1">引用状态</span>
            </div>
            
            <!-- 引用状态选择器 -->
            <div class="flex-shrink-0 w-32">
              <el-select 
                v-model="referenceFilter" 
                placeholder="全部" 
                class="w-full"
                size="small"
              >
                <el-option label="全部" value="" />
                <el-option label="已引用" value="referenced" />
                <el-option label="未引用" value="unreferenced" />
              </el-select>
            </div>
            
            <!-- 按钮组 -->
            <div class="flex-shrink-0 ml-auto flex items-center space-x-2">
              <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
              <el-button size="small" @click="handleReset">重置</el-button>
            </div>
          </div>

          <!-- 移动端垂直布局 - 小屏幕显示 -->
          <div class="md:hidden flex flex-col space-y-4 p-4">
            <!-- 素材信息 -->
            <div class="w-full">
              <div class="text-gray-600 mb-2">素材信息</div>
              <div class="flex flex-col gap-3">
                <el-select 
                  v-model="categoryFilter" 
                  placeholder="全部类型" 
                  class="w-full"
                  size="default"
                >
                  <el-option label="全部类型" value="" />
                  <el-option label="店铺图" value="store" />
                  <el-option label="商品图" value="product" />
                  <el-option label="飞鸽图" value="pigeon" />
                </el-select>
                
                <el-input 
                  v-model="searchKeyword" 
                  placeholder="请输入名称" 
                  size="default"
                  clearable
                  class="w-full"
                  @keyup.enter="handleSearch"
                />
              </div>
            </div>
            
            <!-- 审核状态 -->
            <div class="w-full">
              <div class="text-gray-600 mb-2">审核状态</div>
              <el-select 
                v-model="statusFilter" 
                placeholder="全部" 
                class="w-full"
                size="default"
              >
                <el-option label="全部" value="" />
                <el-option label="已通过" value="approved" />
                <el-option label="待审核" value="pending" />
                <el-option label="未通过" value="rejected" />
              </el-select>
            </div>
            
            <!-- 引用状态 -->
            <div class="w-full">
              <div class="text-gray-600 mb-2">引用状态</div>
              <el-select 
                v-model="referenceFilter" 
                placeholder="全部" 
                class="w-full"
                size="default"
              >
                <el-option label="全部" value="" />
                <el-option label="已引用" value="referenced" />
                <el-option label="未引用" value="unreferenced" />
              </el-select>
            </div>
            
            <!-- 更新日期 -->
            <div class="w-full">
              <div class="text-gray-600 mb-2">更新日期</div>
              <div class="flex items-center">
                <el-date-picker
                  v-model="startDate"
                  type="date"
                  placeholder="年/月/日"
                  format="YYYY/MM/DD"
                  class="w-full"
                />
                <span class="mx-2">至</span>
                <el-date-picker
                  v-model="endDate"
                  type="date"
                  placeholder="年/月/日"
                  format="YYYY/MM/DD"
                  class="w-full"
                />
              </div>
            </div>
            
            <!-- 按钮组 -->
            <div class="flex gap-4">
              <el-button type="primary" class="flex-1" @click="handleSearch">搜索</el-button>
              <el-button class="flex-1" @click="handleReset">重置</el-button>
            </div>
          </div>
        </div>
        
        <!-- 面包屑导航和使用说明 - 移到搜索框下面 -->
        <div class="flex flex-wrap sm:flex-nowrap justify-between items-center mb-4 text-xs sm:text-sm">
          <div class="flex items-center overflow-x-auto whitespace-nowrap py-1 w-full sm:w-auto scrollbar-hide">
            <div class="text-gray-600 hover:text-blue-500 cursor-pointer">我的图片</div>
            <div class="mx-1 text-gray-500">&gt;</div>
            <div class="text-gray-600 hover:text-blue-500 cursor-pointer">店铺图</div>
            <div class="mx-1 text-gray-500">&gt;</div>
            <div class="text-gray-600 hover:text-blue-500 cursor-pointer">未命名文件夹</div>
            <div class="mx-1 text-gray-500">&gt;</div>
            <div class="text-gray-800">印花识别图片</div>
          </div>
          <div class="flex-shrink-0 ml-auto mt-1 sm:mt-0">
            <el-button link type="primary" size="small" class="text-xs sm:text-sm">
              <el-icon class="mr-1"><InfoFilled /></el-icon>
              使用说明
            </el-button>
          </div>
        </div>
        
        <!-- 操作工具栏区域 -->
        <div class="mb-4">
          <!-- 上方按钮行 - 小屏幕时调整布局 -->
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div class="flex flex-wrap items-center gap-2 mb-2 sm:mb-0">
              <el-checkbox v-model="selectAll" @change="handleSelectAllChange">全选</el-checkbox>
              <el-button size="small" :disabled="!hasSelected">批量删除</el-button>
              <el-button size="small" :disabled="!hasSelected">批量移动</el-button>
              <!-- 视图切换按钮 -->
              <div class="flex border">
                <div class="px-2 py-1 cursor-pointer" :class="{ 'bg-blue-50 text-blue-500': viewMode === 'grid' }" @click="viewMode = 'grid'">
                  <el-icon><Grid /></el-icon>
                </div>
                <div class="px-2 py-1 cursor-pointer" :class="{ 'bg-blue-50 text-blue-500': viewMode === 'list' }" @click="viewMode = 'list'">
                  <el-icon><List /></el-icon>
                </div>
              </div>
              <!-- 排序选择器 -->
              <el-select v-model="sortOption" size="small" style="width: 120px;">
                <el-option label="最新上传在前" value="newest" />
                <el-option label="最新上传在后" value="oldest" />
                <el-option label="最近更新在前" value="recently_updated_desc" />
                <el-option label="最近更新在后" value="recently_updated_asc" />
                <el-option label="按文件名升序" value="name_asc" />
                <el-option label="按文件名降序" value="name_desc" />
              </el-select>
            </div>
            
            <div class="flex flex-wrap items-center gap-2">
              <!-- 文件操作按钮 -->
              <el-button size="small" plain>清空文件夹</el-button>
              <el-button size="small" plain>新建文件夹</el-button>
              <el-button size="small" type="primary">上传图片/文件夹</el-button>
            </div>
          </div>
        </div>
        
        <!-- 图片列表 - 以简单列表模式显示，与图片一致 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <div v-for="(file, index) in files" :key="index" class="relative group">
            <div class="absolute top-2 left-2 z-10" :class="{'opacity-100': file.selected, 'opacity-0 group-hover:opacity-100': !file.selected}">
              <el-checkbox v-model="file.selected" @change="handleItemSelectChange" />
            </div>
            <div class="flex justify-center items-center border overflow-hidden rounded-md" :class="{'border-2 border-blue-500': file.selected}" style="aspect-ratio: 1/1;">
              <img :src="file.url" :alt="file.name" class="w-full h-full object-cover">
            </div>
            <div class="text-center py-2 truncate">{{ file.name }}</div>
          </div>
        </div>
        
        <!-- 分页 -->
        <div class="flex justify-end items-center mt-4">
          <div class="flex items-center">
            <el-pagination
              v-model:current-page="currentPage"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="17"
              background
              hide-on-single-page
              class="pagination-custom"
            />
            <span class="text-gray-500 text-sm ml-4">共17条</span>
          </div>
        </div>
      </div>
    </div>
  
  <!-- 新建文件夹弹窗 -->
  <el-dialog
    v-model="showCreateFolderDialog"
    title="新建文件夹"
    width="500px"
    destroy-on-close
  >
    <div class="flex mb-4">
      <div class="w-1/3 text-gray-700 flex items-center">上级文件夹</div>
      <div class="w-2/3">
        <el-select 
          v-model="parentFolder" 
          placeholder="请选择上级文件夹" 
          class="w-full"
        >
          <el-option 
            v-for="folder in folderOptions" 
            :key="folder.id" 
            :label="folder.name" 
            :value="folder.id" 
          />
        </el-select>
      </div>
    </div>
    
    <div class="flex mb-4">
      <div class="w-1/3 text-gray-700 flex items-center">文件夹名称</div>
      <div class="w-2/3">
        <el-input 
          v-model="newFolderName" 
          placeholder="请输入文件夹名称"
          maxlength="20"
          show-word-limit
        />
      </div>
    </div>
    
    <template #footer>
      <div class="flex justify-end">
        <el-button @click="showCreateFolderDialog = false">取消</el-button>
        <el-button type="primary" @click="createFolder" :disabled="!newFolderName">确定</el-button>
      </div>
    </template>
  </el-dialog>
</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { FolderOpened, Folder, Picture, Delete, Grid, List, InfoFilled, CircleCheck, Search, Document, ArrowDown, ArrowRight } from '@element-plus/icons-vue';

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

// 筛选和搜索
const categoryFilter = ref('');
const searchKeyword = ref('');
const statusFilter = ref('');
const dateRange = ref<(string | null)[]>([]);
const referenceFilter = ref('');
const sortOption = ref('newest');

// 视图模式（网格或列表）
const viewMode = ref('grid');

// 日期选择器自定义实现
const startDate = ref('');
const endDate = ref('');
const startDateText = ref('');
const endDateText = ref('');
const startDatePicker = ref(null);
const endDatePicker = ref(null);

// 打开日期选择器
const openDatePicker = (type: 'start' | 'end') => {
  if (type === 'start' && startDatePicker.value) {
    (startDatePicker.value as any).focus();
  } else if (type === 'end' && endDatePicker.value) {
    (endDatePicker.value as any).focus();
  }
};

// 处理日期变化
const handleStartDateChange = (date: string) => {
  startDateText.value = date;
  updateDateRange();
};

const handleEndDateChange = (date: string) => {
  endDateText.value = date;
  updateDateRange();
};

// 更新日期范围
const updateDateRange = () => {
  if (startDateText.value && endDateText.value) {
    dateRange.value = [startDateText.value, endDateText.value];
  } else if (startDateText.value) {
    dateRange.value = [startDateText.value];
  } else if (endDateText.value) {
    dateRange.value = [null, endDateText.value];
  } else {
    dateRange.value = [];
  }
};

// 分页
const currentPage = ref(1);

// 选择状态
const selectAll = ref(false);
const hasSelected = computed(() => {
  return folders.value.some(f => f.selected) || files.value.some(f => f.selected);
});

// 处理全选
const handleSelectAllChange = (val: any) => {
  const checked = typeof val === 'boolean' ? val : false;
  folders.value.forEach(folder => folder.selected = checked);
  files.value.forEach(file => file.selected = checked);
};

// 处理单个选择变化
const handleItemSelectChange = () => {
  const allFoldersSelected = folders.value.every(f => f.selected);
  const allFilesSelected = files.value.every(f => f.selected);
  selectAll.value = allFoldersSelected && allFilesSelected && (folders.value.length + files.value.length > 0);
};

// 模拟文件夹数据
const folders = ref([
  { id: 1, name: '店铺图', selected: false },
  { id: 2, name: '商品图', selected: false },
  { id: 3, name: '飞鸽图', selected: false },
  { id: 4, name: '飞鸽机器人图', selected: false },
  { id: 5, name: '商品资质图片', selected: false },
  { id: 6, name: '开放平台', selected: false },
  { id: 7, name: '印花说明图片', selected: false },
]);

// 模拟文件数据
const files = ref([
  { 
    id: 1, 
    name: '商品展示图1.jpg', 
    url: 'https://picsum.photos/300/200?random=1', 
    selected: false 
  },
  { 
    id: 2, 
    name: '产品细节图.jpg', 
    url: 'https://picsum.photos/300/200?random=2', 
    selected: false 
  },
  { 
    id: 3, 
    name: '包装设计图.jpg', 
    url: 'https://picsum.photos/300/200?random=3', 
    selected: false 
  },
  { 
    id: 4, 
    name: '使用说明图.jpg', 
    url: 'https://picsum.photos/300/200?random=4', 
    selected: false 
  },
  { 
    id: 5, 
    name: '场景应用图.jpg', 
    url: 'https://picsum.photos/300/200?random=5', 
    selected: false 
  }
]);

// 搜索处理函数
const handleSearch = () => {
  console.log('搜索关键词:', searchKeyword.value);
  // 这里可以添加搜索逻辑
};

// 新建文件夹弹窗
const showCreateFolderDialog = ref(false);
const newFolderName = ref('');
const parentFolder = ref('');

// 获取所有可用的父文件夹选项
const folderOptions = computed(() => {
  return [
    { id: 'root', name: '我的图片' },
    ...folders.value
  ];
});

// 创建文件夹
const createFolder = () => {
  if (!newFolderName.value) return;
  
  // 添加新文件夹到列表
  const newFolder = {
    id: Date.now(),
    name: newFolderName.value,
    selected: false
  };
  
  folders.value.push(newFolder);
  
  // 关闭弹窗并重置表单
  showCreateFolderDialog.value = false;
  newFolderName.value = '';
  parentFolder.value = '';
};

// 重置函数
const handleReset = () => {
  categoryFilter.value = '';
  searchKeyword.value = '';
  statusFilter.value = '';
  startDateText.value = '';
  endDateText.value = '';
  referenceFilter.value = '';
  sortOption.value = 'newest';
};

// 树形菜单相关
const folderTree = ref([
  {
    id: 1,
    name: '我的图片',
    children: [
      { id: 2, name: '店铺图', children: [] },
      { id: 3, name: '商品图', children: [] },
      { id: 4, name: '飞鸽图', children: [] },
      { id: 5, name: '飞鸽机器人图', children: [] },
      { id: 6, name: '商品资质图片', children: [] },
      { id: 7, name: '开放平台', children: [] },
      { id: 8, name: '印花说明图片', children: [] },
    ]
  },
  { id: 9, name: '未命名文件夹', children: [] },
  { id: 10, name: '印花识别图片', children: [] },
  { id: 11, name: '商品图', children: [] },
  { id: 12, name: '飞鸽图', children: [] },
  { id: 13, name: '飞鸽机器人图', children: [] },
  { id: 14, name: '商品资质图片', children: [] },
  { id: 15, name: '开放平台', children: [] },
]);

const defaultExpandedKeys = ref([1]);
const currentNodeKey = ref(10); // 默认选中印花识别图片

const handleNodeClick = (node: any) => {
  currentNodeKey.value = node.id;
};

const handleRecycleBin = () => {
  // 实现回收站逻辑
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>