<template>
  <div class="image-uploader">
    <div class="uploader-content">
      <!-- 左侧图片列表区域 -->
      <div v-if="modelValue.length" class="image-list-container">
        <div
          v-for="(element, index) in imageList"
          :key="index"
          class="image-item"
        >
          <el-image :src="element.imagePath" fit="cover" />
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
      </div>

      <!-- 右侧操作按钮区域 -->
      <div class="action-buttons" v-if="modelValue.length < props.limit">
        <input
          ref="fileInput"
          type="file"
          multiple
          accept="image/*"
          style="display: none"
          @change="handleLocalFileSelect"
        />
        <el-button
          v-if="props.uploadMethod.includes('local')"
          @click="triggerFileInput"
          >{{ props.localText }}</el-button
        >
        <el-button
          v-if="props.uploadMethod.includes('gallery')"
          @click="openGallery"
          >{{ props.galleryText }}</el-button
        >
      </div>
    </div>
    <!-- <ImageSelect ref="imageSelectRef" :limit="1" @confirm="handleConfirm" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from "vue";
import { ElMessage } from "element-plus";
import type { UploadFile } from "element-plus";
// import ImageSelect from "@/views/components/image/ImageSelect.vue";
// import { imageCosUpload } from "@/api/trade/goodsManagement/productManage";
import { doUpload } from "~/apis/finance/publish";

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
  }>(),
  {
    limit: 10,
    uploadMethod: () => ["local", "gallery"],
    localText: "本地",
    galleryText: "图库"
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: ImageFile[]];
}>();

const drag = ref(false);

const imageList = computed(() => props.modelValue);
const fileInput = ref<HTMLInputElement | null>(null);

// 文件验证
const beforeUpload = (file: File) => {
  return new Promise<boolean>(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        if (file.size > 2 * 1024 * 1024) {
          ElMessage.error("图片大小不能超过2M");
          resolve(false);
        }
        resolve(true);
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  });
};

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click();
};

// 处理本地文件选择
const handleLocalFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const files = Array.from(input.files);

  for (const file of files) {
    const isValid = await beforeUpload(file);
    if (isValid) {
      const reader = new FileReader();
      reader.onload = e => {
        const newFile = {
          uid: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          name: file.name,
          url: e.target?.result as string,
          raw: file
        };
        // const newFileList = [...props.modelValue, newFile];
        // emit('update:modelValue', newFileList);
        getLocalImageUrl(file);
      };
      reader.readAsDataURL(file);
    }
  }
  // 重置 input，以便能够重复选择同一文件
  input.value = "";
};

// 上传本地图片获取URL
const getLocalImageUrl = file => {
  const formData = new FormData();
  formData.append("fileList", file);
  doUpload(formData).then((res: any) => {
    console.log(111, res);
    // 修改这里的数据结构匹配
    const file = {
      imagePath: res[0].imageUrl, // 使用 imageUrl 而不是 url
      fileId: res[0].imageCode // 使用 imageCode 而不是 id
    };
    const newFileList = [...props.modelValue, file];
    emit("update:modelValue", newFileList);
  });
};

const imageSelectRef = ref();
const openGallery = () => {
  imageSelectRef.value.show();
};

const handleConfirm = selectedImages => {
  console.log("selectedImages", selectedImages);
  const file = {
    imagePath: selectedImages[0].imageSourceUrl,
    fileId: selectedImages[0].id
  };
  const newFileList = [...props.modelValue, file];
  emit("update:modelValue", newFileList);
};

// 处理文件变化
const handleFileChange = (uploadFile: UploadFile) => {
  const file = {
    ...uploadFile
    // uid: `${Date.now()}-${Math.random().toString(36).slice(2)}` // 确保uid唯一
  };
  const newFileList = [...props.modelValue, file];
  emit("update:modelValue", newFileList);
};

// 删除图片
const handleRemove = (file: UploadFile, index) => {
  // const newFileList = props.modelValue.filter(f => f.uid !== file.uid);
  const newFileList = [...props.modelValue];
  newFileList.splice(index, 1);
  emit("update:modelValue", newFileList);
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
  cursor: move;
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
</style>
