<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from "vue";
// import AttributeTable from "./components/AttributeTable.vue";
import AttributeTable from "./AttributeTable.vue";
// import { debounce } from "@/utils/util";
import { useDebounceFn } from '@vueuse/core';
// import { saasPluginGetGoodsAttributeList } from "@/api/shop/listingsTemplate";
import { doGetAttributeList }  from "~/apis/finance/publish";
import { ElMessage } from "element-plus";

interface Attribute {
  attributeId: number;
  attributeName: string;
  required: number;
  inputType: number;
  extra: {
    chooseMaxNum: number;
    minValue?: string;
    maxValue?: string;
    valuePrecision?: number;
    valueUnit?: string[];
    showConditionList?: any[];
    templatePropertyValueParentList?: any[];
  };
  valueList: Array<{
    valueId: number | string;
    valueName: string;
  }>;
}

interface FormDataType {
  title: string;
  attrs: Record<string, any>;
  attributeList?: any[];
}

const emit = defineEmits(["formatData"]);

const formData = ref<FormDataType>({
  title: "",
  attrs: {},
  attributeList: []
});

const localAttributeList = ref([]);
const rules = ref({});

const generateRules = (attributes: Attribute[]) => {
  const newRules = attributes.reduce((acc, attr) => {
    const ruleKey = `attrs.${attr.attributeId}`;
    const rules = [];

    // 处理表格类型的必填验证
    if (attr.inputType == 5) {
      rules.push({
        validator: (rule: any, value: any[], callback: Function) => {
          if (!value || !Array.isArray(value)) {
            callback(new Error(`请填写${attr.attributeName}`));
            return;
          }

          // 检查每行数据是否都填写完整
          const invalidRow = value.some(
            row => !row.materialId || !row.percentage
          );
          if (invalidRow) {
            callback(new Error(`请完整填写${attr.attributeName}的所有字段`));
            return;
          }

          callback();
        },
        trigger: "change"
      });
    }

    // 处理必填验证
    if (attr.required == 1) {
      rules.push({
        required: true,
        message: `请选择${attr.attributeName}`,
        trigger: "change"
      });
    }

    // 多选数量限制
    if (attr.extra?.chooseMaxNum > 1) {
      rules.push({
        validator: (rule: any, value: any[], callback: Function) => {
          if (value && value.length > attr.extra.chooseMaxNum) {
            callback(
              new Error(
                `${attr.attributeName}最多可选${attr.extra.chooseMaxNum}个`
              )
            );
          } else {
            callback();
          }
        },
        trigger: "change"
      });
    }

    // 输入框数值范围限制
    if (attr.inputType == 1) {
      if (attr.extra?.minValue || attr.extra?.maxValue) {
        rules.push({
          validator: (rule: any, value: string, callback: Function) => {
            const num = parseFloat(value);
            if (attr.extra.minValue && num < parseFloat(attr.extra.minValue)) {
              callback(
                new Error(`${attr.attributeName}不能小于${attr.extra.minValue}`)
              );
            }
            if (attr.extra.maxValue && num > parseFloat(attr.extra.maxValue)) {
              callback(
                new Error(`${attr.attributeName}不能大于${attr.extra.maxValue}`)
              );
            }
            callback();
          },
          trigger: ["blur", "change"]
        });
      }

      // 精度限制
      if (attr.extra?.valuePrecision > 0) {
        rules.push({
          validator: (rule: any, value: string, callback: Function) => {
            if (
              value &&
              !new RegExp(
                `^\\d+(\\.\\d{0,${attr.extra.valuePrecision}})?$`
              ).test(value)
            ) {
              callback(
                new Error(
                  `${attr.attributeName}最多保留${attr.extra.valuePrecision}位小数`
                )
              );
            }
            callback();
          },
          trigger: ["blur", "change"]
        });
      }
    }

    if (rules.length > 0) {
      acc[ruleKey] = rules;
    }
    return acc;
  }, {});

  rules.value = newRules;
};

const shouldShowAttribute = (attr: Attribute) => {
  let shouldShow = true;

  // 处理 showConditionList 逻辑
  if (attr.extra?.showConditionList?.length) {
    shouldShow = attr.extra.showConditionList.some((condition: any) => {
      const parentValue = formData.value.attrs[condition.parentId];
      return condition.attributeIdList.includes(parentValue);
    });
  }

  // 处理 templatePropertyValueParentList 逻辑
  if (attr.extra?.templatePropertyValueParentList?.length) {
    shouldShow = attr.extra.templatePropertyValueParentList.some(config => {
      return config.parentAttributeIdList.some(parentId => {
        const parentValues = Object.entries(formData.value.attrs);
        return parentValues.some(([attrId, value]) => value == parentId);
      });
    });
  }

  // 如果属性不显示,则清空其值
  if (!shouldShow && formData.value.attrs[attr.attributeId] !== undefined) {
    nextTick(() => {
      delete formData.value.attrs[attr.attributeId];
    });
  }

  return shouldShow;
};

// 添加对父属性值变化的监听
watch(
  () => formData.value.attrs,
  () => {
    // 每次属性值变化时,重新检查所有属性的显示状态
    localAttributeList.value.forEach(attr => {
      shouldShowAttribute(attr);
    });
  },
  { deep: true }
);

// 获取有效的选项列表
const getValidValueList = (attr: Attribute) => {
  const { templatePropertyValueParentList = [] } = attr.extra || {};
  if (!templatePropertyValueParentList.length) {
    return attr.valueList;
  }

  // 如果有依赖但还未选择父属性，也显示所有选项
  const hasSelectedParentValues = templatePropertyValueParentList.some(
    config => {
      return config.parentAttributeIdList.some(parentId => {
        return Object.values(formData.value.attrs).includes(parentId);
      });
    }
  );

  if (!hasSelectedParentValues) {
    return attr.valueList;
  }

  const matchingConfig = templatePropertyValueParentList.find(config => {
    return config.parentAttributeIdList.some(parentId => {
      return Object.values(formData.value.attrs).includes(parentId);
    });
  });

  // 如果没有找到匹配的配置，返回原始列表而不是空数组
  const result = matchingConfig
    ? attr.valueList.filter(item =>
        matchingConfig.attributeIdList.includes(item.valueId)
      )
    : attr.valueList;

  return result;
};

// 修改 props 的定义
const props = withDefaults(
  defineProps<{
    categoryId: number | string;
    appShopId?: (string | number)[];
    appType?: number;
    initialData?: Array<{
      attributeId: number;
      valueList: Array<{
        valueId: number | string;
        valueInput?: string;
      }>;
    }>;
  }>(),
  {
    categoryId: "",
    appShopId: () => [],
    initialData: () => []
  }
);

const loading = ref(false);
// 修改获取属性列表的方法
const getAttributeList = async (categoryId: number | string) => {
  if (!categoryId || !props.appShopId?.length) return;

  try {
    loading.value = true;
    const res = await doGetAttributeList({
      appType: props.appType,
      categoryId,
      appShopId: props.appShopId,
    });
    loading.value = false;
    localAttributeList.value = res.data.attributeList;
    nextTick(() => {
      generateRules(res.data.attributeList);
    });
  } catch (error) {
    console.error("获取属性列表失败:", error);
  }
};

watch(
  () => localAttributeList.value,
  newVal => {
    if (newVal?.length) {
      nextTick(() => {
        generateRules(newVal);
      });
    }
  },
  { immediate: true, deep: true }
);

const handleTableChange = (attributeId: number, val: any) => {
  if (formData.value) {
    formData.value.attrs[attributeId] = val;
    const formattedData = formatAttributeData();
    emit("formatData", formattedData);
  }
};

const formatAttributeData = () => {
  if (!formData.value?.attrs || !localAttributeList.value?.length) return [];

  return localAttributeList.value
    .filter(attr => {
      const attrValue = formData.value.attrs[attr.attributeId];
      return (
        attrValue != null &&
        attrValue !== "" &&
        (!Array.isArray(attrValue) || attrValue.length > 0)
      );
    })
    .map(attr => {
      const attrValue = formData.value.attrs[attr.attributeId];

      // 处理表格类型数据
      if (attr.inputType == 5 && Array.isArray(attrValue)) {
        const tableValues = attrValue
          .filter(row => row.materialId && row.percentage)
          .map(row => ({
            valueId: row.materialId,
            valueName:
              attr.valueList.find(v => v.valueId == row.materialId)
                ?.valueName || "",
            valueInput: row.percentage
          }));

        if (tableValues.length == 0) return null;

        return {
          attributeId: attr.attributeId,
          attributeName: attr.attributeName,
          valueList: tableValues
        };
      }

      // 处理多选类型数据
      if (attr.inputType == 2 && Array.isArray(attrValue)) {
        const multiValues = attrValue.map(val => ({
          valueId: val,
          valueName:
            attr.valueList.find(v => v.valueId == val)?.valueName || "",
          valueInput: ""
        }));

        if (multiValues.length == 0) return null;

        return {
          attributeId: attr.attributeId,
          attributeName: attr.attributeName,
          valueList: multiValues
        };
      }

      // 处理单选和其他类型数据
      return {
        attributeId: attr.attributeId,
        attributeName: attr.attributeName,
        valueList: [
          {
            valueId: attrValue,
            valueName:
              attr.valueList.find(v => v.valueId == attrValue)?.valueName || "",
            valueInput: ""
          }
        ]
      };
    })
    .filter(Boolean);
};

const handleAttrsChange = useDebounceFn(newVal => {
  if (Object.keys(newVal).length > 0) {
    const formattedData = formatAttributeData();
    emit("formatData", formattedData);
  }
}, 300);

watch(() => formData.value.attrs, handleAttrsChange, { deep: true });

const initialized = ref(false);

watch(
  [() => props.initialData, () => localAttributeList.value],
  ([newInitialData, newAttributeList]) => {
    if (
      !initialized.value &&
      newInitialData?.length > 0 &&
      newAttributeList?.length > 0
    ) {
      nextTick(() => {
        initializeFromOriginalData();
        initialized.value = true;
      });
    }
  },
  { immediate: true, deep: true }
);

const initializeFromOriginalData = () => {
  if (!props.initialData?.length) return;

  const initialAttrs = {};
  props.initialData.forEach(attr => {
    if (!attr.attributeId || !attr.valueList) return;

    const attrDef = localAttributeList.value.find(
      item => item.attributeId == attr.attributeId
    );

    if (!attrDef) return;

    try {
      if (attrDef.inputType == 5 && Array.isArray(attr.valueList)) {
        initialAttrs[attr.attributeId] = attr.valueList.map(v => ({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          materialId: v.valueId,
          percentage: v.valueInput || ""
        }));
      } else if (attrDef.inputType == 2) {
        initialAttrs[attr.attributeId] = Array.isArray(
          attr.valueList[0]?.valueId
        )
          ? attr.valueList[0].valueId
          : attr.valueList.map(v => v.valueId);
      } else {
        const value = attr.valueList[0];
        if (value) {
          initialAttrs[attr.attributeId] =
            value.valueId || value.valueInput || "";
        }
      }
    } catch (error) {
      console.error("属性处理错误:", error);
    }
  });

  nextTick(() => {
    formData.value.attrs = { ...initialAttrs };
  });
};

const formRef = ref();

const validate = () => {
  return new Promise((resolve, reject) => {
    if (!formRef.value) {
      resolve(true);
      return;
    }

    // 过滤出当前显示的必填字段
    const visibleFields = localAttributeList.value
      .filter(attr => shouldShowAttribute(attr))
      .reduce((acc, attr) => {
        if (attr.required == 1) {
          // 成分表格数据校验 (inputType == 5)
          if (attr.inputType == 5) {
            const attrValue = formData.value.attrs[attr.attributeId];

            // 检查数组是否存在且不为空
            if (!Array.isArray(attrValue) || attrValue.length == 0) {
              ElMessage.error(`请完善${attr.attributeName}`);
              reject(false);
              return acc;
            }

            // 检查每一行数据是否完整
            const hasInvalidRow = attrValue.some((row, index) => {
              if (!row.materialId || !row.percentage) {
                console.log(`第${index + 1}行数据不完整:`, row);
                return true;
              }
              return false;
            });

            if (hasInvalidRow) {
              ElMessage.error(`请完整填写${attr.attributeName}的所有信息`);
              reject(false);
              return acc;
            }
          }

          acc[`attrs.${attr.attributeId}`] =
            rules.value[`attrs.${attr.attributeId}`];
        }
        return acc;
      }, {});

    // 只验证显示的字段
    formRef.value.validate((valid: boolean, fields: any) => {
      if (valid) {
        resolve(true);
        return;
      }

      // 过滤掉未显示字段的错误信息
      const visibleErrors = Object.keys(fields || {}).reduce((acc, key) => {
        if (visibleFields[key]) {
          acc[key] = fields[key];
        }
        return acc;
      }, {});

      if (Object.keys(visibleErrors).length == 0) {
        resolve(true);
      } else {
        reject(visibleErrors);
      }
    });
  });
};

defineExpose({ validate });

watch(
  [() => props.categoryId, () => props.appShopId],
  async ([newCategoryId, newAppShopId]) => {
    if (newCategoryId && newAppShopId?.length) {
      await getAttributeList(newCategoryId);
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  initialized.value = false;
});
</script>

<template>
  <div class="product-attrs" v-loading="loading">
    <el-form
      ref="formRef"
      v-if="localAttributeList.length"
      :model="formData"
      :rules="rules"
      class="product-attrs-form"
      label-width="120px"
      label-position="top"
    >
      <el-form-item
        v-for="item in localAttributeList"
        v-show="shouldShowAttribute(item)"
        :key="item.attributeId"
        :label="item.attributeName"
        :prop="`attrs.${item.attributeId}`"
        :required="item.required == 1"
      >
        <!-- 表格类型 inputType=5 -->
        <attribute-table
          v-if="item.inputType == 5 && getValidValueList(item).length > 0"
          v-model="formData.attrs[item.attributeId]"
          :attribute="item"
          :parent-values="formData.attrs"
          @change="val => handleTableChange(item.attributeId, val)"
        />

        <!-- 单选 inputType=1 -->
        <el-select
          v-else-if="item.inputType == 1"
          v-model="formData.attrs[item.attributeId]"
          :placeholder="`请选择${item.attributeName}`"
          :multiple="item.extra.chooseMaxNum > 1"
          :multiple-limit="item.extra.chooseMaxNum"
          clearable
          filterable
        >
          <el-option
            v-for="opt in item.valueList"
            :key="opt.valueId"
            :label="opt.valueName"
            :value="opt.valueId"
          />
        </el-select>

        <!-- 多选 inputType=2 -->
        <el-select
          v-else-if="item.inputType == 2"
          v-model="formData.attrs[item.attributeId]"
          :placeholder="`请选择${item.attributeName}`"
          multiple
          :multiple-limit="item.extra.chooseMaxNum"
          clearable
          filterable
        >
          <el-option
            v-for="opt in item.valueList"
            :key="opt.valueId"
            :label="opt.valueName"
            :value="opt.valueId"
          />
        </el-select>

        <!-- 输入框 inputType=3 -->
        <el-input
          v-else-if="item.inputType == 3"
          v-model="formData.attrs[item.attributeId]"
          :placeholder="`请输入${item.attributeName}`"
          :maxlength="item.extra.maxValue"
          :show-word-limit="true"
          clearable
        >
          <template
            #append
            v-if="item.extra.valueUnit?.length && item.extra.valueUnit[0]"
          >
            {{ item.extra.valueUnit[0] }}
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.product-attrs {
  width: 100%;
  min-height: 100px;
  padding: 12px 12px 24px 12px;
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

.attr-combine {
  display: flex;
  align-items: center;
}

.el-checkbox-group,
.el-radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.el-select {
  width: 100%;
}
</style>
