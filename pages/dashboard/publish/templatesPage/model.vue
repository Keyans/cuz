<template>
  <div>
    <div v-if="!modelInfo.id">
      <!-- 添加模特信息 -->
      <el-button @click="addModel">添加模特信息</el-button>
    </div>
    <div v-else>
      <div style="display: flex;align-items: center;">
        <div style="flex: 1;">
          <el-descriptions :column="1" border>
            <!-- 试穿尺码 -->
            <el-descriptions-item label="试穿尺码" align="center"
              label-class-name="descriptionsLabel">
              {{ modelInfo.size }}
            </el-descriptions-item>
            <!-- 试穿感受 -->
            <el-descriptions-item label="试穿感受" align="center"
              label-class-name="descriptionsLabel">
              <!-- '合身', '偏小', '偏大' -->
              {{ ['合身', '偏小', '偏大'][modelInfo.sensation - 1] }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions direction="vertical" :column="3" border>
            <!-- 模特头像 -->
            <el-descriptions-item label="模特头像" align="center"
              label-class-name="avatarLabel">
              <div style="display: flex;justify-content: center;">
                <img :src="modelInfo.mannequin.avatarUrl" alt="">
              </div>
            </el-descriptions-item>
            <!-- 模特名称 -->
            <el-descriptions-item label="模特名称" align="center">{{ modelInfo.mannequin.name }}</el-descriptions-item>
            <!-- 模特信息 -->
            <el-descriptions-item label="模特信息" align="center">
              <div style="text-align: left;">
                <div>
                  <!-- 身高 -->
                  <span>身高：</span>
                  <span>{{ Number(modelInfo.mannequin.info.height).toFixed(0) }} CM</span>
                </div>
                <div>
                  <span>
                    <!-- 胸围 -->
                    <span>胸围：</span>
                    <span>{{ Number(modelInfo.mannequin.info.bust).toFixed(0) }} CM</span>
                  </span>
                  <span style="margin: 0 10px;">
                    <!-- 腰围 -->
                    <span>腰围：</span>
                    <span>{{ Number(modelInfo.mannequin.info.waist).toFixed(0) }} CM</span>
                  </span>
                  <span>
                    <!-- 臀围 -->
                    <span>臀围：</span>
                    <span>{{ Number(modelInfo.mannequin.info.hipline).toFixed(0) }} CM</span>
                  </span>
                </div>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- 修改模特 -->
        <div style="width: 100px;text-align: center;"><el-button @click="addModel">修改模特</el-button></div>
      </div>
    </div>
    <!-- 添加模特信息 -->
    <el-dialog v-model="dialogVisible" title="添加模特信息" width="1000"
      :close-on-click-modal="false" :close-on-press-escape="false" destroy-on-close>
      <div>
        <el-form ref="formRef" :model="modelInfo" :rules="rules" label-width="auto">
          <!-- 试穿尺码 -->
          <el-form-item label="试穿尺码" prop="size">
            <el-radio-group v-model="modelInfo.size">
              <el-radio v-for="item in props.sizeList" :label="item.sys">{{ item.sys }}</el-radio>
              <!-- <el-radio label="M">M</el-radio> -->
            </el-radio-group>
          </el-form-item>
          <!-- 试穿感受 -->
          <el-form-item label="试穿感受" prop="sensation">
            <el-radio-group v-model="modelInfo.sensation">
              <!-- 合身 -->
              <el-radio :label="1">合身</el-radio>
              <!-- 偏小 -->
              <el-radio :label="2">偏小</el-radio>
              <!-- 偏大 -->
              <el-radio :label="3">偏大</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 选择模特 -->
          <el-form-item prop="mannequin">
            <template #label><strong>选择模特</strong></template>
            <el-table :data="modelList" style="width: 100%" border
              :header-cell-style="{ background: 'var(--el-fill-color-light)', color: '#606266' }">
              <!-- 选择 -->
              <el-table-column prop="" label="选择" align="center" width="100">
                <template #default="scope">
                  <div class="tabelRadio">
                    <el-radio-group v-model="modelId">
                      <el-radio :label="scope.row.id"></el-radio>
                    </el-radio-group>
                  </div>
                </template>
              </el-table-column>
              <!-- 模特头像 -->
              <el-table-column prop="" label="模特头像" align="center" width="200">
                <template #default="scope">
                  <img :src="scope.row.headPortrait" alt="">
                </template>
              </el-table-column>
              <!-- 模特名称 -->
              <el-table-column prop="modelName" label="模特名称" align="center"
                width="150" />
              <!-- 模特信息 -->
              <el-table-column prop="" label="模特信息" align="center">
                <template #default="scope">
                  <div style="text-align: left;">
                    <div>
                      <!-- 身高 -->
                      <span>身高：</span>
                      <span>{{ Number(scope.row.info.height ).toFixed(0) }} CM</span>
                    </div>
                    <div>
                      <span>
                        <!-- 胸围 -->
                        <span>胸围：</span>
                        <span>{{ Number(scope.row.info.bust ).toFixed(0) }} CM</span>
                      </span>
                      <span style="margin: 0 10px;">
                        <!-- 腰围 -->
                        <span>腰围：</span>
                        <span>{{ Number(scope.row.info.waist ).toFixed(0) }} CM</span>
                      </span>
                      <span>
                        <!-- 臀围 -->
                        <span>臀围：</span>
                        <span>{{ Number(scope.row.info.hipline ).toFixed(0) }} CM</span>
                      </span>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">
            关闭
          </el-button>
          <el-button type="primary" @click="submit">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, nextTick } from "vue";
import { doGetModelInfoList } from "~/apis/finance/publish";;

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  // middleGroundShopId: {
  //   type: String,
  //   default: ''
  // },
  sizeList: {
    type: Array,
    default: () => []
  },
  appType:{
    type:String,
    default:''
  },
  appShopId:{
    type:String,
    default:''
  }
});

const emit = defineEmits(['update:modelValue']);

const dialogVisible = ref(false);
const formRef = ref();
const modelInfo = reactive({
  id: null,
  size: undefined,
  sensation: 1,
  mannequin: {}
});
const rules = reactive({
  size: [{ required: true, message: '不能为空', trigger: "blur" }],
  sensation: [{ required: true, message: '不能为空', trigger: "blur" }],
  mannequin: [{ required: true, message: '不能为空', trigger: "blur" }],

});

// 监听props变化，更新本地数据
watch(() => props.modelValue, (newVal) => {
  if (newVal && Object.keys(newVal).length > 0) {
    Object.assign(modelInfo, newVal);
    if (!modelInfo.sensation) modelInfo.sensation = 1
    nextTick(() => {
      modelId.value = modelInfo.id;
    })
  }else{
    Object.assign(modelInfo, {
      id: null,
      size: undefined,
      sensation: 1,
      mannequin: {}
    });
  }

}, { deep: true, immediate: true });
watch(() => props.sizeList, (newVal) => {
  nextTick(() => {
    if (newVal && newVal.length > 0 && newVal[0] !== undefined)
      modelInfo.size = newVal[0].sys || undefined;
  })

}, { deep: true, immediate: true });


function addModel() {
  dialogVisible.value = true;
  getModelList();
}

// 获取模特列表
const modelId = ref(null);
const modelList = ref([]); // 模特列表
function getModelList() {
  let data = {
    // pageNo: 1,
    // pageSize: 500,
    // middleGroundShopId: props.middleGroundShopId,
    // modelType: 0
    appType:props.appType,
    appShopId:props.appShopId,
  }
  doGetModelInfoList(data).then(res => {
    modelList.value = res.data.modelList;
    if (modelList.value.length > 0 && !modelInfo.id) {
      modelId.value = modelList.value[0].id;
    }
  });
}

function submit() {
  formRef.value.validate((valid) => {
    if (!valid) return;
    dialogVisible.value = false;
    if (!modelId.value) return;
    let mannequin = modelList.value.find(item => item.id === modelId.value);
    modelInfo.id = modelId.value;
    modelInfo.mannequin = {
      avatarUrl: mannequin.headPortrait,
      name: mannequin.modelName,
      info: {
        height: mannequin.info.height,
        bust: mannequin.info.bust,
        waist: mannequin.info.waist,
        hipline: mannequin.info.hipline
      }
    };
    emit('update:modelValue', { ...modelInfo });
  })

}
</script>

<style lang="scss" scoped>
img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.tabelRadio {
  :deep(span.el-radio__label) {
    display: none;
  }
}

:deep(.avatarLabel) {
  width: 200px;
}
</style>
