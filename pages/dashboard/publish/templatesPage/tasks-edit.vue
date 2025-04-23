<template>
  <div class="container mx-auto py-6">
    <!-- 面包屑导航 -->
    <div class="flex items-center mb-6 text-sm">
      <span class="text-gray-600">产品库</span>
      <span class="mx-2 text-gray-400">/</span>
      <span
        class="text-gray-600 cursor-pointer"
        @click="$router.push('/dashboard/publish/templates')"
        >刊登任务</span
      >
      <span class="mx-2 text-gray-400">/</span>
      <span class="text-gray-900 font-medium">编辑任务</span>
    </div>

    <!-- 表单部分 -->
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="auto">
      <div class="bg-white rounded-lg shadow mb-6">
        <div class="p-4 lg:p-6">
          <h2 class="text-lg font-medium mb-4">基本信息</h2>
          <el-form-item label="所属店铺：">
            <span>{{ formData.appShopName }}</span>
          </el-form-item>
          <el-form-item label="商品标题：" prop="productTitle">
            <el-input
              v-model="formData.productTitle"
              placeholder="请输入商品标题"
              type="textarea"
              maxlength="250"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="模板语言：" prop="language">
            <el-select v-model="formData.language" placeholder="请选择语言">
              <el-option
                v-for="item in languageOptions"
                :value="item.language"
                :label="item.languageName"
              />
            </el-select>
          </el-form-item>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow mb-6">
        <div class="p-4 lg:p-6">
          <h2 class="text-lg font-medium mb-4">类目信息</h2>
          <div class="grid grid-cols-1 md:grid-cols-1 gap-4 lg:gap-6">
            <el-form-item label="商品类目：" prop="categoryId">
              <el-select v-model="formData.categoryId" @change="categoryChange">
                <el-option
                  v-for="item in categoryList"
                  :key="item.categoryId"
                  :value="item.categoryId"
                  :label="item.categoryName"
                />
              </el-select>
            </el-form-item>

            <div class="mt-4">
              <!--商品属性组件-->
              <ProductAttrs
                ref="productAttrsRef"
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
              <span
                >按住拖拽可调整顺序，宽高比例 3:4
                且宽>=1340px，高>=1785px，图片大小 2M 内，最多上传10张</span
              >
            </div>
            <ProductImage
              v-model="formData.mainImageList"
              :draggable="false"
              :limit="10"
              galleryText="效果图"
              localText="本地图"
            />
          </div>

          <!-- 详情图上传 -->
          <div class="mb-6">
            <label class="block text-sm text-gray-700 mb-2">详情图：</label>
            <div class="flex items-center text-xs text-gray-500 mb-2">
              <span
                >按住拖拽可调整顺序，图片宽高比例 1/2 ≤ x ≤ 2，图片大小 2M
                内，最多上传20张</span
              >
            </div>
            <ProductImage
              v-model="formData.detailsImagesList"
              :draggable="false"
              :limit="20"
              galleryText="效果图"
              localText="本地图"
            />
          </div>

          <!-- 素材图上传 -->
          <div class="mb-6">
            <label class="block text-sm text-gray-700 mb-2">素材图：</label>
            <div class="flex items-center text-xs text-gray-500 mb-2">
              <span
                >素材图宽高比例 1:1 且宽高均大于800px，图片大小 2M
                内，最多上传1张</span
              >
            </div>
            <ProductImage
              v-model="formData.materialImageList"
              :draggable="false"
              galleryText="效果图"
              localText="本地图"
            />
          </div>

          <!-- 规格信息 -->
          <div class="mb-6">
            <label class="block text-sm text-gray-700 mb-4">规格信息：</label>
            <el-descriptions :column="1" border>
              <el-descriptions-item
                label="颜色关联"
                label-class-name="descriptionsLabel"
              >
                <el-table
                  :data="formData.mapperAttribute.colorMapper"
                  style="width: 100%"
                  border
                  :header-cell-style="{
                    background: 'var(--el-fill-color-light)',
                    color: '#606266',
                  }"
                >
                  <el-table-column prop="sys" label="颜色" align="center" />
                  <el-table-column
                    prop="plateId"
                    label="刊登颜色"
                    align="center"
                  >
                    <template #default="{ row }">
                      <el-select
                        style="width: 350px"
                        v-model="row.plateId"
                        placeholder="请选择"
                        clearable
                        filterable
                      >
                        <el-option
                          v-for="item in [{ valueId: '1', valueName: '1' }]"
                          :key="item.valueId"
                          :label="item.valueName"
                          :value="item.valueId"
                        />
                      </el-select>
                    </template>
                  </el-table-column>
                </el-table>
              </el-descriptions-item>
              <el-descriptions-item
                label="尺码关联"
                label-class-name="descriptionsLabel"
              >
                <el-table
                  :data="formData.mapperAttribute.sizeMapper"
                  style="width: 100%"
                  border
                  :header-cell-style="{
                    background: 'var(--el-fill-color-light)',
                    color: '#606266',
                  }"
                >
                  <el-table-column
                    prop="sys"
                    label="系统尺码名称"
                    align="center"
                  />
                  <el-table-column prop="" label="平台尺码名称" align="center">
                    <template #default="{ row }">
                      <el-select
                        style="width: 350px"
                        v-model="row.plateId"
                        placeholder="请选择"
                        clearable
                        filterable
                      >
                        <el-option
                          v-for="item in [{ valueId: '1', valueName: '1' }]"
                          :key="item.valueId"
                          :label="item.valueName"
                          :value="item.valueId"
                        />
                      </el-select>
                    </template>
                  </el-table-column>
                </el-table>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow mb-6">
        <div class="p-4 lg:p-6">
          <h2 class="text-lg font-medium mb-4">平台公共信息</h2>
          <PublicInfo
            ref="PublicInfoRef"
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
      <ActionButton
        type="outline"
        text="取消"
        @click="cancel"
        class="w-full md:w-auto px-8"
      />
      <ActionButton
        type="primary"
        text="完成"
        @click="save"
        class="w-full md:w-auto px-8"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import ActionButton from "~/components/common/ActionButton.vue";
import {
  doGetTaskProductDetail,
  doGetTemplateLanguageList,
  doGetauthorizeList,
  doGetCategoryList,
  doTaskUpdate,
} from "~/apis/finance/publish";
import ProductAttrs from "./ProductAttrs.vue";
import ProductImage from "./ProductImage.vue";
import PublicInfo from "./PublicInfo.vue";

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

interface FormDataType {
  id: string;
  appType: string;
  language: string;
  productTitle: string;
  categoryId: string;
  categoryLinkage: string;
  appShopId: string;
  attributeList: any[];
  publicInformation: {};
  mainImageList: any[]; // 主图
  detailsImagesList: any[]; // 详情图
  materialImageList: any[]; // 素材图
  mapperAttribute: {};
  specList: any[];
}

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

const route = useRoute();
const router = useRouter();
// 表单数据
const formData = reactive<FormDataType>({
  id: "",
  appType: "",
  language: "",
  productTitle: "",
  categoryId: "",
  categoryLinkage: "",
  appShopId: "",
  attributeList: [],
  publicInformation: {},
  mainImageList: [], // 主图
  detailsImagesList: [], // 详情图
  materialImageList: [], // 素材图
  mapperAttribute: {
    // 规格
    colorMapper: [],
    sizeMapper: [],
  },
  specList: [], // 规格信息
});

const rules = reactive({
  language: [{ required: true, message: "模板语言不能为空", trigger: "blur" }],
  productTitle: [
    { required: true, message: "商品标题不能为空", trigger: "blur" },
  ],
  categoryId: [
    { required: true, message: "商品类目不能为空", trigger: "blur" },
  ],
  mainImageList: [{ required: true, message: "主图不能为空", trigger: "blur" }],
  detailsImagesList: [
    { required: true, message: "详情图不能为空", trigger: "blur" },
  ],
  materialImageList: [
    { required: true, message: "素材图不能为空", trigger: "blur" },
  ],
});

// 初始化页面，判断是新建还是编辑
onMounted(async () => {
  getLanguageList();
  // getStoreList();
  if (route.query.id) {
    // 获取模板数据
    await fetchTemplateData();
  }
});

// 模拟获取模板数据
async function fetchTemplateData() {
  try {
    const id = route.query.id as string;
    const { data } = await doGetTaskProductDetail(id);
    // 获取商品类目列表
    await getCategoryList(data.appType);
    // 更新表单数据
    Object.assign(formData, data);
    formData.attributeList = data.categoryAttributes;
    formData.mainImageList = data.mainImages;
    formData.detailsImagesList = data.descImages;
    formData.materialImageList = data.materialImage;
    // TODO 规格信息渲染 data.specList
  } catch (error) {
    console.error("获取模板数据失败", error);
  }
}
// 保存模板
async function save() {
  try {
    formRef.value.validate(async (valid) => {
      if (!valid) return;
      // 验证 ProductAttrs 组件的表单
      const attrsValidation = await productAttrsRef.value?.validate();
      if (!attrsValidation) return;
      // 验证 PublicInfo 组件的表单
      const publicInfoValidation = await publicInfoRef.value?.validateForm();
      if (!publicInfoValidation) return;

      const { success } = await doTaskUpdate({ ...formData });

      if (success) ElMessage.success("保存成功");
      // 保存成功后返回列表页
      router.push("/dashboard/publish/tasks");
    });
  } catch (error) {
    ElMessage.error("保存失败");
  }
}

// 取消
function cancel() {
  router.push("/dashboard/publish/tasks");
}

// 获取分类链路
const categoryChange = () => {
  const index = categoryList.value.findIndex(
    (item) => item.categoryId === formData.categoryId
  );
  if (index !== -1) {
    formData.categoryLinkage = categoryList.value[index].categoryLinkage;
  }
};
const languageOptions = ref([]);
// 获取模板语言列表
const getLanguageList = async () => {
  const { data } = await doGetTemplateLanguageList();
  languageOptions.value = data.languageList || [];
};
const storeOptions = ref([]);
// 获取店铺列表
const getStoreList = async () => {
  const { data } = await doGetauthorizeList();
  storeOptions.value = data || [];
};

const categoryList = ref([]);
// 获取商品类目
const getCategoryList = async (appType: number) => {
  const { data } = await doGetCategoryList({ appType });
  categoryList.value = data.categoryList || [];
};
// TODO 店铺选择获取对应的appType
const storesChange = (val: string) => {
  // const index = storeOptions.findIndex(item=>item.shopId===val)
  // if(!index) return
  // getCategoryList(storeOptions[index].appType)
  getCategoryList(35);
};
// 获取商品属性参数
const handleAttrFormat = (params: any) => {
  formData.attributeList = params;
};
const handlePublicInfoFormat = (params: any) => {
  formData.publicInformation = params;
};
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
