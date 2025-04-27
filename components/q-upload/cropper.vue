<!--
 * @description: 
 * @Author: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @Date: 2024-02-09 13:24:00
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @LastEditTime: 2024-02-10 14:05:07
-->
<script setup lang="ts">
import { ref } from 'vue'
import { Sort, Switch, ZoomIn, RefreshRight, ZoomOut, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, RefreshLeft } from '@element-plus/icons-vue'
import VueCropper from 'vue-cropperjs'
import { useVModel } from '@vueuse/core'
import uuid from '@/public/js/uuid'
/*
 *variable
 */
 const $props = defineProps({
    cropperSrc: { type: String, default: '' },
    cropperShow: {
        type: Boolean,
        default: false,
    },
    appendToBody: {
        type: Boolean,
        default: false,
    },
})
const $emit = defineEmits(['upload-img', 'update:cropperShow', 'close'])
const cropImg = ref('')
const cropperShow = useVModel($props, 'cropperShow', $emit)
const cropper = ref()
const FlipY = ref()
const FlipX = ref()
/*
 *lifeCircle
 */
/*
 *function
 */
/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: 设置翻转
 * @returns {*}
 */
const flipX = () => {
    const dom = FlipX.value
    let scale = dom.getAttribute('data-scale')
    scale = scale ? -scale : -1
    cropper.value.scaleX(scale)
    dom.setAttribute('data-scale', scale)
}
/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: 设置翻转
 * @returns {*}
 */
const flipY = () => {
    const dom = FlipY.value
    let scale = dom.getAttribute('data-scale')
    scale = scale ? -scale : -1
    cropper.value.scaleY(scale)
    dom.setAttribute('data-scale', scale)
}
/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: 移动图片
 * @param {*} offsetX
 * @param {*} offsetY
 * @returns {*}
 */
const move = (offsetX: number, offsetY: number) => {
    cropper.value.move(offsetX, offsetY)
}
/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: 重置
 * @returns {*}
 */
const reset = () => {
    cropper.value.reset()
}
/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: 角度旋转
 * @param {*} deg 角度
 * @returns {*}
 */
const rotate = (deg: number) => {
    cropper.value.rotate(deg)
}
/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: 图片放大
 * @param {*} percent
 * @returns {*}
 */
const zoom = (percent: number) => {
    cropper.value.relativeZoom(percent)
}
/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: 剪切好的图片
 * @returns {*}
 */
const cropImage = () => {
    cropImg.value = cropper.value.getCroppedCanvas().toDataURL()
}

/**
 * @LastEditors: 黄奎 本源码仅授权于黄奎所在公司内部业务使用，严禁外传，否则将进行法律追责。
 * @description: 处理完成
 * @returns {*}
 */
const handleFinish = () => {
    // 获取截图的base64 数据
    cropImg.value = cropper.value.getCroppedCanvas().toDataURL()
    function dataURLtoFile(dataurl: string, filename: string) {
        let arr = dataurl.split(',')
        let mime = arr[0].match(/:(.*?);/)![1]
        let suffix = mime.split('/')[1]
        let bstr = window.atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], `${filename}.${suffix}`, {
            type: mime,
        })
        //将base64转换为文件
    }
    const file = dataURLtoFile(cropImg.value, uuid(10))
    $emit('upload-img', file)
    cropperShow.value = false
}
const handleCloseDialog = () => {
    $emit('close')
    cropperShow.value = false
}
</script>
<template>
    <el-dialog v-model="cropperShow" width="700px" :append-to-body="appendToBody" title="图片裁剪" @close="handleCloseDialog">
        <div class="cropper-container">
            <div class="cropper-container__content">
                <section class="cropper-container__content--area">
                    <div class="img-cropper">
                        <div style="width: 400px">
                            <vue-cropper
                                ref="cropper"
                                :ontainer-style="{ width: '200px', height: '400px' }"
                                output-type="jpeg"
                                overflow-hidden
                                :src="$props.cropperSrc"
                                preview=".preview"
                                :min-container-height="400"
                                background
                            />
                        </div>
                        <el-button-group class="cropper-container__btnGroup">
                            <el-button size="" :icon="ZoomIn" @click="zoom(0.2)" />
                            <el-button size="" :icon="ZoomOut" @click="zoom(-0.2)" />
                            <el-button size="" :icon="ArrowLeft" @click="move(-10, 0)" />
                            <el-button size="" :icon="ArrowRight" @click="move(10, 0)" />
                            <el-button size="" :icon="ArrowUp" @click="move(0, -10)" />
                            <el-button size="" :icon="ArrowDown" @click="move(0, 10)" />
                            <el-button size="" :icon="Switch" class="flipX" @click="flipX" />
                            <el-button size="" :icon="Sort" @click="flipY" />
                            <a ref="FlipX" href="#" class="inita" />
                            <a ref="FlipY" href="#" class="inita" />
                            <el-button size="" :icon="RefreshLeft" @click="rotate(90)" />
                            <el-button size="" :icon="RefreshRight" @click="rotate(-90)" />
                        </el-button-group>
                    </div>
                </section>
                <!-- 预览框 s  -->
                <section class="preview-area">
                    <p>预览</p>
                    <div class="preview" />
                    <!-- <p>效果展示</p>
                    <div class="cropped-image">
                        <img v-if="cropperParam.cropImg" :src="cropperParam.cropImg" alt="裁剪图片" />
                        <div v-else class="crop-placeholder" />
                    </div> -->
                </section>
            </div>
        </div>

        <template #footer>
            <span class="dialog-footer">
                <el-button size="" @click="reset">重置</el-button>
                <el-button size="" @click="handleCloseDialog">取消</el-button>
                <el-button size="" type="primary" @click="handleFinish">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<style>
@import 'cropperjs/dist/cropper.css';
</style>
<style scoped lang="scss">
// @include b(cropper-container) {
//     width: 100%;
//     @include e(content) {
//         display: flex;
//         justify-content: space-around;
//     }
//     @include e(btnGroup) {
//         width: 400px;
//         display: flex;
//         justify-content: center;
//         margin-top: 20px;
//     }
// }
// @include b(preview-area) {
//     width: 30%;
//     & p {
//         font-size: 1.25rem;
//         color: #000;
//         font-weight: 700;
//         margin: 0;
//         margin-bottom: 1rem;
//     }
//     & p:last-of-type {
//         margin-top: 1rem;
//     }
// }
// @include b(preview) {
//     width: 100%;
//     height: calc(372px * (9 / 16));
//     overflow: hidden;
// }
// :deep(.cropper-bg) {
//     width: 400px !important;
//     background: pink;
// }

/* cropper-crop cropper-modal */
/* .crop-placeholder {
    width: 100%;
    height: 200px;
    background: #ccc;
}

.cropped-image img {
    max-width: 100%;
} */
</style>
