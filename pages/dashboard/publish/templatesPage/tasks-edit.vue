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
            <el-select v-model="formData.language" placeholder="请选择语言" :disabled="Number(formData.postingTemplateId)>0">
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
              <el-select v-model="formData.categoryId" @change="categoryChange" :disabled="Number(formData.postingTemplateId)>0">
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
                :initial-data="formData.categoryAttributes"
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
              v-model="formData.mainImage"
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
              v-model="formData.descImage"
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
              v-model="formData.materialImage"
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
                          v-for="item in colorList"
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
                  <el-table-column prop="sys" label="尺码" align="center" />
                  <el-table-column prop="" label="刊登尺码" align="center">
                    <template #default="{ row }">
                      <el-select
                        style="width: 350px"
                        v-model="row.plateId"
                        placeholder="请选择"
                        clearable
                        filterable
                      >
                        <el-option
                          v-for="item in sizeList"
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
                label="尺码表"
                label-class-name="descriptionsLabel"
              >
                <el-select
                  style="width: 350px"
                  v-model="formData.sizeTableId"
                  placeholder="请选择尺码表模板"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in sizeTemplateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-descriptions-item>
              <el-descriptions-item
                label="模特信息"
                label-class-name="descriptionsLabel"
              >
                <modelSelect
                  v-model="formData.modelInfo"
                  :sizeList="formData.mapperAttribute.sizeMapper"
                  :app-shop-id="formData.appShopId"
                  :app-type="formData.appType"
                />
              </el-descriptions-item>
            </el-descriptions>

            <el-table
              :data="formData.specList"
              style="width: 100%"
              border
              :header-cell-style="{
                background: 'var(--el-fill-color-light)',
                color: '#606266',
              }"
            >
              <el-table-column prop="color" label="颜色" align="center">
                <template #header>
                  <div>
                    <span style="color: red; margin-right: 5px">*</span>
                    <span>颜色</span>
                  </div>
                </template>
                <template #default="{ row }">
                  <div class="tableCheckBox">
                    <el-input
                      v-model.trim="row.color"
                      placeholder="请输入颜色"
                    />
                    <div v-if="!tableCheck && !row.color" class="checkText">
                      必填
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- 尺码 -->
              <el-table-column prop="size" label="尺码" align="center">
                <template #header>
                  <div>
                    <span style="color: red; margin-right: 5px">*</span>
                    <span>尺码</span>
                  </div>
                </template>
                <template #default="{ row }">
                  <div class="tableCheckBox">
                    <el-input
                      v-model.trim="row.size"
                      placeholder="请输入尺码"
                    />
                    <div v-if="!tableCheck && !row.size" class="checkText">
                      必填
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- sku图 -->
              <el-table-column
                prop="specImageUrl"
                label="SKU图"
                width="150px"
                align="center"
              >
                <template #header>
                  <div>
                    <span style="color: red; margin-right: 5px">*</span>
                    <span>SKU图</span>
                  </div>
                </template>
                <template #default="{ row }">
                  <div class="tableCheckBox">
                    <ProductImage
                      v-model="row.specImageUrl"
                      :limit="1"
                      :draggable="false"
                      :uploadMethod="['local']"
                      localText="上传图片"
                    />
                    <div
                      v-if="!tableCheck && !row.specImageUrl.length"
                      class="checkText"
                    >
                      必填
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- 重量 -->
              <el-table-column
                prop="weight"
                label="重量"
                align="center"
                width="150"
              >
                <template #header>
                  <div>
                    <span style="color: red; margin-right: 5px">*</span>
                    <span>重量</span>
                  </div>
                </template>
                <template #default="{ row }">
                  <div class="tableCheckBox">
                    <el-input-number
                      style="width: 100%"
                      v-model="row.weight"
                      :min="0"
                      :max="10000"
                      :precision="1"
                      controls-position="right"
                      placeholder="请输入"
                    />
                    <div
                      v-if="!tableCheck && !row.weight && row.weight !== 0"
                      class="checkText"
                    >
                      必填
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- 最长边 -->
              <el-table-column
                prop="longestSide"
                label="最长边"
                align="center"
                width="150"
              >
                <template #header>
                  <div>
                    <span style="color: red; margin-right: 5px">*</span>
                    <span>最长边</span>
                  </div>
                </template>
                <template #default="{ row }">
                  <div class="tableCheckBox">
                    <el-input-number
                      style="width: 100%"
                      v-model="row.longestSide"
                      :min="0"
                      :max="10000"
                      :precision="1"
                      controls-position="right"
                      placeholder="请输入"
                    />
                    <div
                      v-if="
                        !tableCheck && !row.longestSide && row.longestSide !== 0
                      "
                      class="checkText"
                    >
                      必填
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- 最短边 -->
              <el-table-column
                prop="shortestSide"
                label="最短边"
                align="center"
                width="150"
              >
                <template #header>
                  <div>
                    <span style="color: red; margin-right: 5px">*</span>
                    <span>最短边</span>
                  </div>
                </template>
                <template #default="{ row }">
                  <div class="tableCheckBox">
                    <el-input-number
                      style="width: 100%"
                      v-model="row.shortestSide"
                      :min="0"
                      :max="10000"
                      :precision="1"
                      controls-position="right"
                      placeholder="请输入"
                    />
                    <div
                      v-if="
                        !tableCheck &&
                        !row.shortestSide &&
                        row.shortestSide !== 0
                      "
                      class="checkText"
                    >
                      必填
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- 次长边 -->
              <el-table-column
                prop="secondLongestSide"
                label="次长边"
                align="center"
                width="150"
              >
                <template #header>
                  <div>
                    <span style="color: red; margin-right: 5px">*</span>
                    <span>次长边</span>
                  </div>
                </template>
                <template #default="{ row }">
                  <div class="tableCheckBox">
                    <el-input-number
                      style="width: 100%"
                      v-model="row.secondLongestSide"
                      :min="0"
                      :max="10000"
                      :precision="1"
                      controls-position="right"
                      placeholder="请输入"
                    />
                    <div
                      v-if="
                        !tableCheck &&
                        !row.secondLongestSide &&
                        row.secondLongestSide !== 0
                      "
                      class="checkText"
                    >
                      必填
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- 库存 -->
              <el-table-column
                prop="stock"
                label="库存"
                align="center"
                width="150"
              >
                <template #header>
                  <div>
                    <span style="color: red; margin-right: 5px">*</span>
                    <span>库存</span>
                  </div>
                </template>
                <template #default="{ row }">
                  <div class="tableCheckBox">
                    <el-input-number
                      style="width: 100%"
                      v-model="row.stock"
                      :min="0"
                      :max="10000"
                      :precision="0"
                      controls-position="right"
                      placeholder="请输入"
                    />
                    <div
                      v-if="!tableCheck && !row.stock && row.stock !== 0"
                      class="checkText"
                    >
                      必填
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- 售价 -->
              <el-table-column
                prop="sellPrice"
                label="售价"
                align="center"
                width="230"
              >
                <template #header>
                  <div>
                    <span style="color: red; margin-right: 5px">*</span>
                    <span>售价</span>
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="默认售价为平台售价，可修改"
                      placement="top"
                    >
                      <el-icon><WarningFilled /></el-icon>
                    </el-tooltip>
                  </div>
                </template>
                <template #default="{ row }">
                  <div style="display: flex; justify-content: center">
                    <div class="tableCheckBox">
                      <el-input-number
                        style="width: 100px"
                        v-model="row.sellPrice"
                        :min="0"
                        :precision="2"
                        controls-position="right"
                        placeholder="请输入"
                      />
                      <div
                        v-if="!tableCheck && !row.price && row.price !== 0"
                        class="checkText"
                      >
                        必填
                      </div>
                    </div>
                    <div class="tableCheckBox">
                      <el-select
                        style="width: 100px"
                        v-model="row.sellPriceCurrency"
                        placeholder="请选择"
                        clearable
                        filterable
                      >
                        <el-option label="CNY" value="CNY" />
                      </el-select>
                      <div
                        v-if="!tableCheck && !row.priceCurrency"
                        class="checkText"
                      >
                        必填
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="suggestedPrice"
                label="参考价"
                align="center"
                width="230"
              >
                <template #header>
                  <div>
                    <span style="color: red; margin-right: 5px">*</span>
                    <span>参考价</span>
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="默认参考价为平台参考价，可修改"
                      placement="top"
                    >
                      <el-icon><WarningFilled /></el-icon>
                    </el-tooltip>
                  </div>
                </template>
                <template #default="{ row }">
                  <div style="display: flex; justify-content: center">
                    <div class="tableCheckBox">
                      <el-input-number
                        style="width: 100px"
                        v-model="row.suggestedPrice"
                        :min="0"
                        :precision="2"
                        controls-position="right"
                        placeholder="请输入"
                      />
                      <div
                        v-if="
                          !tableCheck &&
                          !row.suggestedPrice &&
                          row.suggestedPrice !== 0
                        "
                        class="checkText"
                      >
                        必填
                      </div>
                    </div>
                    <div class="tableCheckBox">
                      <el-select
                        style="width: 100px"
                        v-model="row.suggestPriceCurrency"
                        placeholder="请选择"
                        clearable
                        filterable
                      >
                        <el-option label="CNY" value="CNY" />
                      </el-select>
                      <div
                        v-if="!tableCheck && !row.suggestPriceCurrency"
                        class="checkText"
                      >
                        必填
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- 编码 -->
              <el-table-column prop="code" label="编码" align="center" />
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
  doGetCategoryList,
  doTaskUpdate,
  doGetAttributeList,
  doGetSizeTableList,
} from "~/apis/finance/publish";
import ProductAttrs from "./ProductAttrs.vue";
import ProductImage from "./ProductImage.vue";
import PublicInfo from "./PublicInfo.vue";
import modelSelect from "./model.vue";
import { WarningFilled } from "@element-plus/icons-vue";

const formRef = ref();
const productAttrsRef = ref();
const publicInfoRef = ref();
const tableCheck = ref(true);

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
  categoryAttributes: any[];
  publicInformation: {};
  mainImage: any[]; // 主图
  descImage: any[]; // 详情图
  materialImage: any[]; // 素材图
  mapperAttribute: {};
  specList: any[];
  sizeTableId: string;
  modelInfo: {};
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
  categoryAttributes: [],
  publicInformation: {},
  mainImage: [], // 主图
  descImage: [], // 详情图
  materialImage: [], // 素材图
  mapperAttribute: {
    // 规格
    colorMapper: [],
    sizeMapper: [],
  },
  specList: [
    {
      id: "",
      color: "", //颜色
      size: "", //尺码
      price: "", //售价
      code: "", //编码
      specImageUrl: [], //sku图
      specName: "", //规格名称
      specAttribute: "", //规格属性
      sellPriceCurrency: "", //售价货币
      suggestPriceCurrency: "", //建议售价货币
      suggestedPrice: "", //建议售价
    },
  ], // 规格信息
  sizeTableId: "", // 尺码表ID
  modelInfo: {},
});

const rules = reactive({
  language: [{ required: true, message: "模板语言不能为空", trigger: "blur" }],
  productTitle: [
    { required: true, message: "商品标题不能为空", trigger: "blur" },
  ],
  categoryId: [
    { required: true, message: "商品类目不能为空", trigger: "blur" },
  ],
  mainImage: [{ required: true, message: "主图不能为空", trigger: "blur" }],
  descImage: [{ required: true, message: "详情图不能为空", trigger: "blur" }],
  materialImage: [
    { required: true, message: "素材图不能为空", trigger: "blur" },
  ],
});

// 初始化页面，判断是新建还是编辑
onMounted(async () => {
  getLanguageList();
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
    // 获取规格属性列表
    await getAttributeList(data.appType, data.appShopId, data.categoryId, 2);
    // 获取尺码表列表
    await getSizeTemplateList(data.appType, data.appShopId, data.categoryId);

    // 更新表单数据
    const { mainImages, descImages, ...restData } = data;
    Object.assign(formData, restData);
    formData.mainImage = mainImages;
    formData.descImage = descImages;
    // 更新规格列表数据
    formData.specList = data.specList.map((spec) => ({
      id: spec.id,
      color: spec.specName,
      size: spec.specAttribute,
      price: spec.price,
      sellPrice: spec.sellPrice/10000,
      code: spec.code,
      specImageUrl: [spec.specImageUrl], // 转换为数组格式
      specName: spec.specName,
      specAttribute: spec.specAttribute,
      sellPriceCurrency: spec.sellPriceCurrency,
      suggestPriceCurrency: spec.suggestPriceCurrency,
      suggestedPrice: spec.suggestedPrice/10000,
      weight: spec.extra?.weight || undefined,
      longestSide:
        spec.extra?.volume && spec.extra.volume.longestSide
          ? spec.extra.volume.longestSide
          : undefined,
      shortestSide:
        spec.extra?.volume && spec.extra.volume.shortestSide
          ? spec.extra.volume.shortestSide
          : undefined,
      secondLongestSide:
        spec.extra?.volume && spec.extra.volume.secondLongestSide
          ? spec.extra.volume.secondLongestSide
          : undefined,
      stock: spec.extra?.stock || undefined,
    }));
  } catch (error) {
    console.error("获取模板数据失败", error);
  }
}
// 保存模板
async function save() {
   const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })  
  try {
    formRef.value.validate(async (valid) => {
      if (!valid) return;
      // 规格信息校验
      tableCheck.value = !formData.specList.some(
        (item) =>
          !item.color ||
          !item.specImageUrl.length ||
          !item.size ||
          (!item.weight && item.weight !== 0) ||
          (!item.longestSide && item.longestSide !== 0) ||
          (!item.longestSide && item.longestSide !== 0) ||
          (!item.shortestSide && item.shortestSide !== 0) ||
          (!item.shortestSide && item.shortestSide !== 0) ||
          (!item.secondLongestSide && item.secondLongestSide !== 0) ||
          (!item.stock && item.stock !== 0) ||
          (!item.sellPrice && item.sellPrice !== 0) ||
          !item.sellPriceCurrency ||
          (!item.suggestedPrice && item.suggestedPrice !== 0) ||
          !item.suggestPriceCurrency
      );
      if (!tableCheck.value) return ElMessage.warning("规格信息不完整");
      // 验证 ProductAttrs 组件的表单
      const attrsValidation = await productAttrsRef.value?.validate();
      if (!attrsValidation) return;

      // 验证颜色关联
      if (formData.mapperAttribute.colorMapper.some((v) => !v.plateId))
        return ElMessage.warning("颜色关联不能为空");

      // 验证尺码关联
      if (formData.mapperAttribute.sizeMapper.some((v) => !v.plateId))
        return ElMessage.warning("尺码关联不能为空");

      // 验证尺码表
      if (!formData.sizeTableId) return ElMessage.warning("尺码表不能为空");

      // 验证模特信息
      if (!formData.modelInfo.id) return ElMessage.warning("模特信息不能为空");

      // 验证 PublicInfo 组件的表单
      const publicInfoValidation = await publicInfoRef.value?.validateForm();
      if (!publicInfoValidation) return;

      const newFormData = {}
      Object.assign(newFormData, formData);
      const data: any = {
        ...newFormData,
        specList: JSON.parse(JSON.stringify(formData.specList)),
      };
      // 颜色
      data.mapperAttribute.colorMapper.forEach((v) => {
        v.plate = colorList.value.find(
          (vv) => vv.valueId == v.plateId
        )?.valueName;
      });
      // 尺码
      data.mapperAttribute.sizeMapper.forEach((v) => {
        v.plate = sizeList.value.find(
          (vv) => vv.valueId == v.plateId
        )?.valueName;
      });
      data.sizeTableName = sizeTemplateList.value.find(v => v.id == data.sizeTableId)?.name
     //   data.specList[0].specImageUrl = formData.specList[0].specImageUrl[0];
     // 规格数据格式处理
      data.specList = data.specList.map(spec => ({
            id: spec.id,
            specName: spec.color,
            specAttribute: spec.size,
            sellPrice: spec.sellPrice*10000,
            sellPriceCurrency: spec.sellPriceCurrency, 
            suggestedPrice: spec.suggestedPrice*10000,
            suggestPriceCurrency: spec.suggestPriceCurrency,
            code: spec.code,
            specImageUrl: spec.specImageUrl[0], 
            extra: {
                stock: spec.stock,
                weight: spec.weight,
                volume: {
                    longestSide: spec.longestSide,
                    shortestSide: spec.shortestSide,
                    secondLongestSide: spec.secondLongestSide,
                },
            },
        }));

      data.categoryLinkage = categoryList.value.find(
        v => v.categoryId == data.categoryId
      )?.categoryLinkage;
    //   data.modelInfo.mannequin.info = JSON.stringify(data.modelInfo.mannequin.info);

      const { success, msg } = await doTaskUpdate(data);
      if (!success) return ElMessage.error(msg);
      loading.close()
      ElMessage.success("保存成功");
      // 保存成功后返回列表页
      router.push("/dashboard/publish/tasks");
    });
  } catch (error) {
    ElMessage.error("保存失败");
    loading.close()
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
  // 刊登颜色和尺码置空
  formData.mapperAttribute.colorMapper.forEach(item=>{
    item.plateId = "";
    item.plate = "";
  })
  formData.mapperAttribute.sizeMapper.forEach(item=>{
    item.plateId = "";
    item.plate = "";
  })
};
const languageOptions = ref([]);
// 获取模板语言列表
const getLanguageList = async () => {
  const { data } = await doGetTemplateLanguageList();
  languageOptions.value = data.languageList || [];
};
const colorList = ref([]);
const sizeList = ref([]);
// 获取刊登颜色和尺码
const getAttributeList = async (
  appType: string,
  appShopId: string,
  categoryId: string,
  attributeType: number
) => {
  const params = {
    appType,
    appShopId,
    categoryId,
    attributeType, //2:规格属性
  };
  const { data } = await doGetAttributeList(params);
  colorList.value = data.attributeList.find(
    (v) => v.attributeName == "颜色"
  ).valueList;
  sizeList.value = data.attributeList.find(
    (v) => v.attributeName == "尺码"
  ).valueList;
};
const sizeTemplateList = ref([]);
// 获取尺码表
const getSizeTemplateList = async (
  appType: string,
  appShopId: string,
  categoryId: string
) => {
  const params = {
    appType,
    appShopId,
    categoryId,
  };
  const { data } = await doGetSizeTableList(params);
  sizeTemplateList.value = data.sizeTableList || [];
};

const categoryList = ref([]);
// 获取商品类目
const getCategoryList = async (appType: number) => {
  const { data } = await doGetCategoryList({ appType });
  categoryList.value = data.categoryList || [];
};
// 获取商品属性参数
const handleAttrFormat = (params: any) => {
  formData.categoryAttributes = params;
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

.tableCheckBox {
  position: relative;
  padding: 20px 0;

  .checkText {
    font-size: 12px;
    color: #f56c6c;
    position: absolute;
    left: 0;
    bottom: 0px;
  }
}
</style>
