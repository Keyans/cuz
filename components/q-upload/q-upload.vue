<!--
 * @description: 上传组件
 * @Author: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @Date: 2024-02-09 09:59:34
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @LastEditTime: 2024-02-10 11:38:51
-->
<script lang="ts" setup>
// import { ref, PropType, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'
// import cropper from './cropper.vue'
import { ElMessage } from 'element-plus'
import { useVModel } from '@vueuse/core'
import { verifyFormat, httpRequest } from './upload'
import type { UploadConfig, CusUploadRawFile } from './upload'
import type { UploadFile, UploadRawFile } from 'element-plus'
/*
 *variable
 */
// TODO： 类型优化
const $props = defineProps({
    uploadUrl: {
        type: String,
        default: 'saas-aimall-message-pigeon/oss/upload',
    },
    disabled: { type: Boolean, default: false },
    src: {
        type: String,
        default: '',
    },
    format: {
        type: Object as PropType<UploadConfig | { width: number } | { height: number } | { type: Array<string> } | { size: number }>,
        default() {
            return {
                width: 10000,
                height: 10000,
                types: ['image/png', 'image/jpg', 'image/gif', 'image/jpeg', 'image/avif'],
                size: 2,
            }
        },
    },
    width: {
        type: Number,
        default: 60,
    },
    height: {
        type: Number,
        default: 60,
    },
    appendToBody: {
        type: Boolean,
        default: false,
    },
})
const $emit = defineEmits(['update:src', 'change', 'success', 'beforeUpdate'])
const imgSrc = useVModel($props, 'src', $emit)
const uploadRef = ref()
const cropperSrc = ref('')
const isShowCropper = ref(false)
// 暂存cropper的file
const tempCropperFile = ref()
/*
 *lifeCircle
 */
/*
 *function
 */
const handleChangeUpload = async (file: CusUploadRawFile) => {
    if (file.status !== 'ready') return
    const { src, success } = await verifyFormat(file, $props.format)
    if (success && src) {
        cropperSrc.value = src
        // isShowCropper.value = true
        handleCropperLoad(src)
    } else {
        uploadRef.value.handleRemove(file)
    }
}
/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: cropper组件裁剪完成回调
 * @param {string} uploadStr
 */
const handleCropperLoad = (uploadStr: string) => {
    tempCropperFile.value = uploadStr
    uploadRef.value.submit()
}
const handleUploadRequest = async (request: { action: string; data: any; file: File; filename: string; headers: any; method: string }) => {
    try {
        $emit('beforeUpdate', request.file)
        let imgStr = await httpRequest(request, tempCropperFile.value)
        imgSrc.value = imgStr
        $emit('change', imgStr)
    } catch (e) {
        ElMessage.error('图片上传失败')
    }
}
const handleClose = () => {
    uploadRef.value.handleRemove((file: UploadFile | UploadRawFile, rawFile?: UploadRawFile) => {})
}
</script>
<template>
    <div class="qupload">
        <el-upload
            ref="uploadRef"
            :action="$props.uploadUrl"
            :auto-upload="false"
            :disabled="$props.disabled"
            :http-request="handleUploadRequest"
            :on-change="handleChangeUpload"
            :show-file-list="false"
            class="avatar-uploader"
            @success="$emit('success', { tempCropperFile })"
        >
            <slot>
                <img v-if="imgSrc" :src="imgSrc" :style="{ width: `${$props.width}px`, height: `${$props.height}px` }" />
                <el-icon v-else :style="{ width: `${$props.width}px`, height: `${$props.height}px` }"><i-ep-plus /></el-icon>
            </slot>
        </el-upload>
        <!-- <cropper
            v-if="isShowCropper"
            v-model:cropper-show="isShowCropper"
            :append-to-body="appendToBody"
            :cropper-src="cropperSrc"
            @close="handleClose"
            @upload-img="handleCropperLoad"
        /> -->
    </div>
</template>

<style lang="scss" scoped>
// @include b(qupload) {
//     border-radius: 6px;
//     border: 1px dashed #ccc;
//     & img {
//         border-radius: 6px;
//     }
// }
// .avatar-uploader {
//     @include flex();
// }
</style>
