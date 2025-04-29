<template>
    <el-dialog v-model="showWarehouseDialog" title="设置发货仓" align-center :z-index="1000" :before-close="cancel">
        <div class="flex justify-between items-center">
            <el-select v-model="siteId" :class="{ 'border-red-500 border rounded': isSiteNull }" size="large"
                style="width: 320px" placeholder="请选择平台站点">
                <el-option v-for="item in siteList" :key="item.siteId" :label="item.siteName" :value="item.siteId" />
            </el-select>
            <button @click="refreshWarehouse"
                class="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors flex justify-center items-center">
                刷新发货仓信息
            </button>
        </div>
        <div class="mt-4">
            <el-table style="width: 100%" :data="tableData">
                <el-table-column prop="thirdPartySite" label="平台站点" />
                <el-table-column prop="thirdPartyName" label="店铺发货仓库" show-overflow-tooltip />
                <el-table-column prop="address" label="平台发货仓库">
                    <template #header>
                        <div class="flex items-center">
                            <span class="inline-block mr-1">平台发货仓库</span>
                            <el-tooltip placement="top" effect="light" trigger="click">
                                <template #content>
                                    <el-table :data="factoryList" max-height="280px">
                                        <el-table-column prop="warehouseName" label="平台发货仓库" width="120px" />
                                        <el-table-column prop="warehouseAddress" label="详细地址" width="300px" />
                                    </el-table>
                                </template>
                                <el-icon size="14">
                                    <InfoFilled />
                                </el-icon>
                            </el-tooltip>
                        </div>
                    </template>
                    <template #default="scope">
                        <el-select size="large" placeholder="请选择" v-model="scope.row.factoryId"
                            @change="handleChangeFactory(scope.row)">
                            <el-option v-for="item in factoryList" :key="item.factoryWarehouseId"
                                :label="item.warehouseName" :value="item.factoryWarehouseId" />
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="thirdPartyAddress" label="详细地址" />
            </el-table>
        </div>
        <template #footer>
            <div class="dialog-footer flex justify-end">
                <button @click="cancel"
                    class="border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-50 transition-colors flex justify-center items-center">
                    取消
                </button>
                <button @click="updateWarehouse"
                    class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors flex justify-center items-center ml-3">
                    确定
                </button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import { doGetFactoryThirdWarehouseList, doGetThirdWarehouseList, doGetThirdWarehouseSiteList, doRefreshWarehouseInfo, doUpdateThirdWarehouseBind } from '~/apis/store/shop';
import { InfoFilled } from "@element-plus/icons-vue";

const tableData = ref([])
// 获取列表数据
async function getData() {
    try {
        const { data } = await doGetThirdWarehouseList();
        console.log('doGetThirdWarehouseList', data);
        if (data.length > 0) {
            data.forEach((item: any) => {
                item.factoryId = item.factoryWarehouseId != 0 ? item.factoryWarehouseId : '';
                item.thirdPartyAddress = item.factoryWarehouseId!= 0? item.factoryWarehouseAddress : ''
            })
        }
        tableData.value = data;
    } catch (error) {
        console.error("获取仓库列表失败:", error);
    }
}

const siteList = ref<Array<any>>([])
const siteId = ref<string>('')
// 获得平台站点列表
async function getSiteList(appType: number) {
    try {
        const { data } = await doGetThirdWarehouseSiteList({ appType });
        siteList.value = data.siteList;
    } catch (error) {
        console.error("获取平台站点列表失败:", error);
    }
}

const factoryList = ref<Array<any>>([])
// 获取平台发货仓库信息
async function getFactoryList() {
    try {
        const { data } = await doGetFactoryThirdWarehouseList();
        factoryList.value = data.records;
    } catch (error) {
        console.error("获取平台发货仓库信息失败:", error);
    }
}

const showWarehouseDialog = ref(false)
const shopItem = ref<any>(null)
function showSetWarehouse(item: any) {
    shopItem.value = item;
    showWarehouseDialog.value = true;
    // 获取列表数据
    getData();
    // 获取selct下拉框数据
    getSiteList(item.platformTypeVal);
    // 获取平台发货仓库信息
    getFactoryList()
}

// 选择平台发货仓库
function handleChangeFactory(row: any) {
    console.log('row', row);
    const factoryItem = factoryList.value.find((item: any) => item.factoryWarehouseId === row.factoryId);
    console.log('factoryItem', factoryItem);
    if (factoryItem) {
        row.thirdPartyAddress = factoryItem.warehouseAddress;
    } else {
        row.thirdPartyAddress = '';
    }
}

// 更新
async function updateWarehouse() {
    // 【确定】时，校验：所有店铺发货仓库必须有关联平台发货仓，否则提示错误
    const hasUnselectedFactory = tableData.value.some((item: any) => !item.factoryId);
    if (hasUnselectedFactory) {
        ElMessage.warning('所有的店铺发货仓库必须关联平台发货仓！');
        return;
    }
    const dataList = [];
    for (const item of tableData.value) {
        console.log('item', item);
        // id 店铺三方仓库ID
        // factoryWarehouseId 工厂仓库ID
        // thirdPartyName 店铺三方仓库名称
        // thirdPartyAddress  店铺三方仓库地址
        // thirdPartySite 三方仓库站点
        // factoryWarehouseName 工厂仓库名称
        // factoryWarehouseAddress 工厂仓库地址
        dataList.push({
            id: item.id,
            factoryWarehouseId: item.factoryId,
        })
    }
    const { data } = await doUpdateThirdWarehouseBind(dataList)
    ElMessage.success('设置成功');
    showWarehouseDialog.value = false;
    console.log('dataList', dataList);

}
// 取消
function cancel() {
    isSiteNull.value = false;
    showWarehouseDialog.value = false;
    // 清空siteId
    siteId.value = '';
}

const isSiteNull = ref(false)
// 刷新发货仓信息
async function refreshWarehouse() {
    if (!siteId.value) {
        ElMessage.error('请选择平台站点');
        isSiteNull.value = true;
        return;
    }
    try {
        const { data } = await doRefreshWarehouseInfo({ appShopId: shopItem.value.middleGroundShopId, platformType: shopItem.value.platformTypeVal, siteId: siteId.value })
        getData()
    } catch (error) {
        console.error("刷新发货仓信息失败:", error);
    }
}

defineExpose({ showSetWarehouse })
</script>

<style scoped></style>