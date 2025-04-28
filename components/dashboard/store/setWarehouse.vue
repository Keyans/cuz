<template>
    <el-dialog v-model="showWarehouseDialog" title="设置发货仓" align-center>
        <div class="flex justify-between items-center">
            <el-select v-model="value" placeholder="Select" size="large" style="width: 240px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button type="primary" @click="showWarehouseDialog = false">
                刷新发货仓信息
            </el-button>
        </div>
        <div class="mt-4">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="plat" label="平台站点" />
                <el-table-column prop="name" label="店铺发货仓库" />
                <el-table-column prop="address" label="平台发货仓库" />
                <el-table-column prop="address" label="详细地址" />
            </el-table>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="showWarehouseDialog = false">取消</el-button>
                <el-button type="primary" @click="showWarehouseDialog = false">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const showWarehouseDialog = ref(false)

function showSetWarehouse() {
    showWarehouseDialog.value = true;
}

defineExpose({ showSetWarehouse })
</script>

<style scoped></style>