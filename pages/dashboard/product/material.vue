<template>
  <div class="p-6 max-w-full">
    <!-- 顶部标签 -->
    <div class="flex border-b mb-4">
      <div class="px-4 py-2 border-b-2 border-blue-500 text-blue-500 font-medium">图片</div>
      <div class="px-4 py-2 text-gray-500">视频</div>
    </div>
    
    <!-- 主体区域 -->
    <div class="flex">
      <!-- 左侧导航 - 完全按照图片实现 -->
      <div class="w-60 pr-4 border-r flex flex-col h-full">
        <!-- 主体内容 -->
        <div class="flex-1">
          <!-- 我的图片 - 一级菜单 -->
          <div class="flex items-center py-2 hover:bg-gray-100 cursor-pointer">
            <el-icon class="ml-3 mr-2 text-gray-500"><Folder /></el-icon>
            <span class="text-gray-700">我的图片</span>
          </div>
          
          <!-- 店铺图 - 二级菜单（展开状态） -->
          <div class="flex items-center py-2 hover:bg-gray-100 cursor-pointer">
            <el-icon class="ml-4 mr-1 text-gray-500"><ArrowDown /></el-icon>
            <el-icon class="mr-2 text-gray-500"><Folder /></el-icon>
            <span class="text-gray-700">店铺图</span>
          </div>
          
          <!-- 未命名文件夹 - 三级菜单（展开状态） -->
          <div class="flex items-center py-2 pl-10 hover:bg-gray-100 cursor-pointer">
            <el-icon class="mr-1 text-gray-500"><ArrowDown /></el-icon>
            <el-icon class="mr-2 text-gray-500"><Folder /></el-icon>
            <span class="text-gray-700">未命名文件夹</span>
          </div>
          
          <!-- 印花识别图片 - 选中状态 -->
          <div class="flex items-center py-2 pl-14 bg-gray-100 cursor-pointer">
            <el-icon class="mr-2 text-blue-500"><Folder /></el-icon>
            <span class="text-blue-500">印花识别图片</span>
          </div>
          
          <!-- 商品图 - 二级菜单（折叠状态） -->
          <div class="flex items-center py-2 hover:bg-gray-100 cursor-pointer">
            <el-icon class="ml-4 mr-1 text-gray-500"><ArrowRight /></el-icon>
            <el-icon class="mr-2 text-gray-500"><Folder /></el-icon>
            <span class="text-gray-700">商品图</span>
          </div>
          
          <!-- 飞鸽图 - 二级菜单（折叠状态） -->
          <div class="flex items-center py-2 hover:bg-gray-100 cursor-pointer">
            <el-icon class="ml-4 mr-1 text-gray-500"><ArrowRight /></el-icon>
            <el-icon class="mr-2 text-gray-500"><Folder /></el-icon>
            <span class="text-gray-700">飞鸽图</span>
          </div>
          
          <!-- 飞鸽机器人图 - 一级菜单 -->
          <div class="flex items-center py-2 hover:bg-gray-100 cursor-pointer">
            <el-icon class="ml-3 mr-2 text-gray-500"><Folder /></el-icon>
            <span class="text-gray-700">飞鸽机器人图</span>
          </div>
          
          <!-- 商品资质图片 - 一级菜单 -->
          <div class="flex items-center py-2 hover:bg-gray-100 cursor-pointer">
            <el-icon class="ml-3 mr-2 text-gray-500"><Folder /></el-icon>
            <span class="text-gray-700">商品资质图片</span>
          </div>
          
          <!-- 开放平台 - 一级菜单 -->
          <div class="flex items-center py-2 hover:bg-gray-100 cursor-pointer">
            <el-icon class="ml-3 mr-2 text-gray-500"><Folder /></el-icon>
            <span class="text-gray-700">开放平台</span>
          </div>
          
          <!-- 印花识别图片 - 一级菜单 -->
          <div class="flex items-center py-2 hover:bg-gray-100 cursor-pointer">
            <el-icon class="ml-3 mr-2 text-gray-500"><Folder /></el-icon>
            <span class="text-gray-700">印花识别图片</span>
          </div>
          
          <!-- 回收站 - 一级菜单 -->
          <div class="flex items-center py-2 hover:bg-gray-100 cursor-pointer mt-4">
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
      <div class="flex-1 pl-4">
        <!-- 搜索栏 - 按照图片重新设计 -->
        <div class="border border-gray-200 rounded-md mb-4">
          <div class="flex items-center p-3 whitespace-nowrap overflow-x-auto space-x-3">
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
              <el-input 
                size="small"
                v-model="startDateText" 
                placeholder="开始日期"
                class="flex-1"
                readonly
                @click="openDatePicker('start')"
              />
              <span class="mx-1">-</span>
              <el-input 
                size="small"
                v-model="endDateText" 
                placeholder="结束日期"
                class="flex-1"
                readonly
                @click="openDatePicker('end')"
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
              <el-button type="primary" size="small">查询</el-button>
              <el-button size="small" @click="handleReset">重置</el-button>
            </div>
          </div>
        </div>
        
        <!-- 面包屑导航和使用说明 - 移到搜索框下面 -->
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center text-sm">
            <div class="text-gray-600 hover:text-blue-500 cursor-pointer">我的图片</div>
            <div class="mx-1 text-gray-500">&gt;</div>
            <div class="text-gray-600 hover:text-blue-500 cursor-pointer">店铺图</div>
            <div class="mx-1 text-gray-500">&gt;</div>
            <div class="text-gray-600 hover:text-blue-500 cursor-pointer">未命名文件夹</div>
            <div class="mx-1 text-gray-500">&gt;</div>
            <div class="text-gray-800">印花识别图片</div>
          </div>
          <div>
            <el-button link type="primary" size="small">
              <el-icon class="mr-1"><InfoFilled /></el-icon>
              使用说明
            </el-button>
          </div>
        </div>
        
        <!-- 操作工具栏区域 -->
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center space-x-2">
            <el-checkbox v-model="selectAll" @change="handleSelectAllChange">全选</el-checkbox>
            <el-button size="small" :disabled="!hasSelected">批量删除</el-button>
            <el-button size="small" :disabled="!hasSelected">批量移动</el-button>
            <!-- 视图切换按钮移到这里 -->
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
          
          <div class="flex items-center space-x-2">
            <!-- 文件操作按钮 -->
            <el-button size="small" plain>清空文件夹</el-button>
            <el-button size="small" plain>新建文件夹</el-button>
            <el-button size="small" type="primary">上传图片/文件夹</el-button>
          </div>
        </div>
        
        <!-- 图片列表 - 以简单列表模式显示，与图片一致 -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div v-for="(file, index) in files" :key="index" class="relative group">
            <div class="absolute top-2 left-2 z-10" :class="{'opacity-100': file.selected, 'opacity-0 group-hover:opacity-100': !file.selected}">
              <el-checkbox v-model="file.selected" @change="handleItemSelectChange" />
            </div>
            <div class="flex justify-center items-center p-4" :class="{'border-2 border-blue-500': file.selected}" style="height: 200px;">
              <img :src="file.url" :alt="file.name" class="w-full h-full object-cover rounded-md">
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
</script>

<style scoped>

</style>