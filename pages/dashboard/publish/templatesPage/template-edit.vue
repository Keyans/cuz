<template>
  <div class="container mx-auto py-6">
    <!-- 面包屑导航 -->
    <div class="flex items-center mb-6 text-sm">
      <span class="text-gray-600">产品库</span>
      <span class="mx-2 text-gray-400">/</span>
      <span class="text-gray-600 cursor-pointer" @click="$router.push('/dashboard/publish/templates')">刊登模板</span>
      <span class="mx-2 text-gray-400">/</span>
      <span class="text-gray-900 font-medium">{{ isEdit ? '编辑模板' : '创建模板' }}</span>
    </div>

    <!-- 表单部分 -->
    <div class="bg-white rounded-lg shadow mb-6">
      <div class="p-4 lg:p-6">
        <h2 class="text-lg font-medium mb-4">基本信息</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">模板名称：</label>
            <input 
              v-model="formData.templateName" 
              type="text" 
              placeholder="请输入" 
              class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">所属店铺：</label>
            <div class="relative">
              <el-select 
                v-model="formData.appShopId" 
                multiple
                collapse-tags
                collapse-tags-tooltip
                placeholder="请选择店铺"
                class="w-full"
                @change="storesChange"
              >
                <el-option v-for="item in storeOptions" :value="item.shopId" :label="item.shopName" />
              </el-select>
            </div>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">模板语言：</label>
            <div class="relative">
              <el-select 
                v-model="formData.templateLanguage" 
                multiple
                collapse-tags
                collapse-tags-tooltip
                placeholder="请选择语言"
                class="w-full"
              >
              <el-option v-for="item in languageOptions" :value="item.language" :label="item.languageName" />
              </el-select>
            </div>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">模板排序：</label>
            <input 
              v-model="formData.sort" 
              type="number" 
              placeholder="请输入" 
              class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">商品标题：</label>
            <div class="relative">
              <el-input 
                v-model="formData.productTitle" 
                placeholder="请输入商品标题" 
                class="w-full pr-28"
              />
              <el-button 
                class="absolute right-0 top-0 h-full z-10 px-3" 
                @click="openVariableDialog"
                type="primary" 
                plain
              >
                插入变量
              </el-button>
            </div>
          </div>
          <!-- <div class="flex flex-col md:col-span-2">
            <label class="text-sm text-gray-600 mb-1">商品描述：</label>
            <div class="relative">
              <el-input 
                v-model="formData.description" 
                type="textarea" 
                :rows="4" 
                placeholder="请输入商品描述"
                class="w-full" 
              />
              <el-button 
                class="absolute right-2 top-2 z-10" 
                @click="openVariableDialogForDesc"
                type="primary" 
                plain
                size="small"
              >
                插入变量
              </el-button>
            </div>
          </div> -->
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow mb-6">
      <div class="p-4 lg:p-6">
        <h2 class="text-lg font-medium mb-4">类目信息</h2>
        <div class="grid grid-cols-1 md:grid-cols-1 gap-4 lg:gap-6">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">商品类目：</label>
            <div class="relative">
              <select 
                v-model="formData.categoryId" 
                class="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option v-for="item in categoryList" :value="item.categoryId">{{ item.categoryName }}</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="mt-4">
           <!--商品属性组件-->
           <ProductAttrs ref="productAttrsRef" :category-id="formData.categoryId" :app-shop-id="formData.appShopId" :initial-data="formData.attributeList" @formatData="handleAttrFormat"/>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow mb-6">
      <div class="p-4 lg:p-6">
        <h2 class="text-lg font-medium mb-4">商品信息</h2>
        
        <!-- 主图上传 -->
        <div class="mb-6">
          <label class="block text-sm text-gray-700 mb-2">主图：</label>
          <div class="flex items-center text-xs text-gray-500 mb-2">
            <span>按住拖拽可调整顺序，宽高比例 3:4 且宽>=1340px，高>=1785px，图片大小 2M 内，最多上传10张</span>
          </div>
          <ProductImage v-model="formData.mainImageList" :draggable="false" :limit="10" galleryText="效果图" localText="本地图" />
        </div>
        
        <!-- 详情图上传 -->
        <div class="mb-6">
          <label class="block text-sm text-gray-700 mb-2">详情图：</label>
          <div class="flex items-center text-xs text-gray-500 mb-2">
            <span>按住拖拽可调整顺序，图片宽高比例 1/2 ≤ x ≤ 2，图片大小 2M 内，最多上传20张</span>
          </div>
          <ProductImage v-model="formData.detailsImagesList" :draggable="false" :limit="20" galleryText="效果图" localText="本地图" />
        </div>
        
        <!-- 素材图上传 -->
        <div class="mb-6">
          <label class="block text-sm text-gray-700 mb-2">素材图：</label>
          <div class="flex items-center text-xs text-gray-500 mb-2">
            <span>素材图宽高比例 1:1 且宽高均大于800px，图片大小 2M 内，最多上传1张</span>
          </div>
          <ProductImage v-model="formData.materialImageList" :draggable="false" galleryText="效果图" localText="本地图" />
        </div>
        
        <!-- 规格信息 -->
        <div class="mb-6">
          <label class="block text-sm text-gray-700 mb-4">规格信息：</label>
          <el-table :data="specificationInfoList" style="width: 100%" border :header-cell-style="{background: 'var(--el-fill-color-light)',color: '#606266'}">
            <el-table-column prop="color" label="颜色" align="center">
              <template #default="{ row }">
                <el-input disabled placeholder="商品颜色规格" />
              </template>
            </el-table-column>
            <el-table-column prop="size" label="尺码" align="center">
              <template #default="{ row }">
                <el-input disabled placeholder="商品尺码规格" />
              </template>
            </el-table-column>
            <el-table-column prop="specImage" label="SKU图" width="150px" align="center">
              <template #header>
                <div>
                  <span style="color: red; margin-right: 5px">*</span>
                  <span>SKU图</span>
                </div>
              </template>
              <template #default="{ row }">
                <div class="tableCheckBox">
                  <ProductImage v-model="row.specImage" :limit="1" :draggable="false" :uploadMethod="['gallery']" galleryText="插入效果图" />
                  <div v-if="!tableCheck && !row.specImage.length" class="checkText">必填</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="specImage" label="利润" align="center" width="300">
              <template #default="{ row }">
                <el-select v-model="row.profitUnit" class="inline-block mr-2" style="width:100px">
                  <el-option value="percentage" label="百分比" />
                  <el-option value="fixedValue" label="固定数值" />
                </el-select>
                <el-input-number v-model="row.profit" :min="0" :max="1000"  class="inline-block">
                  <template v-if="row.profitUnit==='percentage'" #suffix>
                    <span>%</span>
                  </template>
                </el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="specImage" label="建议零售价" align="center">
              <template #default="{ row }">
                <el-input-number v-model="row.suggestPrice" :min="1" :max="10">
                  <template v-if="row.profitUnit==='percentage'" #suffix>
                    <span>%</span>
                  </template>
                </el-input-number>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow mb-6">
      <div class="p-4 lg:p-6">
        <h2 class="text-lg font-medium mb-4">平台公共信息</h2>
        <PublicInfo ref="PublicInfoRef" :category-id="formData.categoryId" :app-shop-id="formData.appShopId" :initial-data="formData.publicInformation" @formatData="handlePublicInfoFormat"/>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="flex justify-center space-x-4 my-6">
      <ActionButton type="outline" text="取消" @click="cancel" class="w-full md:w-auto px-8" />
      <ActionButton type="primary" text="完成" @click="save" class="w-full md:w-auto px-8" />
    </div>

    <!-- 变量对话框 -->
    <VariableDialog 
      v-model:visible="variableDialogVisible"
      :variable-list="variableList"
      :initial-value="currentEditingText"
      @confirm="handleVariableConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ActionButton from '~/components/common/ActionButton.vue';
import type { InputInstance } from 'element-plus';
import VariableDialog from '~/components/common/VariableDialog.vue';
import { doGetTemplateDetail, doGetTemplateLanguageList, doGetauthorizeList, doGetVariableList, doGetCategoryList } from '~/apis/finance/publish'
import ProductAttrs from './ProductAttrs.vue'
import ProductImage from './ProductImage.vue'
import PublicInfo from './PublicInfo.vue'

// 创建接口类型
interface ImageItem {
  id: string;
  name: string;
  url: string;
  file: File | null;
  uploading: boolean;
  progress: number;
}

interface PackagingImages {
  front: ImageItem | null;
  side: ImageItem | null;
  top: ImageItem | null;
}

interface FormDataType {
  id: string;
  templateName: string;
  store: string;
  stores: string[];
  language: string;
  templateLanguage: string[];
  sort: string;
  productTitle: string;
  description: string;
  category: string;
  categoryId:string;
  appShopId:string;
  attributeList:any[];
  publicInformation:{};
  attributes: {
    material: string;
    features: string[];
    trend: string;
    brand: string;
    process: string[];
    printing: string[];
  };
  mainImageList:any[]; // 主图
  detailsImagesList:any[]; // 详情图
  materialImageList:any[]; // 素材图
  images: {
    main: ImageItem[];
    detail: ImageItem[];
    material: ImageItem[];
    packaging: PackagingImages;
  };
  variants: any[];
  platform: {
    sites: {
      fulfillment: string;
      shipping: string;
    };
    packaging: {
      type: string;
      shape: string;
    };
  };
}

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
});

const route = useRoute();
const router = useRouter();
const isEdit = ref(false);
const templateId = ref('');
// 表单数据
const formData = reactive<FormDataType>({
  id: '',
  templateName: '',
  // store: '',
  // stores: [],
  appType:'',
  // language: '',
  templateLanguage: [],
  sort: '',
  productTitle: '',
  // description: '',
  // category: '',
  categoryId:'',
  appShopId:'',
  attributeList:[],
  publicInformation:{},
  // attributes: {
  //   material: '',
  //   features: ['防摔', '防震'],
  //   trend: '',
  //   brand: '',
  //   process: ['哑光', '标准'],
  //   printing: ['激光', '丝网']
  // },
  mainImageList:[], // 主图
  detailsImagesList:[], // 详情图
  materialImageList:[], // 素材图
  // images: {
  //   main: [
  //     { id: 'main1', name: '主图1', url: 'https://via.placeholder.com/100', file: null, uploading: false, progress: 0 },
  //     { id: 'main2', name: '主图2', url: 'https://via.placeholder.com/100', file: null, uploading: false, progress: 0 }
  //   ],
  //   detail: [
  //     { id: 'detail1', name: '详情1', url: 'https://via.placeholder.com/100', file: null, uploading: false, progress: 0 },
  //     { id: 'detail4', name: '详情4', url: 'https://via.placeholder.com/100', file: null, uploading: false, progress: 0 }
  //   ],
  //   material: [
  //     { id: 'material1', name: '素材图', url: 'https://via.placeholder.com/100', file: null, uploading: false, progress: 0 }
  //   ],
  //   packaging: {
  //     front: null,
  //     side: null,
  //     top: null
  //   }
  // },
  // variants: [],
  // platform: {
  //   sites: {
  //     fulfillment: '',
  //     shipping: ''
  //   },
  //   packaging: {
  //     type: 'hardbox',
  //     shape: 'long',
  //   }
  // }
});

// 规格信息表格
const specificationInfoList = ref<any[]>([{
  color: "", //颜色
  size: "", //尺码
  specImage: [], //sku图
  specName: "", //规格名称
  specAttribute: "", //规格属性
  profit: "", //利润
  profitUnit: "percentage", //利润单位
  suggestPrice: "" //建议售价
}]);

// 主图上传部分
const mainImageInput = ref<HTMLInputElement | null>(null);
const detailImageInput = ref<HTMLInputElement | null>(null);
const materialImageInput = ref<HTMLInputElement | null>(null);
const packagingFrontImageInput = ref<HTMLInputElement | null>(null);

// 标签输入相关
const featureInputVisible = ref(false);
const featureInputValue = ref('');
const featureInputRef = ref<InputInstance>();

const processInputVisible = ref(false);
const processInputValue = ref('');
const processInputRef = ref<InputInstance>();

const printingInputVisible = ref(false);
const printingInputValue = ref('');
const printingInputRef = ref<InputInstance>();

// 变量对话框相关
const variableDialogVisible = ref(false);
const currentEditingField = ref<'productTitle' | 'description'>('productTitle');
const currentEditingText = ref('');

// 触发文件选择
function triggerFileSelect(type: string) {
  switch (type) {
    case 'main':
      mainImageInput.value?.click();
      break;
    case 'detail':
      detailImageInput.value?.click();
      break;
    case 'material':
      materialImageInput.value?.click();
      break;
    case 'packaging-front':
      packagingFrontImageInput.value?.click();
      break;
  }
}

// 处理文件选择
const handleFileSelect = (event: Event, type: string) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;
  
  const file = input.files[0];
  
  // 检查文件类型和大小
  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件');
    return;
  }
  
  if (file.size > 2 * 1024 * 1024) { // 2MB
    alert('图片大小不能超过2MB');
    return;
  }
  
  // 创建图片对象
  const img: ImageItem = {
    id: `${type}-${Date.now()}`,
    name: type === 'main' ? `主图${formData.images.main.length + 1}` :
          type === 'detail' ? `详情${formData.images.detail.length + 1}` :
          type === 'material' ? '素材图' : '正面图',
    url: URL.createObjectURL(file),
    file: file,
    uploading: true,
    progress: 0
  };
  
  // 添加到相应数组
  if (type === 'main') {
    if (formData.images.main.length >= 10) {
      alert('主图最多上传10张');
      return;
    }
    formData.images.main.push(img);
  } else if (type === 'detail') {
    if (formData.images.detail.length >= 20) {
      alert('详情图最多上传20张');
      return;
    }
    formData.images.detail.push(img);
  } else if (type === 'material') {
    if (formData.images.material.length >= 1) {
      alert('素材图最多上传1张');
      return;
    }
    formData.images.material.push(img);
  } else if (type === 'packaging-front') {
    formData.images.packaging.front = img;
  }
  
  // 模拟上传过程
  simulateUpload(img);
  
  // 清空文件输入，以便可以再次选择同一文件
  input.value = '';
}

// 模拟上传过程
function simulateUpload(img: ImageItem) {
  const interval = setInterval(() => {
    img.progress += 10;
    if (img.progress >= 100) {
      clearInterval(interval);
      img.uploading = false;
      // 这里实际项目中应该是上传成功后的回调，获取到服务器返回的URL
      // img.url = response.url;
    }
  }, 300);
}

// 删除图片
const deleteImage = (type: string, id: string) => {
  if (type === 'main') {
    const index = formData.images.main.findIndex(img => img.id === id);
    if (index !== -1) {
      const img = formData.images.main[index];
      if (img.url && img.url.startsWith('blob:')) {
        URL.revokeObjectURL(img.url);
      }
      formData.images.main.splice(index, 1);
    }
  } else if (type === 'detail') {
    const index = formData.images.detail.findIndex(img => img.id === id);
    if (index !== -1) {
      const img = formData.images.detail[index];
      if (img.url && img.url.startsWith('blob:')) {
        URL.revokeObjectURL(img.url);
      }
      formData.images.detail.splice(index, 1);
    }
  } else if (type === 'material') {
    const index = formData.images.material.findIndex(img => img.id === id);
    if (index !== -1) {
      const img = formData.images.material[index];
      if (img.url && img.url.startsWith('blob:')) {
        URL.revokeObjectURL(img.url);
      }
      formData.images.material.splice(index, 1);
    }
  } else if (type === 'packaging-front') {
    if (formData.images.packaging.front) {
      if (formData.images.packaging.front.url.startsWith('blob:')) {
        URL.revokeObjectURL(formData.images.packaging.front.url);
      }
      formData.images.packaging.front = null;
    }
  }
}

// 替换图片
const replaceImage = (type: string, id: string) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  
  input.onchange = (event) => {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;
    
    const file = target.files[0];
    
    // 检查文件类型和大小
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) { // 2MB
      alert('图片大小不能超过2MB');
      return;
    }
    
    // 获取要替换的图片
    let imgToReplace: ImageItem | null = null;
    if (type === 'main') {
      imgToReplace = formData.images.main.find(img => img.id === id) || null;
    } else if (type === 'detail') {
      imgToReplace = formData.images.detail.find(img => img.id === id) || null;
    } else if (type === 'material') {
      imgToReplace = formData.images.material.find(img => img.id === id) || null;
    } else if (type === 'packaging-front') {
      imgToReplace = formData.images.packaging.front;
    }
    
    if (imgToReplace) {
      // 释放之前的URL
      if (imgToReplace.url && imgToReplace.url.startsWith('blob:')) {
        URL.revokeObjectURL(imgToReplace.url);
      }
      
      // 更新图片信息
      imgToReplace.url = URL.createObjectURL(file);
      imgToReplace.file = file;
      imgToReplace.uploading = true;
      imgToReplace.progress = 0;
      
      // 模拟上传
      simulateUpload(imgToReplace);
    }
  };
  
  input.click();
}

// 在组件销毁时清理blob URL
onUnmounted(() => {
  // 清理主图
  formData.images.main.forEach(img => {
    if (img.url && img.url.startsWith('blob:')) {
      URL.revokeObjectURL(img.url);
    }
  });
  
  // 清理详情图
  formData.images.detail.forEach(img => {
    if (img.url && img.url.startsWith('blob:')) {
      URL.revokeObjectURL(img.url);
    }
  });
  
  // 清理素材图
  formData.images.material.forEach(img => {
    if (img.url && img.url.startsWith('blob:')) {
      URL.revokeObjectURL(img.url);
    }
  });
  
  // 清理包装图
  if (formData.images.packaging.front && formData.images.packaging.front.url.startsWith('blob:')) {
    URL.revokeObjectURL(formData.images.packaging.front.url);
  }
});

// 初始化页面，判断是新建还是编辑
onMounted(async () => {
  getLanguageList()
  getStoreList()
  getVariableList();
  if (route.query.id) {
    templateId.value = route.query.id as string;
    isEdit.value = true;
    // 获取模板数据
    await fetchTemplateData(templateId.value);
  }
});

// 模拟获取模板数据
async function fetchTemplateData(id: string) {
  try {
    const { data } = await doGetTemplateDetail({id});

    // 模拟数据
    // const data = {
    //   id: id,
    //   name: 'T恤模板',
    //   store: 'TEMU-PhoneCase',
    //   stores: ['TEMU-PhoneCase', 'TikTok-CaseShop'],
    //   language: 'zh',
    //   languages: ['zh', 'en'],
    //   sort: '0',
    //   title: '高品质手机壳保护套',
    //   description: '优质材料制作，完美贴合手机，有效保护手机不受损伤。',
    //   category: '3C数码配件>手机配件>其他'
    // };
    
    // 更新表单数据
    Object.assign(formData, data);
  } catch (error) {
    console.error('获取模板数据失败', error);
  }
}

// 保存模板
async function save() {
  try {
    // 在保存前把多选的第一个值赋给单选字段，保持兼容性
    // if (formData.stores.length > 0) {
    //   formData.store = formData.stores[0];
    // }
    // if (formData.languages.length > 0) {
    //   formData.language = formData.languages[0];
    // }
    
    if (isEdit.value) {
      // 更新模板
      console.log('更新模板', formData);
    } else {
      // 创建模板
      console.log('创建模板', formData);
    }
    
    // 保存成功后返回列表页
    router.push('/dashboard/publish/templates');
  } catch (error) {
    console.error('保存模板失败', error);
  }
}

// 取消
function cancel() {
  router.push('/dashboard/publish/templates');
}

// 功能特点标签方法
const handleFeatureClose = (tag: string) => {
  formData.attributes.features = formData.attributes.features.filter(item => item !== tag);
};

const showFeatureInput = () => {
  featureInputVisible.value = true;
  nextTick(() => {
    featureInputRef.value!.input!.focus();
  });
};

const handleFeatureConfirm = () => {
  if (featureInputValue.value) {
    if (!formData.attributes.features.includes(featureInputValue.value)) {
      formData.attributes.features.push(featureInputValue.value);
    }
  }
  featureInputVisible.value = false;
  featureInputValue.value = '';
};

// 美体工艺标签方法
const handleProcessClose = (tag: string) => {
  formData.attributes.process = formData.attributes.process.filter(item => item !== tag);
};

const showProcessInput = () => {
  processInputVisible.value = true;
  nextTick(() => {
    processInputRef.value!.input!.focus();
  });
};

const handleProcessConfirm = () => {
  if (processInputValue.value) {
    if (!formData.attributes.process.includes(processInputValue.value)) {
      formData.attributes.process.push(processInputValue.value);
    }
  }
  processInputVisible.value = false;
  processInputValue.value = '';
};

// 印花工艺标签方法
const handlePrintingClose = (tag: string) => {
  formData.attributes.printing = formData.attributes.printing.filter(item => item !== tag);
};

const showPrintingInput = () => {
  printingInputVisible.value = true;
  nextTick(() => {
    printingInputRef.value!.input!.focus();
  });
};

const handlePrintingConfirm = () => {
  if (printingInputValue.value) {
    if (!formData.attributes.printing.includes(printingInputValue.value)) {
      formData.attributes.printing.push(printingInputValue.value);
    }
  }
  printingInputVisible.value = false;
  printingInputValue.value = '';
};

// 打开变量对话框 - 商品标题
const openVariableDialog = () => {
  currentEditingField.value = 'productTitle';
  currentEditingText.value = formData.productTitle;
  variableDialogVisible.value = true;
};

// 打开变量对话框 - 商品描述
const openVariableDialogForDesc = () => {
  currentEditingField.value = 'description';
  currentEditingText.value = formData.description;
  variableDialogVisible.value = true;
};

// 处理变量对话框确认
const handleVariableConfirm = (value: string) => {
  if (currentEditingField.value === 'productTitle') {
    formData.productTitle = value;
  } else if (currentEditingField.value === 'description') {
    formData.description = value;
  }
};

const languageOptions = ref([])
// 获取模板语言列表
const getLanguageList = async () => {
  const { data } = await doGetTemplateLanguageList()
  languageOptions.value = data.languageList || []
}
const storeOptions = ref([])
// 获取店铺列表
const getStoreList = async () => {
  const { data } = await doGetauthorizeList()
  storeOptions.value = data || []
}
const variableList = ref([])
// 获取刊登模版变量列表
const getVariableList = async () => {
  const { data } = await doGetVariableList()
  variableList.value = data || []
}
const categoryList = ref([])
// 获取商品类目
const getCategoryList = async (appType:number)=>{
  const { data } = await doGetCategoryList({appType})
  categoryList.value = data.categoryList || []
}
// TODO 店铺选择获取对应的appType
const storesChange = (val:string)=>{
  // const index = storeOptions.findIndex(item=>item.shopId===val)
  // if(!index) return
  formData.appType = 35;
  // getCategoryList(storeOptions[index].appType)
  getCategoryList(35)
}
// 获取商品属性参数
const handleAttrFormat = (params:any)=>{
  formData.attributeList = params;
}
const handlePublicInfoFormat = (params:any)=>{
  formData.publicInformation = params;
}
</script>

<style>
.el-select {
  width: 100%;
}

.el-tag {
  margin-right: 4px;
  margin-bottom: 4px;
}

.button-new-tag {
  margin-left: 0;
  height: 32px;
  padding-top: 0;
  padding-bottom: 0;
}

/* 移动端样式优化 */
@media (max-width: 768px) {
  .el-select {
    width: 100%;
  }
  
  .container {
    padding-left: 12px;
    padding-right: 12px;
  }
  
  .el-input {
    width: 100%;
  }
  
  .el-tag {
    margin-top: 4px;
  }
}
</style> 