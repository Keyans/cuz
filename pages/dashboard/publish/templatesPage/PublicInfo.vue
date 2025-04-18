<template>
  <div v-loading="loading" class="base-info">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="160px">
      <!-- 外层循环：包装信息、产地信息等大分类 -->
      <template v-for="(category, cIndex) in formCategories" :key="cIndex">
        <el-form-item
          v-if="formCategories.length"
          :label="`${category.name}：`"
          :required="category.required"
        >
          <!-- 复杂类型处理 -->
          <template v-if="category.isComplex">
            <div class="public-info">
              <!-- 内层循环：具体的表单项 -->
              <div
                v-for="(item, index) in category.value"
                :key="index"
                class="mb-2"
              >
                <!-- 图片列表组件 inputType = 6 -->
                <el-form-item
                  v-if="item.inputType == 6"
                  :label="item.name"
                  :prop="`attrs.${category.code}.${item.code}`"
                  :required="item.required"
                >
                  <div class="image-upload-group">
                    <div
                      v-for="imageType in item.valueList"
                      :key="imageType.code"
                      class="image-upload-item"
                    >
                      <div class="image-upload-title">{{ imageType.name }}</div>
                      <UploadImg
                        v-model="
                          formData.attrs[category.code][item.code][
                            imageType.code
                          ]
                        "
                        galleryText="插入效果图"
                        localText="上传图片"
                        :limit="1"
                      />
                    </div>
                  </div>
                </el-form-item>

                <!-- 下拉单选组件 inputType = 1 -->
                <el-form-item
                  v-if="item.inputType == 1"
                  :label="item.name"
                  :prop="`attrs.${category.code}.${item.code}`"
                  :required="item.required"
                >
                  <el-select
                    v-model="formData.attrs[category.code][item.code]"
                    :placeholder="`请选择${item.name}`"
                    clearable
                    @change="
                      val => handleComplexSelectChange(val, item.code, category)
                    "
                  >
                    <el-option
                      v-for="option in item.valueList"
                      :key="option.code"
                      :label="option.name"
                      :value="option.code"
                    />
                  </el-select>
                </el-form-item>

                <!-- 单选框组件 inputType = 7 -->
                <el-form-item
                  v-if="item.inputType == 7"
                  :label="item.name"
                  :prop="`attrs.${category.code}.${item.code}`"
                  :required="item.required"
                >
                  <el-radio-group
                    v-model="formData.attrs[category.code][item.code]"
                    @change="
                      val => handleComplexRadioChange(val, item.code, category)
                    "
                  >
                    <el-radio
                      v-for="option in item.valueList"
                      :key="option.code"
                      :label="option.code"
                    >
                      {{ option.name }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
          </template>

          <!-- 简单类型处理 -->
          <template v-else>
            <div v-if="category.inputType == 1">
              <el-select
                v-model="formData.attrs[category.code]"
                @change="val => handleSiteChange(val, category)"
                :placeholder="`请选择${category.name}`"
                style="width: 200px"
              >
                <el-option
                  v-for="option in category.value"
                  :key="option.code"
                  :label="option.name"
                  :value="option.code"
                />
              </el-select>
            </div>
            <div class="select-group" v-if="category.inputType == 4">
              <!-- 国家选择 -->
              <el-form-item
                :prop="`attrs.${category.code}.${category.fieldMapping.first}`"
                :required="category.required"
              >
                <el-select
                  :model-value="
                    formData.attrs[category.code]?.[
                      category.fieldMapping?.first
                    ]
                  "
                  @update:model-value="
                    val => handleFirstLevelChange(val, category)
                  "
                  :placeholder="`请选择${category.name}`"
                  style="width: 200px"
                >
                  <el-option
                    v-for="option in category.value"
                    :key="option.code"
                    :label="option.chineseName || option.name"
                    :value="option.code"
                  />
                </el-select>
              </el-form-item>

              <!-- 省份选择 -->
              <el-form-item
                v-if="showSecondSelect(category)"
                :prop="`attrs.${category.code}.${category.fieldMapping.second}`"
                :required="
                  formData.attrs[category.code]?.[
                    category.fieldMapping?.first
                  ] == '43'
                "
              >
                <el-select
                  :model-value="
                    formData.attrs[category.code]?.[
                      category.fieldMapping?.second
                    ]
                  "
                  @update:model-value="
                    val => handleSecondLevelChange(val, category)
                  "
                  :placeholder="'请选择省份'"
                  style="width: 200px"
                >
                  <el-option
                    v-for="option in getSecondLevelOptions(category)"
                    :key="option.code"
                    :label="option.chineseName"
                    :value="option.code"
                  />
                </el-select>
              </el-form-item>
            </div>

            <!-- 表格类型 inputType=8 -->
            <public-table
              v-if="category.inputType == 8"
              ref="tableRef"
              :site-code="selectedSite"
              :app-shop-id="props.appShopId"
              :table-data="category"
              :initial-value="formData.attrs[category.code]"
              @change="val => handleTableChange(val, category)"
            />

            <!-- 单选radio inputType=7 -->
            <el-form-item
              v-if="category.inputType == 7"
              :label="category.name"
              :required="category.required"
            >
              <el-radio-group
                v-model="formData.attrs[category.code]"
                @change="val => handleRadioChange(val, category.code, category)"
              >
                <el-radio
                  v-for="option in category.value"
                  :key="option.code"
                  :label="option.code"
                >
                  {{ option.name }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </template>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";
// import { debounce } from "@/utils/util";
import { useDebounceFn } from '@vueuse/core';
import UploadImg from "./UploadImg.vue";
import { ElMessage } from "element-plus";
import PublicTable from "./PublicTable.vue";
// import { saasPluginGetPublicInformationList } from "@/api/shop/listingsTemplate";
import { doGetPublicInformationList } from '~/apis/finance/publish'
// import mockPub from "./mockPub.json";

const props = defineProps<{
  categoryId: string | number;
  appShopId: (string | number)[] | undefined;
  appType: number;
  initialData?: any;
}>();

const emit = defineEmits(["update:modelValue", "change", "formatData"]);

const loading = ref(true);
const formRef = ref();
const formCategories = ref([]);
const formData = reactive({
  attrs: {}
});
const rules = reactive({});

const selectedSite = computed(() => formData.attrs?.site || null);

// 修改 formatPublicInformation 中处理表格数据的部分
const formatPublicInformation = (rawData: Record<string, any>) => {
  if (!formCategories.value.length) return {};
  const formattedData = {};

  formCategories.value.forEach(category => {
    if (category.isComplex) {
      formattedData[category.code] = {};

      category.value.forEach(item => {
        if (item.inputType == 6) {
          // 图片类型
          if (!formattedData[category.code][item.code]) {
            formattedData[category.code][item.code] = {};
          }
          item.valueList.forEach(val => {
            formattedData[category.code][item.code][val.code] =
              rawData[category.code]?.[item.code]?.[val.code] || [];
          });
        } else if (item.inputType == 7) {
          // 单选框类型
          formattedData[category.code][item.code] =
            rawData[category.code]?.[item.code] || "";
        } else if (item.inputType == 1) {
          // 下拉单选类型
          formattedData[category.code][item.code] =
            rawData[category.code]?.[item.code] || "";
        }
      });
    } else if (category.fieldMapping) {
      formattedData[category.code] = {
        [category.fieldMapping.first]:
          rawData[category.code]?.[category.fieldMapping.first] || "",
        [category.fieldMapping.second]:
          rawData[category.code]?.[category.fieldMapping.second] || ""
      };
    } else if (category.inputType == 8) {
      // 直接使用原始数据结构
      formattedData[category.code] = rawData[category.code] || [];
    } else if (category.inputType == 1) {
      // 处理站点数据
      formattedData[category.code] = rawData[category.code] || "";
    }
  });

  return formattedData;
};

const initializeFormData = (categories: any[]) => {
  const attrs = {};
  categories.forEach(category => {
    if (category.inputType == 8) {
      // 表格类型（卖家与发货仓关系）初始化为空数组
      attrs[category.code] = [];
    } else if (category.inputType == 1) {
      // 站点类型初始化
      attrs[category.code] = "";
    } else if (category.inputType == 4) {
      // 下拉框类型(如产地信息)
      attrs[category.code] = {
        [category.fieldMapping.first]: "",
        [category.fieldMapping.second]: ""
      };
    } else if (category.isComplex) {
      // 处理复杂类型(包装信息等)
      attrs[category.code] = {};
      category.value.forEach(item => {
        if (item.inputType == 6) {
          // 图片类型
          attrs[category.code][item.code] = {};
          item.valueList.forEach(val => {
            attrs[category.code][item.code][val.code] = [];
          });
        } else if (item.inputType == 7) {
          // 单选框类型
          attrs[category.code][item.code] = "";
        } else if (item.inputType == 1) {
          // 下拉单选类型
          attrs[category.code][item.code] = "";
        }
      });
    }
  });
  return attrs;
};

const loadFormConfig = async () => {
  try {
    const { data } = await doGetPublicInformationList({
      appShopId: props.appShopId,
      appType:props.appType,
    });
    const TMP_LIST = Object.values(data.publicInformation);

    // 1. 先初始化基础数据结构
    formData.attrs = initializeFormData(TMP_LIST);

    // 2. 如果有初始值，直接赋值
    if (props.initialData) {
      // 遍历分类处理每种类型的数据
      TMP_LIST.forEach(category => {
        if (props.initialData[category.code]) {
          if (category.inputType == 8) {
            // 直接使用原始数据
            formData.attrs[category.code] = props.initialData[category.code];
          } else if (category.inputType == 1) {
            // 站点类型直接赋值
            formData.attrs[category.code] = props.initialData[category.code];
          } else if (category.inputType == 4) {
            // 产地信息类型
            formData.attrs[category.code] = {
              [category.fieldMapping.first]:
                props.initialData[category.code][category.fieldMapping.first],
              [category.fieldMapping.second]:
                props.initialData[category.code][category.fieldMapping.second]
            };
          } else if (category.isComplex) {
            // 复杂类型（如包装信息）
            Object.keys(props.initialData[category.code]).forEach(key => {
              formData.attrs[category.code][key] =
                props.initialData[category.code][key];
            });
          }
        }
      });
    }
    console.log("formData.attrs", formData.attrs);
    // 3. 设置表单分类和规则
    formCategories.value = TMP_LIST;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error("加载表单配置失败:", error);
  }
};

// 动态初始化数据结构
const initCategoryData = (category: any) => {
  if (category.isComplex) {
    category.value.forEach(item => {
      if (!formData.attrs[category.code]) {
        formData.attrs[category.code] = {};
      }

      if (item.inputType == 6) {
        // 图片类型
        formData.attrs[category.code][item.code] =
          formData.attrs[category.code][item.code] || {};
        item.valueList.forEach(imageType => {
          formData.attrs[category.code][item.code][imageType.code] =
            formData.attrs[category.code][item.code][imageType.code] || [];
        });
      } else if (item.inputType == 7) {
        formData.attrs[category.code][item.code] =
          formData.attrs[category.code][item.code] || "";
      } else if (item.inputType == 1) {
        formData.attrs[category.code][item.code] =
          formData.attrs[category.code][item.code] || "";
      }
    });
  } else if (category.fieldMapping) {
    const firstField = category.fieldMapping?.first;
    const secondField = category.fieldMapping?.second;

    if (!formData.attrs[category.code]) {
      formData.attrs[category.code] = {
        [firstField]: "",
        [secondField]: ""
      };
    }
  }
};

const handleRadioChange = (
  value: string | number,
  prop: string,
  category: any
) => {
  // 直接设置值，不需要嵌套
  formData.attrs[category.code] = value;
  const formattedData = formatPublicInformation(formData.attrs);
  emit("formatData", formattedData);
};

const handleComplexRadioChange = (
  value: string | number,
  prop: string,
  category: any
) => {
  // 确保正确的数据路径
  formData.attrs[category.code][prop] = value;
  const formattedData = formatPublicInformation(formData.attrs);
  emit("formatData", formattedData);
};

const handleComplexSelectChange = (
  value: string | number,
  prop: string,
  category: any
) => {
  formData.attrs[category.code][prop] = value;
  const formattedData = formatPublicInformation(formData.attrs);
  emit("formatData", formattedData);
};

const handleSiteChange = (value: number[], category: any) => {
  // 确保数组格式
  formData.attrs[category.code] = value;

  // 格式化并触发更新
  const formattedData = formatPublicInformation(formData.attrs);
  emit("formatData", formattedData);
};

const handleFirstLevelChange = (value: any, category: any) => {
  if (!formData.attrs[category.code]) {
    initCategoryData(category);
  }

  const firstField = category.fieldMapping?.first;
  const secondField = category.fieldMapping?.second;

  formData.attrs[category.code] = {
    [firstField]: value,
    [secondField]: ""
  };

  // 当值发生变化时，触发表单验证
  formRef.value?.validateField(`attrs.${category.code}.${secondField}`);

  const formattedData = formatPublicInformation(formData.attrs);
  emit("formatData", formattedData);
};

const handleSecondLevelChange = (value: any, category: any) => {
  const secondField = category.fieldMapping?.second;
  formData.attrs[category.code][secondField] = value;

  const formattedData = formatPublicInformation(formData.attrs);
  emit("formatData", formattedData);
};

const showSecondSelect = (category: any) => {
  const firstField = category.fieldMapping?.first;
  const selectedValue = formData.attrs[category.code]?.[firstField];
  const selectedOption = category.value.find(
    (item: any) => item.code == selectedValue
  );
  return selectedOption?.valueList?.length > 0;
};

const getSecondLevelOptions = (category: any) => {
  const firstField = category.fieldMapping?.first;
  const selectedValue = formData.attrs[category.code]?.[firstField];
  const selectedOption = category.value.find(
    (item: any) => item.code == selectedValue
  );
  return selectedOption?.valueList || [];
};

const debouncedEmit = useDebounceFn(formattedData => {
  emit("formatData", formattedData);
}, 300);

const handleTableChange = (val: any, category: any) => {
  console.log("Table change:", val, category);
  if (val && Array.isArray(val.tableData)) {
    formData.attrs[category.code] = val.tableData;
    const formattedData = formatPublicInformation(formData.attrs);
    debouncedEmit(formattedData);
  }
};

const validateForm = async () => {
  if (!formCategories.value.length) return true;

  try {
    for (const category of formCategories.value) {
      // 复杂类型验证
      if (category.isComplex) {
        for (const item of category.value) {
          if (item.required) {
            if (item.inputType == 6) {
              // 图片上传
              for (const imageType of item.valueList) {
                if (
                  !formData.attrs[category.code]?.[item.code]?.[imageType.code]
                    ?.length
                ) {
                  ElMessage.error(`请上传${item.name}-${imageType.name}`);
                  return false;
                }
              }
            } else if (item.inputType == 7) {
              // 单选框
              if (!formData.attrs[category.code]?.[item.code]) {
                ElMessage.error(`请选择${item.name}`);
                return false;
              }
            } else if (item.inputType == 1) {
              // 下拉单选
              if (!formData.attrs[category.code]?.[item.code]) {
                ElMessage.error(`请选择${item.name}`);
                return false;
              }
            }
          }
        }
      }
      // 简单类型验证
      else if (category.inputType == 4 && category.required) {
        const firstField = category.fieldMapping?.first;
        const secondField = category.fieldMapping?.second;

        if (!formData.attrs[category.code]?.[firstField]) {
          ElMessage.error(`请选择${category.name}`);
          return false;
        }

        // 如果选择了中国大陆，则省份必填
        if (
          formData.attrs[category.code]?.[firstField] == "43" &&
          !formData.attrs[category.code]?.[secondField]
        ) {
          ElMessage.error("请选择省份");
          return false;
        }
      }
      // 站点选择验证 (inputType == 1)
      else if (category.inputType == 1 && category.required) {
        if (
          formData.attrs[category.code] == "" ||
          formData.attrs[category.code] == undefined
        ) {
          ElMessage.error(`请选择${category.name}`);
          return false;
        }
      }
      // 表格数据验证 (inputType == 8)
      else if (category.inputType == 8 && category.required) {
        // 检查数组是否存在且不为空
        if (
          !Array.isArray(formData.attrs[category.code]) ||
          formData.attrs[category.code].length == 0
        ) {
          ElMessage.error(`请完善${category.name}`);
          return false;
        }

        // 检查每一行数据是否完整
        const hasInvalidRow = formData.attrs[category.code].some(
          (row, index) => {
            // 检查必填字段
            if (
              !Array.isArray(row.coveredSites) ||
              row.coveredSites.length == 0
            ) {
              console.log(`第${index + 1}行覆盖站点数据不完整:`, row);
              return true;
            }

            if (
              !Array.isArray(row.warehouseId) ||
              row.warehouseId.length == 0
            ) {
              console.log(`第${index + 1}行发货仓数据不完整:`, row);
              return true;
            }

            return false;
          }
        );

        if (hasInvalidRow) {
          ElMessage.error(`请完整填写${category.name}的所有信息`);
          return false;
        }
      }
    }

    return true;
  } catch (error) {
    console.error("表单验证失败:", error);
    return false;
  }
};

defineExpose({
  validateForm
});

watch(
  () => formData.attrs,
  newVal => {
    if (formCategories.value.length) {
      const formattedData = formatPublicInformation(newVal);
      emit("formatData", formattedData);
    }
  },
  {
    deep: true,
    immediate: true
  }
);

watch(
  () => props.appShopId,
  newVal => {
    if (newVal) {
      loadFormConfig();
    }
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss" scoped>
.base-info {
  padding-left: 10px;
  .public-info {
    min-width: 560px;
    margin-bottom: 20px;
    padding: 12px;
    background-color: #f7f8fa;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    &-form {
      display: flex;
      align-items: top;
      flex-wrap: wrap;
      gap: 20px;
    }
    .el-form-item {
      min-width: 390px;

      &:has(.attribute-table) {
        width: 100%;
        min-width: 100%;
      }
    }
  }
  :deep(.el-select) {
    width: 100%;
  }

  .select-group {
    display: flex;
    gap: 12px;

    :deep(.el-select) {
      flex: 1;
    }
  }
}

.image-upload-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  .image-upload-item {
    .image-upload-title {
      font-size: 14px;
      color: #606266;
      margin-bottom: 8px;
      text-align: center;
    }
  }
}
</style>
