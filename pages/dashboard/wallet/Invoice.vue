<template>
  <div class="p-6 max-w-full">
    <!-- 标题 -->
    <div class="text-2xl font-bold mb-4 border-b pb-4">发票管理</div>
    
    <!-- 说明信息区域 -->
    <div class="bg-white rounded-lg border border-gray-200 p-6 mb-4">
      <div class="flex items-start gap-2">
        <el-icon class="mt-1 text-gray-500"><InfoFilled /></el-icon>
        <div class="text-gray-600">
          <div class="mb-2">1. 只有基于确认后的对账单才可申请开具发票，预付未消费的金额不可申请。</div>
          <div class="mb-2">2. 单个对账单不可拆分开票，但可合并开票。</div>
          <div>3. 平台一般会在1～3个工作日内开具发票，支持增值税普通发票、增值税专用发票。</div>
        </div>
      </div>
    </div>
    
    <!-- 实名认证提示 -->
    <div v-if="!isVerified" class="flex items-center bg-orange-50 text-orange-600 p-4 rounded-lg mb-4 border border-orange-200">
      <el-icon class="mr-2"><Warning /></el-icon>
      <span>请先完成实名认证，才能申请开具发票！</span>
      <el-button type="primary" link class="ml-2" @click="goToVerify">
        <span class="text-blue-500">前往实名认证</span>
      </el-button>
    </div>
    
    <!-- 开票金额和发票信息区域(左右分栏) -->
    <div class="grid md:grid-cols-2 gap-4 mb-4">
      <!-- 左侧：可开票金额 -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <!-- 可开票金额 -->
        <div>
          <div class="text-gray-500 mb-1">可开票金额</div>
          <div class="text-2xl font-bold mb-4">¥ {{ formatMoney(availableAmount) }}</div>
        </div>
        
        <!-- 三列金额明细，用红色标记当前可开票金额 -->
        <div class="grid grid-cols-3 mb-6">
          <div>
            <el-text class="mx-1 text-sm text-gray-500 mb-1">可开票金额：</el-text>
            <div class="relative">
              <div class="font-bold">¥ {{ formatMoney(availableAmount) }}</div>
            </div>
          </div>
          <div>
            <el-tooltip content="已经申请过开票（包括开票中）的金额" placement="top-start" effect="light">
              <el-text class="mx-1 text-sm text-gray-500 mb-1" type="primary">已开票金额：</el-text>
            </el-tooltip>
            <div class="font-bold" title="">¥ {{ formatMoney(appliedAmount) }}</div>
          </div>
          <div>
            <el-text class="mx-1 text-sm text-gray-500 mb-1">暂不可开票金额：</el-text>
            <div class="font-bold">¥ {{ formatMoney(unavailableAmount) }}</div>
          </div>
        </div>
        
        <!-- 申请开票按钮 -->
        <el-button type="primary" @click="handleApplyInvoice" class="w-full">申请开票</el-button>
      </div>
      
      <!-- 右侧：发票信息 -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex justify-between items-center mb-6">
          <div class="text-gray-500">发票信息</div>
          <div class="flex items-center text-blue-500 cursor-pointer" @click="handleEditInvoiceInfo">
            <span class="mr-1">编辑</span>
            <el-icon><ArrowRight /></el-icon>
          </div>
        </div>
        
        <div class="space-y-6">
          <div>
            <div class="text-sm text-gray-500 mb-1">发票抬头：</div>
            <div>{{ invoiceInfo.title || '-' }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-500 mb-1">接收邮箱：</div>
            <div>{{ invoiceInfo.email || '-' }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 搜索条件区域 -->
    <div class="bg-white rounded-lg border border-gray-200 p-6 mb-4">
      <div class="grid md:grid-cols-2 gap-6 mb-4">
        <!-- 左侧搜索条件 -->
        <div class="flex items-center flex-wrap md:flex-nowrap">
          <span class="w-24 text-gray-600 mr-2">对账单号：</span>
          <el-input v-model="searchForm.billNo" placeholder="支持多单号查询，中英文逗号、斜杠、空格隔开" class="flex-1" />
        </div>
        
        <!-- 右侧发票号码搜索 -->
        <div class="flex items-center flex-wrap md:flex-nowrap">
          <span class="w-24 text-gray-600 mr-2">发票号码：</span>
          <el-input v-model="searchForm.invoiceNo" placeholder="请输入" class="flex-1" />
        </div>
      </div>
      
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <!-- 左侧发票类型 -->
        <div class="flex items-center flex-wrap md:flex-nowrap">
          <span class="w-24 text-gray-600 mr-2">发票类型：</span>
          <el-select v-model="searchForm.type" placeholder="请选择" class="flex-1">
            <el-option label="全部" value="" />
            <el-option label="增值税普通发票" value="normal" />
            <el-option label="增值税专用发票" value="special" />
          </el-select>
        </div>
        
        <!-- 右侧申请时间 -->
        <div class="flex items-center flex-wrap md:flex-nowrap">
          <span class="w-24 text-gray-600 mr-2">申请时间：</span>
          <el-date-picker 
            v-model="searchForm.dateRange" 
            type="daterange" 
            range-separator="至" 
            start-placeholder="开始日期" 
            end-placeholder="结束日期"
            class="flex-1" />
        </div>
      </div>
      
      <!-- 按钮区域 -->
      <div class="flex justify-end gap-2">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </div>
    
    <!-- 状态筛选和列表 -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <!-- 状态筛选标签 -->
      <div class="border-b pb-4 mb-4">
        <el-radio-group v-model="currentStatus" class="flex flex-wrap">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="pending">待审核</el-radio-button>
          <el-radio-button label="processing">开票中</el-radio-button>
          <el-radio-button label="completed">已开票</el-radio-button>
          <el-radio-button label="cancelled">已取消</el-radio-button>
        </el-radio-group>
      </div>
      
      <!-- 发票列表 -->
      <div class="overflow-x-auto">
        <el-table :data="invoiceList" border style="width: 100%" class="mb-4">
          <el-table-column prop="applyTime" label="申请时间" min-width="120" />
          <el-table-column prop="billNo" label="对账单号" min-width="180" />
          <el-table-column prop="amount" label="发票金额" min-width="120">
            <template #default="{ row }">
              ¥ {{ formatMoney(row.amount) }}
            </template>
          </el-table-column>
          <el-table-column prop="type" label="发票类型" min-width="150">
            <template #default="{ row }">
              {{ row.type === 'normal' ? '增值税普通发票' : '增值税专用发票' }}
            </template>
          </el-table-column>
          <el-table-column prop="invoiceNo" label="发票号码" min-width="120" />
          <el-table-column prop="status" label="状态" min-width="120">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" min-width="150" />
          <el-table-column label="操作" min-width="150" fixed="right">
            <template #default="{ row }">
              <div class="flex items-center space-x-2">
                <el-button type="primary" link @click="handleView(row)">查看</el-button>
                <template v-if="row.status === 'pending'">
                  <el-divider direction="vertical" />
                  <el-button type="primary" link @click="handleCancel(row)">取消开票</el-button>
                </template>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="flex justify-end">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <!-- 申请开票弹窗 -->
    <el-dialog
      v-model="showApplyInvoiceDialog"
      title="申请开票"
      width="75%"
      :before-close="handleCloseApplyInvoiceDialog"
      destroy-on-close
      class="invoice-apply-dialog"
    >
      <div v-if="billSelectionError" class="bg-orange-50 text-orange-600 p-3 mb-4 flex items-center rounded border border-orange-200">
        <el-icon class="mr-2"><Warning /></el-icon>
        <span>请至少选择一个对账单</span>
      </div>
    
      <div class="flex flex-wrap md:flex-nowrap items-center justify-between mb-4 gap-4">
        <div class="flex items-center">
          <span class="mr-2 whitespace-nowrap text-gray-700">对账单号：</span>
          <el-input v-model="invoiceSearchForm.accountNo" placeholder="支持多单号查询，中英文逗号、斜杠、空格隔开" class="w-[320px]" />
        </div>
        <div class="flex items-center">
          <span class="mr-2 whitespace-nowrap text-gray-700">时间区间：</span>
          <el-date-picker
            v-model="invoiceSearchForm.timeRange"
            type="daterange"
            range-separator="~"
            start-placeholder="选择时间"
            class="w-[320px]"
          />
        </div>
        <div class="flex items-center">
          <el-button type="primary" @click="searchBills" class="!rounded-md">搜索</el-button>
          <el-button @click="resetBillSearch" class="!rounded-md ml-2">重置</el-button>
        </div>
      </div>
      
      <div class="border rounded overflow-hidden">
        <!-- 表头 -->
        <div class="grid grid-cols-12 bg-gray-50 border-b text-sm">
          <div class="py-3 px-4 col-span-1">
            <el-checkbox v-model="allSelected" @change="handleSelectAll" />
          </div>
          <div class="py-3 px-2 col-span-4 text-gray-700">对账单号</div>
          <div class="py-3 px-2 col-span-4 text-gray-700">时间区间</div>
          <div class="py-3 px-2 col-span-3 text-gray-700">对账金额</div>
        </div>
        
        <!-- 表内容 -->
        <div class="max-h-[300px] overflow-y-auto">
          <div v-for="(bill, index) in billList" :key="index" class="grid grid-cols-12 border-b hover:bg-gray-50 text-sm">
            <div class="py-3 px-4 col-span-1">
              <el-checkbox v-model="bill.selected" @change="handleSingleSelectionChange" />
            </div>
            <div class="py-3 px-2 col-span-4">{{ bill.accountNo }}</div>
            <div class="py-3 px-2 col-span-4">{{ bill.timeRange }}</div>
            <div class="py-3 px-2 col-span-3">¥ {{ formatMoney(bill.amount) }}</div>
          </div>
        </div>
      </div>
      
      <div class="flex justify-between mt-6">
        <div></div>
        <div class="flex gap-2">
          <el-button @click="showApplyInvoiceDialog = false" class="!rounded-md">取消</el-button>
          <el-button type="primary" @click="handleNextStep" class="!rounded-md">下一步</el-button>
        </div>
      </div>
    </el-dialog>
    
    <!-- 发票详情弹窗 -->
    <el-dialog
      v-model="showInvoiceDetailDialog"
      title="申请开票"
      width="45%"
      destroy-on-close
      class="invoice-detail-dialog"
      :append-to-body="true"
    >
      <div class="space-y-2 max-h-[60vh] overflow-y-auto px-1">
        <!-- 发票类型 -->
        <div class="flex items-center py-2 mb-1">
          <span class="w-24 text-gray-700 flex-shrink-0">发票类型：</span>
          <el-radio-group v-model="invoiceDetail.type">
            <el-radio label="normal" class="mr-8">增值税普通发票</el-radio>
            <el-radio label="special">增值税专用发票</el-radio>
          </el-radio-group>
        </div>
        
        <!-- 分隔线 -->
        <div class="border-b border-gray-100 my-1"></div>
        
        <!-- 发票金额 -->
        <div class="flex items-center py-2">
          <span class="w-24 text-gray-700 flex-shrink-0">发票金额：</span>
          <span class="text-base">¥ {{ formatMoney(invoiceDetail.amount) }}</span>
        </div>
        
        <!-- 发票抬头 -->
        <div class="flex items-center py-2">
          <span class="w-24 text-gray-700 flex-shrink-0">发票抬头：</span>
          <div class="flex-1">
            <el-input v-if="false" v-model="invoiceDetail.title" placeholder="请输入发票抬头" />
            <div class="h-[32px] flex items-center">{{ invoiceDetail.title || '请输入发票抬头' }}</div>
          </div>
        </div>
        
        <!-- 税号 -->
        <div class="flex items-center py-2">
          <span class="w-24 text-gray-700 flex-shrink-0">税号：</span>
          <div class="flex-1">
            <el-input v-if="false" v-model="invoiceDetail.taxNumber" placeholder="请输入税号" />
            <div class="h-[32px] flex items-center">{{ invoiceDetail.taxNumber || '请输入税号' }}</div>
          </div>
        </div>
        
        <!-- 根据发票类型显示的字段 -->
        <template v-if="invoiceDetail.type === 'special'">
          <!-- 单位地址 -->
          <div class="flex items-center py-2">
            <span class="w-24 text-gray-700 flex-shrink-0">单位地址：</span>
            <div class="flex-1">
              <el-input v-if="false" v-model="invoiceDetail.address" placeholder="请输入单位地址" />
              <div class="h-[32px] flex items-center">{{ invoiceDetail.address || '请输入单位地址' }}</div>
            </div>
          </div>
          
          <!-- 电话号码 -->
          <div class="flex items-center py-2">
            <span class="w-24 text-gray-700 flex-shrink-0">电话号码：</span>
            <div class="flex-1">
              <el-input v-if="false" v-model="invoiceDetail.phone" placeholder="请输入电话号码" />
              <div class="h-[32px] flex items-center">{{ invoiceDetail.phone || '请输入电话号码' }}</div>
            </div>
          </div>
          
          <!-- 开户银行 -->
          <div class="flex items-center py-2">
            <span class="w-24 text-gray-700 flex-shrink-0">开户银行：</span>
            <div class="flex-1">
              <el-input v-if="false" v-model="invoiceDetail.bank" placeholder="请输入开户银行" />
              <div class="h-[32px] flex items-center">{{ invoiceDetail.bank || '请输入开户银行' }}</div>
            </div>
          </div>
          
          <!-- 银行账户 -->
          <div class="flex items-center py-2">
            <span class="w-24 text-gray-700 flex-shrink-0">银行账户：</span>
            <div class="flex-1">
              <el-input v-if="false" v-model="invoiceDetail.bankAccount" placeholder="请输入银行账户" />
              <div class="h-[32px] flex items-center">{{ invoiceDetail.bankAccount || '请输入银行账户' }}</div>
            </div>
          </div>
        </template>
        
        <!-- 接收邮箱 -->
        <div class="flex items-center py-2">
          <span class="w-24 text-gray-700 flex-shrink-0">接收邮箱：</span>
          <el-input v-model="invoiceDetail.email" placeholder="请输入接收邮箱" class="flex-1" />
        </div>
      </div>
      
      <div class="flex justify-end mt-4 gap-3">
        <el-button @click="showInvoiceDetailDialog = false" class="!rounded-md px-8">取消</el-button>
        <el-button type="primary" @click="handleSubmitInvoice" class="!rounded-md px-8">确定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑发票信息弹窗 -->
    <el-dialog
      v-model="showEditInvoiceInfoDialog"
      title="编辑"
      width="45%"
      destroy-on-close
      class="invoice-edit-dialog"
      :append-to-body="true"
    >
      <div class="pt-2">
        <!-- 说明文字 -->
        <div class="flex items-center text-gray-600 mb-4 bg-gray-50 p-4 rounded">
          <el-icon class="mr-2 text-gray-500"><InfoFilled /></el-icon>
          <span>说明：增值税普通发票只需要填写必填信息；增值税专用发票需要填写全部信息</span>
        </div>
       
        <div class="space-y-4">
          <!-- 发票抬头 -->
          <div class="flex items-start py-2">
            <span class="w-28 text-gray-700 flex-shrink-0 pt-2">发票抬头</span>
            <span class="text-base flex-1">
              <span class="block">{{ invoiceInfo.title || 'xxxxxxx' }}</span>
            </span>
          </div>
          
          <!-- 税号 -->
          <div class="flex items-start py-2">
            <span class="w-28 text-gray-700 flex-shrink-0 pt-2">税号 <span class="text-red-500">*</span></span>
            <el-input v-model="editingInvoiceInfo.taxNumber" placeholder="请输入" class="flex-1" />
          </div>
          
          <!-- 单位地址 -->
          <div class="flex items-start py-2">
            <span class="w-28 text-gray-700 flex-shrink-0 pt-2">单位地址</span>
            <el-input v-model="editingInvoiceInfo.address" placeholder="请输入" class="flex-1" />
          </div>
          
          <!-- 电话号码 -->
          <div class="flex items-start py-2">
            <span class="w-28 text-gray-700 flex-shrink-0 pt-2">电话号码</span>
            <el-input v-model="editingInvoiceInfo.phone" placeholder="请输入" class="flex-1" />
          </div>
          
          <!-- 开户银行 -->
          <div class="flex items-start py-2">
            <span class="w-28 text-gray-700 flex-shrink-0 pt-2">开户银行</span>
            <el-input v-model="editingInvoiceInfo.bank" placeholder="请输入" class="flex-1" />
          </div>
          
          <!-- 银行账户 -->
          <div class="flex items-start py-2">
            <span class="w-28 text-gray-700 flex-shrink-0 pt-2">银行账户</span>
            <el-input v-model="editingInvoiceInfo.bankAccount" placeholder="请输入" class="flex-1" />
          </div>
          
          <!-- 接收邮箱 -->
          <div class="flex items-start py-2">
            <span class="w-28 text-gray-700 flex-shrink-0 pt-2">接收邮箱 <span class="text-red-500">*</span></span>
            <el-input v-model="editingInvoiceInfo.email" placeholder="请输入" class="flex-1" />
          </div>
        </div>
      </div>
      
      <div class="flex justify-end mt-6 gap-3">
        <el-button @click="showEditInvoiceInfoDialog = false" class="!rounded-md px-8">取消</el-button>
        <el-button type="primary" @click="handleSaveInvoiceInfo" class="!rounded-md px-8">确定</el-button>
      </div>
    </el-dialog>

    <!-- 查看发票详情弹窗 -->
    <el-dialog
      v-model="showViewInvoiceDialog"
      title="查看"
      width="45%"
      destroy-on-close
      class="invoice-view-dialog"
      :append-to-body="true"
    >
      <div class="space-y-5 max-h-[60vh] overflow-y-auto px-2">
        <!-- 上半部分：信息网格 -->
        <div class="grid grid-cols-3 gap-x-4 gap-y-5">
          <!-- 发票抬头 -->
          <div>
            <div class="text-gray-600 mb-1 text-sm">发票抬头：</div>
            <div>{{ viewingInvoice.title || 'xxxxxx' }}</div>
          </div>
          
          <!-- 发票金额 -->
          <div>
            <div class="text-gray-600 mb-1 text-sm">发票金额：</div>
            <div>¥ {{ formatMoney(viewingInvoice.amount) }}</div>
          </div>
          
          <!-- 开票状态 -->
          <div>
            <div class="text-gray-600 mb-1 text-sm">开票状态：</div>
            <div>{{ getStatusText(viewingInvoice.status) }}</div>
          </div>
          
          <!-- 申请时间 -->
          <div>
            <div class="text-gray-600 mb-1 text-sm">申请时间：</div>
            <div>{{ viewingInvoice.applyTime || 'xxxxxx' }}</div>
          </div>
          
          <!-- 发票类型 -->
          <div>
            <div class="text-gray-600 mb-1 text-sm">发票类型：</div>
            <div>{{ viewingInvoice.type === 'normal' ? '增值税普通发票' : '增值税专用发票' }}</div>
          </div>
        </div>
        
        <!-- 分隔线 -->
        <div class="border-t border-gray-100 my-1"></div>
        
        <!-- 下半部分：发票类型选择 -->
        <div class="py-2">
          <div class="flex items-center">
            <span class="text-gray-700 mr-4">发票类型：</span>
            <el-radio-group v-model="viewingInvoice.type" disabled>
              <el-radio label="normal" class="mr-8">增值税普通发票</el-radio>
              <el-radio label="special">增值税专用发票</el-radio>
            </el-radio-group>
          </div>
        </div>
        
        <!-- 接收邮箱 -->
        <div class="py-2">
          <div class="flex items-start">
            <span class="text-gray-700 w-24 pt-1">接收邮箱：</span>
            <el-input v-model="viewingInvoice.email" disabled class="flex-1" />
          </div>
        </div>
      </div>
      
      <div class="flex justify-end mt-4">
        <el-button type="primary" @click="showViewInvoiceDialog = false" class="!rounded-md px-8">确定</el-button>
      </div>
    </el-dialog>

    <!-- 取消开票确认弹窗 -->
    <el-dialog
      v-model="showCancelInvoiceDialog"
      title="取消开票"
      width="30%"
      destroy-on-close
      class="cancel-invoice-dialog"
      :append-to-body="true"
    >
      <div class="py-6 text-center">
        <p class="text-base">是否取消开票？</p>
      </div>
      
      <div class="flex justify-end gap-3">
        <el-button @click="showCancelInvoiceDialog = false" class="!rounded-md px-8">取消</el-button>
        <el-button type="primary" @click="confirmCancelInvoice" class="!rounded-md px-8">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { InfoFilled, Warning, ArrowRight } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

const router = useRouter();

// 模拟数据
const isVerified = ref(false);
const availableAmount = ref(0.00);
const appliedAmount = ref(0.00);
const unavailableAmount = ref(0.00);

// 发票信息
const invoiceInfo = reactive({
  title: '',
  email: '',
  taxNumber: '',
  address: '',
  phone: '',
  bank: '',
  bankAccount: ''
});

// 搜索表单
const searchForm = reactive({
  billNo: '',
  invoiceNo: '',
  type: '',
  dateRange: [],
});

// 当前状态
const currentStatus = ref('');

// 分页
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(100);

// 发票列表数据
const invoiceList = ref([
  {
    applyTime: '2025-01-01',
    billNo: 'xxxxxx',
    amount: 20.00,
    type: 'normal',
    invoiceNo: '',
    status: 'pending',
    remark: ''
  },
  {
    applyTime: '2025-01-01',
    billNo: 'xxxxxx',
    amount: 20.00,
    type: 'normal',
    invoiceNo: '',
    status: 'processing',
    remark: ''
  },
  {
    applyTime: '2025-01-01',
    billNo: 'xxxxxx',
    amount: 20.00,
    type: 'normal',
    invoiceNo: 'xxxxx',
    status: 'completed',
    remark: ''
  },
  {
    applyTime: '2025-01-01',
    billNo: 'xxxxxx',
    amount: 20.00,
    type: 'normal',
    invoiceNo: '',
    status: 'cancelled',
    remark: ''
  }
]);

// 申请开票相关数据
const showApplyInvoiceDialog = ref(false);
const invoiceSearchForm = reactive({
  accountNo: '',
  timeRange: []
});
const selectedBills = ref<any[]>([]);
const billTableRef = ref();
const allSelected = ref(false);
const billSelectionError = ref(false);

// 发票详情弹窗
const showInvoiceDetailDialog = ref(false);
const invoiceDetail = reactive({
  type: 'normal',
  amount: 0,
  title: '',
  taxNumber: '',
  address: '',
  phone: '',
  bank: '',
  bankAccount: '',
  email: ''
});

// 模拟的对账单列表数据
const billList = ref([
  {
    accountNo: 'xxxxxx',
    timeRange: '2025-01-01 ~ 2025-03-02',
    amount: 20.00,
    selected: false
  },
  {
    accountNo: 'xxxxxx',
    timeRange: '2025-01-01 ~ 2025-03-02',
    amount: 20.00,
    selected: false
  },
  {
    accountNo: 'xxxxxx',
    timeRange: '2025-01-01 ~ 2025-03-02',
    amount: 20.00,
    selected: false
  },
  {
    accountNo: 'xxxxxx',
    timeRange: '2025-01-01 ~ 2025-03-02',
    amount: 20.00,
    selected: false
  }
]);

// 编辑发票信息相关
const showEditInvoiceInfoDialog = ref(false);
const editingInvoiceInfo = reactive({
  title: '',
  email: '',
  taxNumber: '',
  address: '',
  phone: '',
  bank: '',
  bankAccount: ''
});

// 查看发票详情
const showViewInvoiceDialog = ref(false);
const viewingInvoice = reactive({
  title: '',
  amount: 0,
  status: '',
  applyTime: '',
  type: 'normal',
  email: '',
  invoiceNo: ''
});

// 取消开票相关
const showCancelInvoiceDialog = ref(false);
const cancellingInvoiceId = ref('');

// 初始化数据
onMounted(() => {
  // 可以从API获取初始数据
  fetchInitialData();
});

// 获取初始数据
const fetchInitialData = () => {
  // TODO: 调用API获取初始数据
  // 模拟数据
  availableAmount.value = 0.00;
  appliedAmount.value = 0.00;
  unavailableAmount.value = 0.00;
  isVerified.value = false;
  
  // 获取发票信息
  invoiceInfo.title = '';
  invoiceInfo.email = '';
  
  // 加载发票列表
  fetchInvoiceList();
};

// 获取发票列表
const fetchInvoiceList = () => {
  // TODO: 调用API获取发票列表
  // 这里使用模拟数据
};

// 格式化金额
const formatMoney = (amount: number) => {
  return amount.toFixed(2);
};

// 获取状态样式
const getStatusType = (status: string) => {
  const map: Record<string, string> = {
    pending: 'warning',
    processing: 'primary',
    completed: 'success',
    cancelled: 'info'
  };
  return map[status] || 'default';
};

// 获取状态文本
const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    pending: '待审核',
    processing: '开票中',
    completed: '已开票',
    cancelled: '已取消'
  };
  return map[status] || '未知状态';
};

// 前往实名认证
const goToVerify = () => {
  router.push('/dashboard/account/realName');
};

// 申请开票
const handleApplyInvoice = () => {
  // 显示申请开票弹窗
  showApplyInvoiceDialog.value = true;
};

// 搜索
const handleSearch = () => {
  // TODO: 实现搜索逻辑
  currentPage.value = 1; // 重置页码
  fetchInvoiceList();
};

// 重置
const handleReset = () => {
  searchForm.billNo = '';
  searchForm.invoiceNo = '';
  searchForm.type = '';
  searchForm.dateRange = [];
  
  // 重置后自动搜索
  handleSearch();
};

// 查看发票
const handleView = (row: any) => {
  // 复制发票信息到查看对象
  viewingInvoice.title = row.title || invoiceInfo.title;
  viewingInvoice.amount = row.amount;
  viewingInvoice.status = row.status;
  viewingInvoice.applyTime = row.applyTime;
  viewingInvoice.type = row.type;
  viewingInvoice.email = invoiceInfo.email;
  viewingInvoice.invoiceNo = row.invoiceNo;
  
  // 显示查看弹窗
  showViewInvoiceDialog.value = true;
};

// 取消开票
const handleCancel = (row: any) => {
  cancellingInvoiceId.value = row.id || row.billNo;
  showCancelInvoiceDialog.value = true;
};

// 分页大小变化
const handleSizeChange = (size: number) => {
  pageSize.value = size;
  fetchInvoiceList();
};

// 页码变化
const handleCurrentChange = (page: number) => {
  currentPage.value = page;
  fetchInvoiceList();
};

// 搜索对账单
const searchBills = () => {
  // TODO: 实际环境中调用API搜索对账单
  console.log('搜索对账单', invoiceSearchForm);
};

// 重置对账单搜索
const resetBillSearch = () => {
  invoiceSearchForm.accountNo = '';
  invoiceSearchForm.timeRange = [];
};

// 全选/取消全选
const handleSelectAll = (val: boolean) => {
  billList.value.forEach(bill => {
    bill.selected = val;
  });
  handleSingleSelectionChange();
};

// 处理单个选择变更
const handleSingleSelectionChange = () => {
  selectedBills.value = billList.value.filter(bill => bill.selected);
  // 更新全选状态
  allSelected.value = billList.value.length > 0 && billList.value.every(bill => bill.selected);
  console.log('选中的对账单', selectedBills.value);
};

// 下一步
const handleNextStep = () => {
  if (selectedBills.value.length === 0) {
    billSelectionError.value = true;
    return;
  }
  billSelectionError.value = false;
  
  // 计算选中账单的总金额
  const totalAmount = selectedBills.value.reduce((sum, bill) => sum + bill.amount, 0);
  
  // 设置发票详情
  invoiceDetail.amount = totalAmount;
  invoiceDetail.title = invoiceInfo.title || '';
  invoiceDetail.email = invoiceInfo.email || '';
  invoiceDetail.type = 'normal'; // 默认选择普通发票
  
  // 清空专用发票字段，避免切换后显示旧数据
  invoiceDetail.address = '';
  invoiceDetail.phone = '';
  invoiceDetail.bank = '';
  invoiceDetail.bankAccount = '';
  
  // 显示发票详情弹窗
  showApplyInvoiceDialog.value = false;
  showInvoiceDetailDialog.value = true;
};

// 提交发票申请
const handleSubmitInvoice = () => {
  // TODO: 实现提交发票申请逻辑
  ElMessage.success('发票申请提交成功');
  showInvoiceDetailDialog.value = false;
};

// 关闭申请开票弹窗
const handleCloseApplyInvoiceDialog = () => {
  showApplyInvoiceDialog.value = false;
  resetBillSearch();
};

// 编辑发票信息
const handleEditInvoiceInfo = () => {
  // 复制当前信息到编辑对象
  editingInvoiceInfo.title = invoiceInfo.title;
  editingInvoiceInfo.email = invoiceInfo.email;
  editingInvoiceInfo.taxNumber = invoiceInfo.taxNumber;
  editingInvoiceInfo.address = invoiceInfo.address;
  editingInvoiceInfo.phone = invoiceInfo.phone;
  editingInvoiceInfo.bank = invoiceInfo.bank;
  editingInvoiceInfo.bankAccount = invoiceInfo.bankAccount;
  
  // 显示编辑弹窗
  showEditInvoiceInfoDialog.value = true;
};

// 保存发票信息
const handleSaveInvoiceInfo = () => {
  // 验证必填项
  if (!editingInvoiceInfo.taxNumber) {
    ElMessage.warning('请填写税号');
    return;
  }
  if (!editingInvoiceInfo.email) {
    ElMessage.warning('请填写接收邮箱');
    return;
  }
  
  // 保存编辑后的信息
  invoiceInfo.taxNumber = editingInvoiceInfo.taxNumber;
  invoiceInfo.email = editingInvoiceInfo.email;
  invoiceInfo.address = editingInvoiceInfo.address;
  invoiceInfo.phone = editingInvoiceInfo.phone;
  invoiceInfo.bank = editingInvoiceInfo.bank;
  invoiceInfo.bankAccount = editingInvoiceInfo.bankAccount;
  
  ElMessage.success('发票信息保存成功');
  showEditInvoiceInfoDialog.value = false;
};

// 确认取消开票
const confirmCancelInvoice = () => {
  // TODO: 调用API取消开票
  ElMessage.success('已取消开票申请');
  showCancelInvoiceDialog.value = false;
  
  // 重新加载列表
  fetchInvoiceList();
};
</script>

<style scoped>
.el-radio-button :deep(.el-radio-button__inner) {
  border-radius: 0;
}
.el-radio-button:first-child :deep(.el-radio-button__inner) {
  border-radius: 4px 0 0 4px;
}
.el-radio-button:last-child :deep(.el-radio-button__inner) {
  border-radius: 0 4px 4px 0;
}

/* 在小屏幕上调整表单布局 */
@media (max-width: 768px) {
  .el-date-editor {
    width: 100% !important;
  }
  
  .el-select {
    width: 100% !important;
  }
}

/* 申请开票弹窗样式 */
.invoice-apply-dialog :deep(.el-dialog__header),
.invoice-detail-dialog :deep(.el-dialog__header) {
  padding: 16px 20px;
  margin-right: 0;
  border-bottom: 1px solid #ebeef5;
}

.invoice-apply-dialog :deep(.el-dialog__body),
.invoice-detail-dialog :deep(.el-dialog__body) {
  padding: 20px;
}

.invoice-apply-dialog :deep(.el-dialog__headerbtn),
.invoice-detail-dialog :deep(.el-dialog__headerbtn) {
  top: 16px;
}

.invoice-apply-dialog :deep(.el-dialog__title),
.invoice-detail-dialog :deep(.el-dialog__title) {
  font-size: 16px;
  font-weight: 500;
}

/* 自定义复选框的大小 */
.invoice-apply-dialog :deep(.el-checkbox__inner) {
  border-radius: 3px;
}

/* 自定义单选框样式 */
.invoice-detail-dialog :deep(.el-radio__inner) {
  border-radius: 50%;
}

/* 发票详情弹窗内容样式 */
.invoice-detail-dialog .space-y-6 > div,
.invoice-detail-dialog .space-y-5 > div {
  padding-bottom: 8px;
}

.invoice-detail-dialog :deep(.el-input__wrapper) {
  border-radius: 2px;
}

.invoice-detail-dialog :deep(.el-radio__input.is-checked .el-radio__inner) {
  background-color: #0052d9;
  border-color: #0052d9;
}

.invoice-detail-dialog :deep(.el-radio__input.is-checked + .el-radio__label) {
  color: #0052d9;
}

/* 编辑发票信息弹窗样式 */
.invoice-edit-dialog :deep(.el-dialog__header) {
  padding: 16px 20px;
  margin-right: 0;
  border-bottom: 1px solid #ebeef5;
}

.invoice-edit-dialog :deep(.el-dialog__body) {
  padding: 20px;
}

.invoice-edit-dialog :deep(.el-dialog__headerbtn) {
  top: 16px;
}

.invoice-edit-dialog :deep(.el-dialog__title) {
  font-size: 16px;
  font-weight: 500;
}

.invoice-edit-dialog :deep(.el-input__wrapper) {
  border-radius: 2px;
}

/* 取消开票弹窗样式 */
.cancel-invoice-dialog :deep(.el-dialog__header) {
  padding: 16px 20px;
  margin-right: 0;
  border-bottom: 1px solid #ebeef5;
}

.cancel-invoice-dialog :deep(.el-dialog__body) {
  padding: 20px;
}

.cancel-invoice-dialog :deep(.el-dialog__headerbtn) {
  top: 16px;
}

.cancel-invoice-dialog :deep(.el-dialog__title) {
  font-size: 16px;
  font-weight: 500;
}
</style>