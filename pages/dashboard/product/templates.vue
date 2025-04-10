<template>
  <div class="container mx-auto py-6">
    <!-- 面包屑导航 -->
    <div class="flex items-center mb-6 text-sm">
      <span class="text-gray-600">产品库</span>
      <span class="mx-2 text-gray-400">/</span>
      <span class="text-gray-900 font-medium">刊登模板</span>
    </div>

    <!-- 查询区域 -->
    <div class="mb-6">
      <QueryFilter 
        :fields="queryFields"
        :initial-values="queryParams"
        @search="handleSearch"
        @reset="handleReset"
      />
    </div>

    <!-- 操作按钮 -->
    <div class="flex justify-between items-center mb-4">
      <div></div>
      <ActionButton 
        type="primary" 
        @click="handleCreate"
        :icon="PlusIcon"
        text="创建模板"
      />
    </div>

    <!-- 数据表格 -->
    <DataTable 
      :columns="columns"
      :data="tableData"
      :actions="tableActions"
      :pagination="pagination"
      empty-text="暂无模板数据"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, markRaw, h, defineComponent, onMounted } from 'vue';
import QueryFilter from '~/components/common/QueryFilter.vue';
import DataTable from '~/components/common/DataTable.vue';
import ActionButton from '~/components/common/ActionButton.vue';
import { useRouter } from 'vue-router';

// 声明router变量
const router = useRouter();

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
});

interface TemplateRecord {
  id: string;
  name: string;
  store: string;
  category: string;
  language: string;
  sort: string;
  createTime: string;
  updateTime: string;
}

// 查询相关
const queryFields = [
  {
    key: 'search',
    type: 'input' as const,
    placeholder: '模板ID/模板名称/商品SKU'
  },
  {
    key: 'store',
    type: 'select' as const,
    options: [
      { label: '所属店铺', value: '' },
      { label: 'TEMU-PhoneCase', value: 'temu-phonecase' },
      { label: 'TikTok-CaseShop', value: 'tiktok-caseshop' }
    ]
  },
  {
    key: 'language',
    type: 'tag-select' as const,
    options: [
      { label: '模板语言', value: '' },
      { label: '中文', value: 'zh' },
      { label: '英语', value: 'en' }
    ]
  }
];

const queryParams = reactive({
  search: '',
  store: '',
  language: [] as string[]
});

// 表格列定义
const columns = [
  { key: 'id', title: '模板 ID' },
  { key: 'name', title: '模板名称' },
  { key: 'store', title: '所属店铺' },
  { key: 'category', title: '商品分类' },
  { key: 'language', title: '模板语言' },
  { key: 'sort', title: '排序值' },
  { 
    key: 'time', 
    title: '时间', 
    render: defineComponent({
      props: {
        record: Object
      },
      setup(props) {
        return () => {
          const record = props.record as TemplateRecord;
          return h('div', { class: 'space-y-1' }, [
            h('div', { class: 'text-xs' }, [
              h('span', { class: 'text-gray-500' }, '创建时间: '),
              h('span', {}, record.createTime)
            ]),
            h('div', { class: 'text-xs' }, [
              h('span', { class: 'text-gray-500' }, '更新时间: '),
              h('span', {}, record.updateTime)
            ])
          ]);
        };
      }
    })
  }
];

// 模拟数据
const tableData = ref<TemplateRecord[]>([
  {
    id: '5789290',
    name: 'T恤模板',
    store: 'TEMU-PhoneCase',
    category: '3C数码配件>手机配件>其他',
    language: '中文',
    sort: '0',
    createTime: '2025-01-08 17:38',
    updateTime: '2025-01-08 17:38'
  }
]);

// 图标组件
const EditIcon = defineComponent({
  setup() {
    return () => h('svg', { 
      xmlns: 'http://www.w3.org/2000/svg', 
      class: 'h-4 w-4', 
      fill: 'none', 
      viewBox: '0 0 24 24', 
      stroke: 'currentColor' 
    }, [
      h('path', { 
        'stroke-linecap': 'round', 
        'stroke-linejoin': 'round', 
        'stroke-width': '2', 
        d: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' 
      })
    ]);
  }
});

const CopyIcon = defineComponent({
  setup() {
    return () => h('svg', { 
      xmlns: 'http://www.w3.org/2000/svg', 
      class: 'h-4 w-4', 
      fill: 'none', 
      viewBox: '0 0 24 24', 
      stroke: 'currentColor' 
    }, [
      h('path', { 
        'stroke-linecap': 'round', 
        'stroke-linejoin': 'round', 
        'stroke-width': '2', 
        d: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' 
      })
    ]);
  }
});

const DeleteIcon = defineComponent({
  setup() {
    return () => h('svg', { 
      xmlns: 'http://www.w3.org/2000/svg', 
      class: 'h-4 w-4', 
      fill: 'none', 
      viewBox: '0 0 24 24', 
      stroke: 'currentColor' 
    }, [
      h('path', { 
        'stroke-linecap': 'round', 
        'stroke-linejoin': 'round', 
        'stroke-width': '2', 
        d: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' 
      })
    ]);
  }
});

const PlusIcon = defineComponent({
  setup() {
    return () => h('svg', { 
      xmlns: 'http://www.w3.org/2000/svg', 
      class: 'h-5 w-5', 
      fill: 'none', 
      viewBox: '0 0 24 24', 
      stroke: 'currentColor' 
    }, [
      h('path', { 
        'stroke-linecap': 'round', 
        'stroke-linejoin': 'round', 
        'stroke-width': '2', 
        d: 'M12 4v16m8-8H4' 
      })
    ]);
  }
});

// 表格操作按钮
const tableActions = [
  {
    key: 'edit',
    text: '编辑',
    icon: EditIcon,
    onClick: (record: TemplateRecord) => {
      router.push({
        path: '/dashboard/product/template-edit',
        query: { id: record.id }
      });
    }
  },
  {
    key: 'copy',
    text: '复制',
    icon: CopyIcon,
    onClick: (record: TemplateRecord) => {
      console.log('复制模板', record);
    }
  },
  {
    key: 'delete',
    text: '删除',
    type: 'danger' as const,
    icon: DeleteIcon,
    onClick: (record: TemplateRecord) => {
      console.log('删除模板', record);
    }
  }
];

// 分页
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 50,
  totalPages: 5,
  onChange: (page: number, pageSize: number) => {
    pagination.current = page;
    // 在实际应用中，这里应该调用API获取数据
    console.log(`加载第 ${page} 页数据`);
  }
});

// 查询处理函数
function handleSearch(values: any) {
  console.log('查询参数', values);
  // 更新查询参数
  Object.assign(queryParams, values);
  
  // 执行查询
  fetchTemplateList();
}

// 处理重置
const handleReset = () => {
  // 重置查询参数
  queryParams.search = '';
  queryParams.store = '';
  queryParams.language = [];
  
  // 执行查询，获取所有数据
  fetchTemplateList();
};

// 模拟获取模板列表数据
const fetchTemplateList = () => {
  console.log('查询参数:', queryParams);
  
  // 这里应该是API调用获取数据
  // 暂时使用模拟数据
  
  // 进行分页计算
  pagination.total = 50; // 假设总共有50条数据
  pagination.current = 1;
  
  // 更新表格数据
  tableData.value = [
    {
      id: '5789290',
      name: 'T恤模板',
      store: 'TEMU-PhoneCase',
      category: '3C数码配件>手机配件>其他',
      language: '中文',
      sort: '0',
      createTime: '2025-01-08 17:38',
      updateTime: '2025-01-08 17:38'
    }
  ];
};

// 创建模板
function handleCreate() {
  router.push('/dashboard/product/template-edit');
}

// 初始化页面
onMounted(() => {
  // 获取初始数据
  fetchTemplateList();
});
</script>

<style scoped>
  
</style>