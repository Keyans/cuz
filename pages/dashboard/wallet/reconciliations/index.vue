<template>
  <div class="container mx-auto py-2 space-y-6">
    <div class="flex items-center">
      <h1 class="text-2xl font-bold">账单查看</h1>
      <div>
        <ClientOnly>
          <el-config-provider :locale="zhCn">
            <el-date-picker
              class="ml-4 !w-[13rem]"
              v-model="months"
              type="monthrange"
              range-separator="-"
              start-placeholder="全部"
              end-placeholder="全部"
              value-format="YYYY-MM"
              @change="getData"
            ></el-date-picker>
          </el-config-provider>
        </ClientOnly>
      </div>
    </div>
    <ClientOnly>
      <el-table
        row-key="id"
        :data="tableData"
        style="width: 100%"
        class="shadow rounded-lg"
        empty-text="当前周期内暂无账单"
        @selection-change="selectRow"
      >
        <!-- <el-table-column
        type="selection"
        :selectable="(row) => row.status == '10'"
        width="55"
      /> -->
        <el-table-column
          prop="reconciliationStartDate"
          label="时间"
          width="160"
        />
        <el-table-column
          prop="totalReconciliationAmount"
          label="对账金额"
          width="160"
          :formatter="(_row, _column, cell) => '￥' + cell"
        />
        <el-table-column
          prop="status"
          label="状态"
          width="120"
          :formatter="(_row, _column, cell) => statusMap[cell] ?? '未知状态'"
        />
        <el-table-column prop="updateBy" label="操作人" width="120" />
        <el-table-column prop="updateTime" label="操作时间" />
        <el-table-column prop="action" width="180" label="操作">
          <template #header>
            <div class="flex items-center justify-between">
              <el-tooltip placement="bottom" effect="dark">
                <div class="flex items-center w-fit">
                  <text> 操作 </text>
                  <el-icon size="14" class="ml-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="currentColor"
                        d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m23.744 191.488c-52.096 0-92.928 14.784-123.2 44.352-30.976 29.568-45.76 70.4-45.76 122.496h80.256c0-29.568 5.632-52.8 17.6-68.992 13.376-19.712 35.2-28.864 66.176-28.864 23.936 0 42.944 6.336 56.32 19.712 12.672 13.376 19.712 31.68 19.712 54.912 0 17.6-6.336 34.496-19.008 49.984l-8.448 9.856c-45.76 40.832-73.216 70.4-82.368 89.408-9.856 19.008-14.08 42.24-14.08 68.992v9.856h80.96v-9.856c0-16.896 3.52-31.68 10.56-45.76 6.336-12.672 15.488-24.64 28.16-35.2 33.792-29.568 54.208-48.576 60.544-55.616 16.896-22.528 26.048-51.392 26.048-86.592 0-42.944-14.08-76.736-42.24-101.376-28.16-25.344-65.472-37.312-111.232-37.312zm-12.672 406.208a54.272 54.272 0 0 0-38.72 14.784 49.408 49.408 0 0 0-15.488 38.016c0 15.488 4.928 28.16 15.488 38.016A54.848 54.848 0 0 0 523.072 768c15.488 0 28.16-4.928 38.72-14.784a51.52 51.52 0 0 0 16.192-38.72 51.968 51.968 0 0 0-15.488-38.016 55.936 55.936 0 0 0-39.424-14.784z"
                      ></path>
                    </svg>
                  </el-icon>
                </div>
                <template #content>
                  请于收到本对账单之日起15个自然日内核对并点击确认。逾期未确认的，平台将视为您已认可账单内容并自动完成确认。
                </template>
              </el-tooltip>
              <!-- <el-tooltip
              placement="bottom"
              effect="dark"
              :content="'左侧选择记录后批量确认'"
              :disabled="chosenRow.length"
            >
              <button
                :class="[
                  'py-1 ml-6',
                  chosenRow.length
                    ? 'btn-secondary'
                    : 'btn-primary cursor-not-allowed',
                ]"
                :disabled="!chosenRow.length"
                @click="confirm()"
              >
                批量确认
              </button>
            </el-tooltip> -->
            </div>
          </template>

          <template #default="props">
            <div class="flex space-x-10 text-primary">
              <button
                class="text-primary hover:text-primary-dark"
                @click="getDetail(props.row)"
              >
                查看详情
              </button>
              <button
                v-if="props.row.status == '10'"
                class="text-primary hover:text-primary-dark"
                @click="confirm(props.row.reconciliationNo)"
              >
                确认
              </button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <Pagination v-model="pageConfig"></Pagination>
    </ClientOnly>
    <ClientOnly>
      <el-dialog v-model="detailDialog" width="80%" :title="detailTitle">
        <TransactionTable
          v-model:table-data="detailTableData"
        ></TransactionTable>
        <Pagination v-model="detailPageConfig"></Pagination>
      </el-dialog>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import zhCn from "element-plus/es/locale/lang/zh-cn";
import {
  doConfirmReconciliation,
  doListReconciliation,
  doListShopTransaction,
} from "~/apis/finance/transaction";
import dayjs from "dayjs";
import TransactionTable, {
  type TableDataProp as TranTableProp,
} from "../components/transactionTable.vue";
import Pagination from "~/components/ui/pagination/Pagination.vue";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

interface TableDataProp {
  id: string;
  reconciliationNo: string;
  reconciliationStartDate: string;
  totalReconciliationAmount: string;
  status: string;
  updateBy: string;
  updateTime: string;
}

const format = "YYYY-MM-DD HH:mm:ss";

const statusMap: Record<string, string> = {
  10: "未确认",
  20: "已确认",
  30: "自动确认",
};
const detailDialog = ref(false);
const months = ref();
const tableData = ref<TableDataProp[]>([]);

const pageConfig = ref({
  current: 1,
  size: 20,
  total: 0,
});

watch(
  pageConfig,
  () => {
    tableData.value = [];
    getData();
  },
  { deep: true }
);

const getData = async () => {
  const { data } = await doListReconciliation({
    size: pageConfig.value.size,
    current: pageConfig.value.current,
    startTime:
      months.value?.[0] &&
      dayjs(months.value?.[0]).startOf("month").format(format),
    endTime:
      months.value?.[1] &&
      dayjs(months.value?.[1]).endOf("month").format(format),
  });

  tableData.value = data.records;
  pageConfig.value.total = data.total;
};
if (import.meta.client) getData();

const chosenRow = ref<TableDataProp[]>([]);

const selectRow = (row?: TableDataProp[], ignore?: boolean) => {
  console.log(row, ignore);
  if (!row?.length) chosenRow.value = [];
  else chosenRow.value = row;
};

const detailTableData = ref<TranTableProp[]>([]);
const detailPageConfig = ref({
  size: 10,
  current: 1,
  total: 0,
});
const detailTitle = ref("");
const getDetail = async (row: TableDataProp) => {
  detailTitle.value = row.reconciliationStartDate + "明细";
  try {
    detailTableData.value = [];
    const { data } = await doListShopTransaction({
      size: 20,
      current: 1,
      startTime: dayjs(row.reconciliationStartDate)
        .startOf("month")
        .format(format),
      endTime: dayjs(row.reconciliationStartDate).endOf("month").format(format),
    });

    detailTableData.value = data.records;
    detailDialog.value = true;
    detailPageConfig.value.total = data.total;
  } catch (error) {}
};

const confirm = async (reconciliationNo?: string) => {
  console.log(reconciliationNo);

  let reconciliationNos = [];
  if (reconciliationNo) {
    reconciliationNos.push(reconciliationNo);
  } else if (chosenRow.value.length) {
    reconciliationNos.push(...chosenRow.value.map((e) => e.reconciliationNo));
  } else {
  }

  try {
    await doConfirmReconciliation({
      reconciliationNos,
      shopId: +(useAuthStore().user?.shopId ?? 0),
    });
    getData();
  } catch (error) {
  } finally {
  }
};

// 生命周期钩子
onMounted(() => {
  console.log("Component mounted");
});
</script>

<style scoped>
/* 样式 */
</style>
