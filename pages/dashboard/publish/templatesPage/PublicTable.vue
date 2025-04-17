<script setup lang="ts">
import { ref, watch, computed, onMounted, nextTick } from "vue";
import { Plus } from "@element-plus/icons-vue";
// import debounce from "lodash/debounce";
import { useDebounceFn } from '@vueuse/core';
// import { saasPluginRequestUrl } from "@/api/shop/listingsTemplate";
import { doGetWarehouseList } from '~/apis/finance/publish'
import PureTable from '@pureadmin/table';

interface TableRowData {
  id: string | number;
  coveredSites: number[];
  warehouseId: string[];
}

interface ColumnConfig {
  code: string;
  name: string;
  inputType: number;
  duplicateSelection: number;
  valueList: any[];
}

interface Props {
  siteCode: string | number | null;
  appShopId?: (string | number)[]; // 添加 appShopId 参数
  tableData: {
    value: Array<{
      code: string | number;
      name: string;
      first: ColumnConfig; // 使用原始字段结构
      second: ColumnConfig; // 使用原始字段结构
    }>;
    url?: string;
  };
  initialValue?: any[];
}

const props = withDefaults(defineProps<Props>(), {
  siteCode: null,
  appShopId: () => [],
  initialValue: () => []
});

const emit = defineEmits(["change"]);

// 表格数据
const tableRows = ref<TableRowData[]>([]);

// 添加准备状态标记
const isReady = ref(false);

// 获取当前站点数据
const currentSiteData = computed(() => {
  if (!props.siteCode) {
    return null;
  }

  const siteData = props.tableData?.value?.find(
    item => Number(item.code) === Number(props.siteCode)
  );

  if (!siteData) {
    return null;
  }

  return siteData;
});

// 修改初始化表格数据函数
const initializeTable = async () => {
  await nextTick();

  if (props.initialValue?.length) {
    tableRows.value = props.initialValue.map(item => ({
      id: item.id || Date.now() + Math.random(),
      coveredSites: Array.isArray(item.coveredSites)
        ? item.coveredSites.map(Number)
        : [],
      warehouseId: Array.isArray(item.warehouseId)
        ? item.warehouseId.map(String)
        : []
    }));
  } else {
    tableRows.value = [
      {
        id: Date.now(),
        coveredSites: [],
        warehouseId: []
      }
    ];
  }
  isReady.value = true;
};

// 表格列配置
const columns = computed(() => {
  if (!currentSiteData.value) return [];

  const columnKeys = ["coveredSites", "warehouseId"];

  return [
    ...columnKeys.map(key => ({
      label:
        currentSiteData.value[key === "coveredSites" ? "first" : "second"].name,
      prop: key,
      minWidth: 200,
      slot: key
    })),
    {
      label: "操作",
      width: 80,
      fixed: "right",
      slot: "operation"
    }
  ];
});

// 校验规则
const rules = {
  coveredSites: [
    { required: true, message: "请选择覆盖站点", trigger: "change" }
  ],
  warehouseId: [{ required: true, message: "请选择发货仓", trigger: "change" }]
};

// 修改 debouncedEmit 函数
const debouncedEmit = useDebounceFn(data => {
  emit("change", { tableData: data.tableData });
}, 300);

// 添加行
const addRow = () => {
  tableRows.value.push({
    id: Date.now(),
    coveredSites: [],
    warehouseId: []
  });
  debouncedEmit({ tableData: tableRows.value });
};

// 删除行
const removeRow = (row: TableRowData) => {
  const index = tableRows.value.findIndex(item => item.id === row.id);
  if (index > -1) {
    tableRows.value.splice(index, 1);
    debouncedEmit({ tableData: tableRows.value });
  }
};

// 对外暴露验证方法
const validate = () => {
  if (!tableRows.value.length) return false;

  return tableRows.value.every(row => {
    return row.coveredSites && row.warehouseId;
  });
};

// 更新发货仓列表
const updateWarehouseList = async (siteCode: string | number | null) => {
  if (!siteCode || !props.tableData?.value || !props.appShopId?.length) return;

  const siteWarehouse = props.tableData.value.find(
    item => Number(item.code) === Number(siteCode)
  );

  if (siteWarehouse?.second) {
    try {
      const requestUrl = props.tableData.url || "";

      const { data } = await doGetWarehouseList({
        url: requestUrl,
        appShopId: props.appShopId[0],
        siteId: siteCode,
        appType: 35,//TODO: 改成真实的appType值
      });
      if (data?.warehouseList) {
        siteWarehouse.second.valueList = data.warehouseList;
      }
    } catch (error) {
      console.error("获取仓库列表失败:", error);
    }
  }
};

// 修改监听逻辑
watch(
  currentSiteData,
  async newVal => {
    if (newVal) {
      await updateWarehouseList(props.siteCode);
      if (!isReady.value) {
        await initializeTable();
      }
    }
  },
  { immediate: true }
);

watch(
  () => props.siteCode,
  async (newVal, oldVal) => {
    if (newVal !== oldVal) {
      isReady.value = false;
      await updateWarehouseList(newVal);
      await initializeTable();
    }
  }
);

// 添加是否显示添加按钮的计算属性
const showAddButton = computed(() => {
  const coveredSitesField = currentSiteData.value?.first;
  if (!coveredSitesField) return false;

  return (
    coveredSitesField.inputType === 2 && coveredSitesField.valueList.length > 1
  );
});

// 判断选项是否应该被禁用
const isOptionDisabled = (
  row: TableRowData,
  field: string,
  optionValue: any
) => {
  const fieldConfig =
    currentSiteData.value?.[field === "coveredSites" ? "first" : "second"];
  if (!fieldConfig) return false;

  if (fieldConfig.duplicateSelection == 1) return false;

  const selectedValues = new Set();
  tableRows.value.forEach(tableRow => {
    if (tableRow.id === row.id) return;

    if (Array.isArray(tableRow[field])) {
      tableRow[field].forEach(value => {
        selectedValues.add(value);
      });
    } else if (tableRow[field] !== "" && tableRow[field] !== undefined) {
      selectedValues.add(value);
    }
  });

  return selectedValues.has(optionValue);
};

const handleFieldChange = (val: any[], row: TableRowData, field: string) => {
  row[field] = val;
  debouncedEmit({ tableData: tableRows.value });
};

defineExpose({
  validate,
  tableRows
});
</script>

<template>
  <div class="attribute-table">
    <pure-table
      v-if="currentSiteData && isReady"
      :data="tableRows"
      :columns="columns"
      border
      size="small"
      row-key="id"
    >
      <!-- 覆盖站点列 -->
      <template #coveredSites="{ row }">
        <el-form-item :rules="rules.coveredSites">
          <el-select
            v-model="row.coveredSites"
            :placeholder="`请选择${currentSiteData.first.name}`"
            multiple
            :multiple-limit="currentSiteData.first.inputType === 2 ? 0 : 1"
            clearable
            filterable
            @change="val => handleFieldChange(val, row, 'coveredSites')"
          >
            <el-option
              v-for="item in currentSiteData.first.valueList"
              :key="item.siteId"
              :label="item.siteName"
              :value="item.siteId"
              :disabled="isOptionDisabled(row, 'coveredSites', item.siteId)"
            />
          </el-select>
        </el-form-item>
      </template>

      <!-- 发货仓列 -->
      <template #warehouseId="{ row }">
        <el-form-item :rules="rules.warehouseId">
          <el-select
            v-model="row.warehouseId"
            :placeholder="`请选择${currentSiteData.second.name}`"
            multiple
            :multiple-limit="currentSiteData.second.inputType === 2 ? 0 : 1"
            clearable
            filterable
            @change="val => handleFieldChange(val, row, 'warehouseId')"
          >
            <el-option
              v-for="item in currentSiteData.second.valueList"
              :key="item.warehouseId"
              :label="item.warehouseName"
              :value="item.warehouseId"
              :disabled="isOptionDisabled(row, 'warehouseId', item.warehouseId)"
            />
          </el-select>
        </el-form-item>
      </template>

      <!-- 操作列 -->
      <template #operation="{ row }">
        <el-button
          type="danger"
          link
          @click="removeRow(row)"
          :disabled="tableRows.length === 1"
        >
          删除
        </el-button>
      </template>
    </pure-table>

    <div v-if="showAddButton" class="table-footer">
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

.select-all-header {
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #606266;

  .select-all-actions {
    display: flex;
    gap: 8px;
  }
}

:deep(.el-select-dropdown__header) {
  padding: 0;
}
</style>
