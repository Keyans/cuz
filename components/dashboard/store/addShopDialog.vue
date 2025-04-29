<template>
    <el-dialog v-model="showDialog" title="新增店铺" width="500" :z-index="1000">
        <div class="flex flex-col">
            <el-form>
                <el-form-item label="电商平台" label-width="80">
                    <el-select v-model="newShop.platform" placeholder="请选择" @change="handlePlatformChange">
                        <el-option v-for="item in platformList" :key="item.thirdPartyPlatformType"
                            :value="item.thirdPartyPlatformType" :label="item.thirdPartyPlatformName" />
                    </el-select>
                </el-form-item>

                <el-form-item label="地区" label-width="80">
                    <el-select v-model="newShop.authRegion" placeholder="请选择">
                        <el-option v-for="item in authRegionList" :key="item.id"
                            :value="item.authRegion" :label="item.authRegion" />
                    </el-select>
                </el-form-item>

                <el-form-item label="店铺名称" label-width="80">
                    <el-input v-model="newShop.name"></el-input>
                </el-form-item>

                <el-form-item label="接口类型" label-width="80" v-if="typeList && typeList.length > 0">
                    <el-select v-model="newShop.type" placeholder="请选择" @change="handleTypeChange">
                        <el-option v-for="item in typeList" :key="item.authAppType" :value="item.authAppType"
                            :label="item.authAppDesc" />
                    </el-select>
                </el-form-item>

                <el-form-item label="商品token" v-if="newShop.type" label-width="80">
                    <el-input v-model="newShop.productCode"></el-input>
                </el-form-item>

                <el-form-item label="订单token" v-if="newShop.type && newShop.showOrderCode" label-width="80">
                    <el-input v-model="newShop.orderCode"></el-input>
                </el-form-item>
            </el-form>

            <div class="w-full flex justify-end space-x-4">
                <button class="" @click="closeAddShopDialog">取消</button>
                <button class="btn-secondary" @click="addShop">确认</button>
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { doAddShop, doGetPlatformList } from "~/apis/store/shop";

const props = defineProps({
    platformList: {
        type: Array<any>,
        default: () => []
    }
})
const emits = defineEmits(['refresh'])
const showDialog = ref(false)
const newShop = ref({
    platform: '',
    type: '',
    productCode: '',
    name: "",
    orderCode: '',
    showOrderCode: false,
    authRegion: ''
})
const typeList = ref<Array<any>>([])
const authRegionList = ref<Array<any>>([{
    authRegion: 'US',
    authRegionDesc: '美国',
    id: 1
}])

function handlePlatformChange(value: string) {
    const item = props.platformList.find((item) => item.thirdPartyPlatformType === value)
    if (item) {
        typeList.value = item.appList;
    } else {
        typeList.value = [];
    }
}

function handleTypeChange(value: string) {
    const item = typeList.value.find((item) => item.authAppType === value)
    // PUBLISH 商品上架
    // ORDER 订单
    if (item.authAppType === "ORDER") {
        newShop.value.showOrderCode = true;
    } else {
        newShop.value.showOrderCode = false;
    }
}

function showAddShopDialog() {
    newShop.value = {
        platform: '',
        type: '',
        name: '',
        productCode: '',
        orderCode: '',
        showOrderCode: false,
        authRegion: ''
    }
    typeList.value = []
    showDialog.value = true
}

function closeAddShopDialog() {
    showDialog.value = false
}

function addShop() {
    if (!newShop.value.platform) {
        ElMessage.warning('请选择电商平台')
        return
    }
    if(!newShop.value.authRegion) {
        ElMessage.warning('请选择地区')
        return
    }
    if (!newShop.value.name) {
        ElMessage.warning('请输入店铺名称')
        return 
    }
    if (!newShop.value.type) {
        ElMessage.warning('请选择接口类型')
        return
    }
    if (!newShop.value.productCode) {
        ElMessage.warning('请输入商品token')
        return
    }
    if (newShop.value.type === "ORDER" && !newShop.value.orderCode) {
        ElMessage.warning('请输入订单token')
        return
    }

    const params = {
        platformType: newShop.value.platform,
        appType: newShop.value.type,
    }
    let data: any = {
        // 商品上架 7bfhs8gvasrcyj0d4acfxsmls24ulcxo6agmu82lpbf9hnrej3mvnilr
        productAuthCode: newShop.value.productCode,
        thirdPartyShopName: newShop.value.name,
    }
    if (newShop.value.showOrderCode) {
        // productAuthCode: 1ztxpbwun50frij2lrki9nnvtkf4gz53bjgplutf1kj0nggrxzosldc0
        // order upsli4prbemzi8okabhsabcbxj5nlygmnenwyctcnhiplahygxe2asaxrdw
        data = {
            ...data,
            orderAuthCode: newShop.value.orderCode,
            authRegion: 'US'
        }
    }

    doAddShop(params, data).then((res) => {
        if (res.code === 200) {
            ElMessage.success('新增成功')
            showDialog.value = false
            emits('refresh')
        }
    })
}

defineExpose({ showAddShopDialog, closeAddShopDialog })

</script>
