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
  <el-form ref="formRef" :model="formData" :rules="rules" label-width="auto">
    <div class="bg-white rounded-lg shadow mb-6">
      <div class="p-4 lg:p-6">
        <h2 class="text-lg font-medium mb-4">基本信息</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <el-form-item label="模板名称：" prop="templateName">
              <el-input 
              v-model="formData.templateName" 
              type="text" 
              placeholder="请输入" 
            />
          </el-form-item>
          <el-form-item label="所属店铺：" prop="appShopId">
            <el-select 
                v-model="formData.appShopId" 
                placeholder="请选择店铺"
                class="w-full"
                @change="storesChange"
              >
                <el-option v-for="item in storeOptions" :key="item.id" :value="item.middleGroundShopId" :label="item.thirdPartyShopName" />
              </el-select>
          </el-form-item>
          <el-form-item label="模板语言：" prop="templateLanguage">
             <el-select 
                v-model="formData.templateLanguage" 
                placeholder="请选择语言"
                class="w-full"
              >
              <el-option v-for="item in languageOptions" :value="item.language" :label="item.languageName" />
              </el-select>
          </el-form-item>
          <el-form-item label="模板排序：" prop="sort">
            <el-input-number style="width: 100%" v-model="formData.sort" :min="0" :max="9999" :precision="0"
              controls-position="right" />
          </el-form-item>
          <el-form-item label="商品标题：" prop="productTitle">
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
          </el-form-item>
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
          <el-form-item label="商品类目：" prop="categoryId">
            <el-select 
                v-model="formData.categoryId" 
                @change="categoryChange"
              >
                <el-option v-for="item in categoryList" :key="item.categoryId" :value="item.categoryId" :label="item.categoryName" />
              </el-select>
          </el-form-item>
          
          <div class="mt-4">
           <!--商品属性组件-->
           <ProductAttrs ref="productAttrsRef" 
              :category-id="formData.categoryId" 
              :app-shop-id="formData.appShopId" 
              :app-type="formData.appType" 
              :initial-data="formData.attributeList" 
              @formatData="handleAttrFormat"
            />
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
          <ProductImage v-model="formData.mainImageList" :draggable="true" :limit="10" galleryText="效果图" localText="本地图" />
        </div>
        
        <!-- 详情图上传 -->
        <div class="mb-6">
          <label class="block text-sm text-gray-700 mb-2">详情图：</label>
          <div class="flex items-center text-xs text-gray-500 mb-2">
            <span>按住拖拽可调整顺序，图片宽高比例 1/2 ≤ x ≤ 2，图片大小 2M 内，最多上传20张</span>
          </div>
          <ProductImage v-model="formData.detailsImagesList" :draggable="true" :limit="20" galleryText="效果图" localText="本地图" />
        </div>
        
        <!-- 素材图上传 -->
        <div class="mb-6">
          <label class="block text-sm text-gray-700 mb-2">素材图：</label>
          <div class="flex items-center text-xs text-gray-500 mb-2">
            <span>素材图宽高比例 1:1 且宽高均大于800px，图片大小 2M 内，最多上传1张</span>
          </div>
          <ProductImage v-model="formData.materialImageList" :draggable="true" galleryText="效果图" localText="本地图" />
        </div>
        
        <!-- 规格信息 -->
        <div class="mb-6">
          <label class="block text-sm text-gray-700 mb-4">规格信息：</label>
          <el-table :data="formData.specificationInfoList" style="width: 100%" border :header-cell-style="{background: 'var(--el-fill-color-light)',color: '#606266'}">
            <el-table-column prop="specName" label="颜色" align="center">
              <template #default="{ row }">
                <el-input v-model="row.specName" disabled placeholder="商品颜色规格" />
              </template>
            </el-table-column>
            <el-table-column prop="specAttribute" label="尺码" align="center">
              <template #default="{ row }">
                <el-input v-model="row.specAttribute" disabled placeholder="商品尺码规格" />
              </template>
            </el-table-column>
            <el-table-column prop="specImage" label="SKU图" width="150px" align="center">
              <template #default="{ row }">
                <div class="tableCheckBox">
                  <ProductImage v-model="row.specImage" :disabled="true" :draggable="false"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="sellPrice" label="利润" align="center" width="300">
              <template #default="{ row }">
                <el-select v-model="row.priceType" class="inline-block mr-2" style="width:100px">
                  <el-option :value="1" label="百分比" />
                  <el-option :value="2" label="固定数值" />
                </el-select>
                <el-input-number v-model="row.sellPrice" :min="0" :max="1000"  class="inline-block">
                  <template v-if="row.priceType===1" #suffix>
                    <span>%</span>
                  </template>
                </el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="suggestPrice" label="建议零售价" align="center">
              <template #default="{ row }">
                <el-input-number v-model="row.suggestPrice" :min="1" :max="10">
                  <template v-if="row.priceType===1" #suffix>
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
        <PublicInfo 
           ref="publicInfoRef" 
          :category-id="formData.categoryId" 
          :app-shop-id="formData.appShopId" 
          :app-type="formData.appType" 
          :initial-data="formData.publicInformation" 
          @formatData="handlePublicInfoFormat"
        />
      </div>
    </div>
  </el-form>
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
import { doGetTemplateDetail, doGetTemplateLanguageList, doGetauthorizeList, doGetVariableList, doGetCategoryList, doSaveTemplate } from '~/apis/finance/publish'
import ProductAttrs from './ProductAttrs.vue'
import ProductImage from './ProductImage.vue'
import PublicInfo from './PublicInfo.vue'

const formRef = ref();
const productAttrsRef = ref();
const publicInfoRef = ref();

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
  appType:string;
  templateLanguage: string;
  sort: string;
  productTitle: string;
  categoryId:string;
  categoryLinkage:string;
  appShopId:string;
  attributeList:any[];
  publicInformation:{};
  mainImageList:any[]; // 主图
  detailsImagesList:any[]; // 详情图
  materialImageList:any[]; // 素材图
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
  appType:'',
  templateLanguage: '',
  sort: '',
  productTitle: '',
  categoryId:'',
  categoryLinkage:'',
  appShopId:'',
  attributeList:[],
  publicInformation:{},
  mainImageList:[], // 主图
  detailsImagesList:[], // 详情图
  materialImageList:[], // 素材图
  specificationInfoList:[{
    specName: "", //颜色
    specAttribute: "", //尺码
    specImage: [], //sku图
    sellPrice: "", //利润
    priceType: 1,// 售价类型 1:百分比 2:固定值
    suggestPrice: "" //建议售价
  }]
});

const rules = reactive({
  templateName: [
    { required: true, message: '模板名称不能为空', trigger: "blur" }
  ],
  appShopId: [
    { required: true, message: '所属店铺不能为空', trigger: "blur" }
  ],
  templateLanguage: [
    { required: true, message: '模板语言不能为空', trigger: "blur" }
  ],
  sort: [
    { required: true, message: '模板排序不能为空', trigger: "blur" }
  ],
  productTitle: [
    { required: true, message: '商品标题不能为空', trigger: "blur" }
  ],
  categoryId: [
    { required: true, message: '商品类目不能为空', trigger: "blur" }
  ],
  mainImageList: [
    { required: true, message: '主图不能为空', trigger: "blur" }
  ],
  detailsImagesList: [
    { required: true, message: '详情图不能为空', trigger: "blur" }
  ],
  materialImageList: [
    { required: true, message: '素材图不能为空', trigger: "blur" }
  ]
});

// 变量对话框相关
const variableDialogVisible = ref(false);
const currentEditingField = ref<'productTitle' | 'description'>('productTitle');
const currentEditingText = ref('');

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
    // 更新表单数据
    formData.id = id;
    Object.assign(formData, data);
    formData.productTitle = await getProductTitleNameOrCode(formData.productTitle, variableList.value.basicInformationList, false)
    formData.productTitle = await getProductTitleNameOrCode(formData.productTitle, variableList.value.specList, false)
    formData.attributeList = data.attributeInfo;
    formData.specificationInfoList = data.specificationInfo.map(item => {
      return {
        ...item,
        specImage: [item.specImage]
      }})
    formData.mainImageList = data.mainImages;
    formData.detailsImagesList = data.detailsImages;
    formData.materialImageList = data.materialImages;
    // 获取商品类目列表
    await getCategoryList(formData.appType)
  } catch (error) {
    console.error('获取模板数据失败', error);
  }
}
const getProductTitleCode = (text:string,list:any) => {
  list.forEach(variable => {
    // 使用正则表达式找到匹配的模式并替换
    const regex = new RegExp(`\\{${variable.variableName}\\}`, 'g');
    text = text.replace(regex, `{${variable.variableCode}}`);
  });
  return text;
}
/**
 * 根据给定的文本和变量列表，将文本中的变量名称或代码替换为对应的代码或名称
 *
 * @param text 要处理的文本
 * @param list 包含变量名称和代码的列表，每个变量应包含变量名称（variableName）和变量代码（variableCode）
 * @param fromNameToCode 是否将变量名称替换为变量代码，true 表示替换，false 表示将变量代码替换为变量名称
 * @returns 处理后的文本
 */
const getProductTitleNameOrCode = (text:string, list:any, fromNameToCode:boolean) => {
  if (!list?.length) return text;
  return list.reduce((result, variable) => {
    const source = fromNameToCode ? variable.variableName : variable.variableCode;
    const target = fromNameToCode ? variable.variableCode : variable.variableName;
    const regex = new RegExp(`\\{${source}\\}`, 'g');
    return result.replace(regex, `{${target}}`);
  }, text);
}
// 保存模板
async function save() {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  }) 
  try {
    formRef.value.validate(async valid => {
      if (!valid){
        ElMessage.error('请先完善基本信息');
        loading.close()
        return;
      } 
      // 验证 ProductAttrs 组件的表单
      const attrsValidation = await productAttrsRef.value?.validate();
      if (!attrsValidation){
        ElMessage.error('请先完善商品属性');
        loading.close()
        return 
      } 
      // 验证 PublicInfo 组件的表单
      const publicInfoValidation = await publicInfoRef.value?.validateForm();
      if (!publicInfoValidation){
        ElMessage.error('请先完善公共信息');
        loading.close()
        return 
      } 

      let productTitleCode = await getProductTitleNameOrCode(formData.productTitle, variableList.value.basicInformationList, true);
      productTitleCode = await getProductTitleNameOrCode(productTitleCode, variableList.value.specList, true);

      const specificationInfoList = formData.specificationInfoList.map(item => {
        return {
          ...item,
          specImage: item.specImage && item.specImage.length > 0 ? item.specImage[0] : {}
        };
      });
      if(!specificationInfoList) {
        ElMessage.error('请先上传规格图')
        loading.close()
      } 

      const { success } = await doSaveTemplate({...formData, productTitle:productTitleCode, specificationInfoList});

      if(success) ElMessage.success('保存成功');
      loading.close()
      // 保存成功后返回列表页
      router.push('/dashboard/publish/templates');
    });
  } catch (error) {
    ElMessage.error('保存失败')
    loading.close()
  }
}

// 取消
function cancel() {
  router.push('/dashboard/publish/templates');
}

// 打开变量对话框 - 商品标题
const openVariableDialog = () => {
  currentEditingField.value = 'productTitle';
  currentEditingText.value = formData.productTitle;
  variableDialogVisible.value = true;
};

// 打开变量对话框 - 商品描述
// const openVariableDialogForDesc = () => {
//   currentEditingField.value = 'description';
//   currentEditingText.value = formData.description;
//   variableDialogVisible.value = true;
// };

// 处理变量对话框确认
const handleVariableConfirm = (value: string) => {
  if (currentEditingField.value === 'productTitle') {
    formData.productTitle = value;
  } else if (currentEditingField.value === 'description') {
    formData.description = value;
  }
};
// 获取分类链路
const categoryChange = ()=>{
  const index = categoryList.value.findIndex(item=>item.categoryId===formData.categoryId)
  if (index !== -1) {
    formData.categoryLinkage = categoryList.value[index].categoryLinkage
  }
}
const languageOptions = ref([])
// 获取模板语言列表
const getLanguageList = async () => {
  const { data } = await doGetTemplateLanguageList()
  languageOptions.value = data.languageList || []
}
const storeOptions = ref([])
// 获取店铺列表
const getStoreList = async () => {
  const { data } = await doGetauthorizeList({appType:'PUBLISH'})
  storeOptions.value = data.records || []
}
const variableList = ref([])
// 获取刊登模版变量列表
const getVariableList = async () => {
  const { data } = await doGetVariableList()
  variableList.value = data || []
}
const categoryList = ref([])
// 获取商品类目
const getCategoryList = async ()=>{
  const { data } = await doGetCategoryList({appType:formData.appType})
  categoryList.value = data.categoryList || []
}
// 店铺选择获取对应的appType
const storesChange = (val:string)=>{
  const index = storeOptions.value.findIndex(item=>item.middleGroundShopId===val)
  if(index===-1) return
  formData.appType = storeOptions.value[index].platformTypeVal;
  nextTick(()=>{
    getCategoryList()
  })
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