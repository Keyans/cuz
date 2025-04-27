<template>
  <div class="image-uploader">
    <div class="uploader-content">
      <!-- 左侧图片列表区域 -->
      <VueDraggable
        v-if="imageList.length"
        v-model="imageList"
        class="image-list-container"
        item-key="index"
        @end="onDragEnd"
        :disabled="!props.draggable"
      >
        <template #item="{ element, index }">
          <div class="image-item">
            <el-image
              v-if="element.imagePath"
              :src="element.imagePath"
              fit="cover"
            />
            <div v-else style="text-align: center; line-height: 120px">
              效果图 {{ element.position }}
            </div>
            <div class="image-actions">
              <el-button
                type="danger"
                link
                @click.stop="handleRemove(element, index)"
              >
                <el-icon>
                  <Delete />
                </el-icon>
              </el-button>
            </div>
          </div>
        </template>
      </VueDraggable>

      <!-- 右侧操作按钮区域 -->
      <div
        class="action-buttons"
        v-if="modelValue.length < props.limit"
        v-loading="loading"
      >
        <q-upload v-if="props.uploadMethod.includes('local')" @change="(imagePath:string)=>addSeat(null,imagePath)">
          <el-button style="width: 94.5px">{{ props.localText }}</el-button>
        </q-upload>
        <el-popover
          ref="popoverRef"
          placement="right"
          trigger="click"
          width="225"
        >
          <template #default>
            <div v-for="item in 20" style="margin-bottom: 5px">
              <el-button style="width: 200px" @click="addSeat(item,null)"
                >效果图 {{ item }}</el-button
              >
            </div>
          </template>
          <template #reference>
            <el-button
              v-if="props.uploadMethod.includes('gallery')"
              @click="openGallery"
              >{{ props.galleryText }}</el-button
            >
          </template>
        </el-popover>
      </div>
    </div>
    <!-- <ImageSelect ref="imageSelectRef" :limit="1" @confirm="handleConfirm" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from "vue";
import { Delete } from "@element-plus/icons-vue";
import type { UploadFile } from "element-plus";
import VueDraggable from "vuedraggable";
import QUpload from '@/components/q-upload/q-upload.vue'

interface ImageFile extends UploadFile {
  width?: number;
  height?: number;
}

const props = withDefaults(
  defineProps<{
    limit: number; // 限制上传数量
    uploadMethod: Array<string>;
    modelValue: ImageFile[]; // 上传方式
    localText: string; // 本地按钮文本
    galleryText: string; // 图库按钮文本
    draggable: boolean; // 是否允许拖拽
  }>(),
  {
    limit: 10,
    uploadMethod: () => ["local", "gallery"],
    localText: "本地",
    galleryText: "图库",
    draggable: true
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: ImageFile[]];
}>();

const imageList = computed({
  get: () => props.modelValue,
  set: value => {
    emit("update:modelValue", value);
  }
});

const loading = ref(false);

const imageSelectRef = ref();
// TODO: 实现图库选择功能
const openGallery = () => {
  return;
  imageSelectRef.value.show();
};

// 添加效果图占位&&本地图
const popoverRef = ref();
async function addSeat(index:number|null = null,imagePath:string|null = null) {
  const file = {
    index:imageList.value.length + 1,
    imagePath,
    fileId: null,
    position: index,
    width: null,
    height: null 
  };
  const newFileList = [...props.modelValue, file];
  await emit("update:modelValue", newFileList);
  popoverRef.value.hide();
}

// 删除图片
const handleRemove = (file: UploadFile, index) => {
  // const newFileList = props.modelValue.filter(f => f.uid !== file.uid);
  const newFileList = [...props.modelValue];
  newFileList.splice(index, 1);
  emit("update:modelValue", newFileList);
};

// 拖拽排序
const onDragEnd = () => {
  emit("update:modelValue", imageList.value);
};
</script>

<style scoped>
.image-uploader {
  width: 100%;
}

.uploader-content {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.image-list-container {
  min-height: 120px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  width: 120px;
  height: 120px;
  background-color: #f5f7fa;
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  padding: 12px;

  :deep(.el-button + .el-button) {
    margin-left: 0;
  }
}

.image-list {
  width: 100%;
  margin-top: 16px;
}

.image-item {
  width: 120px;
  height: 120px;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  cursor: v-bind("props.draggable ? 'move' : 'default'");
  background: #fff;
  border: 1px solid #dcdfe6;
  transition: all 0.3s;

  &:hover {
    border-color: var(--el-color-primary);
  }
}

.image-item:hover .image-actions {
  opacity: 1;
}

.image-actions {
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 4px;
  opacity: 0;
  transition: opacity 0.3s;
}

.upload-container {
  width: 100%;
  display: flex;
  align-items: flex-start;
}

:deep(.el-upload--picture-card) {
  width: 120px !important;
  height: 120px !important;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 120px !important;
  height: 120px !important;
}

:deep(.el-image) {
  width: 100%;
  height: 100%;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}
</style>
