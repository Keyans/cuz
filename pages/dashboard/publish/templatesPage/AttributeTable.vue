<script setup lang="ts">
import { ref, watch, reactive, computed } from "vue";
// import { debounce } from "@/utils/util";
import { useDebounceFn } from '@vueuse/core';
import PureTable from '@pureadmin/table';
import { Plus } from '@element-plus/icons-vue'

// 定义表格行数据接口
interface TableRowData {
  id: string;
  materialId: number | string;
  percentage: number | string;
}

// 定义父属性配置接口
interface ParentConfig {
  parentAttributeIdList: (number | string)[];
  attributeIdList: (number | string)[];
}

const props = defineProps<{
  attribute: {
    attributeId: number;
    attributeName: string;
    extra: {
      propertyChooseTitle: string;
      numberInputTitle: string;
      valueUnit: string[];
      minValue: string;
      maxValue: string;
      valuePrecision: number;
      templatePropertyValueParentList?: ParentConfig[]; // 添加可选的父属性配置
    };
    valueList: Array<{
      valueId: number | string;
      valueName: string;
    }>;
  };
  modelValue: TableRowData[];
  parentValues: Record<string, any>;
}>();

const emit = defineEmits(["update:modelValue", "change"]);

const tableData = ref<TableRowData[]>([]);

watch(
  () => props.modelValue,
  newVal => {
    // 只在初始化或modelValue变为空数组时重置为一行
    if (!newVal?.length && !tableData.value.length) {
      tableData.value = [
        {
          id: Date.now().toString(),
          materialId: "",
          percentage: ""
        }
      ];
    } else if (newVal?.length) {
      tableData.value = [...newVal];
    }
  },
  { immediate: true }
);

// 修改 addRow 方法
const addRow = () => {
  const newRow = {
    id: Date.now().toString(),
    materialId: "",
    percentage: ""
  };
  tableData.value.push(newRow);
  emit("update:modelValue", [...tableData.value]);
};

const removeRow = (row: TableRowData) => {
  const index = tableData.value.findIndex(item => item.id === row.id);
  if (index > -1) {
    tableData.value.splice(index, 1);
    emitChange();
  }
};

const validatePercentage = (
  rule: any,
  value: string | undefined,
  callback: Function
) => {
  if (!value) {
    callback(new Error("请输入比例"));
    return;
  }

  const num = parseFloat(value);
  const { minValue, maxValue, valuePrecision } = props.attribute.extra;

  if (isNaN(num)) {
    callback(new Error("请输入有效数字"));
    return;
  }

  if (minValue && num < Number(minValue)) {
    callback(new Error(`不能小于${minValue}`));
    return;
  }

  if (maxValue && num > Number(maxValue)) {
    callback(new Error(`不能大于${maxValue}`));
    return;
  }

  if (typeof valuePrecision === "number") {
    const decimalPlaces = value.includes(".") ? value.split(".")[1].length : 0;
    if (decimalPlaces > valuePrecision) {
      callback(new Error(`最多${valuePrecision}位小数`));
      return;
    }
  }

  callback();
};

// 修改数据变化处理函数
const emitChange = useDebounceFn(() => {
  emit("update:modelValue", tableData.value);
  emit("change", tableData.value);
}, 300);

// 获取经过筛选的可选值列表
const getFilteredValueList = () => {
  const { templatePropertyValueParentList = [] } = props.attribute.extra || {};
  if (!templatePropertyValueParentList.length) {
    return props.attribute.valueList;
  }

  const matchingConfig = templatePropertyValueParentList.find(config => {
    return config.parentAttributeIdList.some(parentValueId => {
      const values = Object.values(props.parentValues);
      return values.includes(parentValueId);
    });
  });

  // 如果没有匹配的配置或过滤后没有选项，返回空数组
  if (!matchingConfig) {
    return [];
  }

  const filtered = props.attribute.valueList.filter(item =>
    matchingConfig.attributeIdList.includes(item.valueId)
  );

  return filtered;
};

// 计算属性获取过滤后的选项列表
const filteredValueList = computed(() => {
  return getFilteredValueList();
});

// 表格列配置
const columns = reactive([
  {
    label: props.attribute.extra.propertyChooseTitle,
    prop: "materialId",
    minWidth: 200,
    slot: "materialId"
  },
  {
    label: props.attribute.extra.numberInputTitle,
    prop: "percentage",
    minWidth: 200,
    slot: "percentage"
  },
  {
    label: "操作",
    width: 80,
    fixed: "right",
    slot: "operation"
  }
]);
</script>

<template>
  <div class="attribute-table">
    <pure-table
      :data="tableData"
      :columns="columns"
      border
      size="small"
      row-key="id"
    >
      <!-- 材质列 -->
      <template #materialId="{ row }">
        <el-select
          v-model="row.materialId"
          :placeholder="`请选择${attribute.extra.propertyChooseTitle}`"
          clearable
          filterable
          @change="emitChange"
        >
          <el-option
            v-for="item in filteredValueList"
            :key="item.valueId"
            :label="item.valueName"
            :value="item.valueId"
          />
        </el-select>
      </template>

      <!-- 比例列 -->
      <template #percentage="{ row }">
        <el-input
          v-model="row.percentage"
          :placeholder="`请输入${attribute.extra.numberInputTitle}`"
          @change="emitChange"
        >
          <template #append>{{ attribute.extra.valueUnit[0] }}</template>
        </el-input>
      </template>

      <!-- 操作列 -->
      <template #operation="{ row }">
        <el-button
          type="danger"
          link
          @click="removeRow(row)"
          :disabled="tableData.length === 1"
        >
          删除
        </el-button>
      </template>
    </pure-table>

    <!-- 添加按钮 -->
    <div class="table-footer">
      <el-button type="primary" link @click="addRow">
        <el-icon><Plus /></el-icon>
        添加
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.attribute-table {
  width: 100%;
  .table-footer {
    margin-top: 12px;
    display: flex;
    justify-content: center;
  }
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
  :deep(.el-select) {
    width: 100%;
  }
}
</style>
