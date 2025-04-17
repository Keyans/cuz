<template>
  <div>
    <el-dialog v-model="dialogVisible" title="选择图片" width="1600" :close-on-click-modal="false"
      :close-on-press-escape="false" destroy-on-close append-to-body @close="close">
      <div>
        <el-tabs v-model="imageType" @tab-click="handleClick">
          <el-tab-pane label="素材图片" :name="1"></el-tab-pane>
          <el-tab-pane label="成品图片" :name="2"></el-tab-pane>
          <el-tab-pane label="工厂图片" :name="3"></el-tab-pane>
        </el-tabs>
        <!-- <Search v-if="refreshSearch" ref="searchRef" id="queryBox" :searchData="searchData" :hideNum="2"
          @search="searchFn" @reset="reset">
        </Search> -->

        <div class="btnBox">
          <el-button link type="primary" :disabled="!goBackList.length" @click="goBack">返回上一级</el-button>
          <el-divider direction="vertical" />
          <span style="font-size: 12px;">
            <span>全部</span>
            <span v-for="(item, index) in goBackList" :key="index"> / {{ item.folderName }}</span>
          </span>
        </div>

        <div class="mainBody">
          <div class="tree" v-loading="treeLoading">
            <el-tree :data="treeData" node-key="id" :default-expand-all="true" :expand-on-click-node="false"
              :props="{ children: 'subfolder', label: 'folderName' }" @node-click="handleNodeClick">
              <template #default="{ node, data }">
                <div style="display: flex; align-items: center; width: 100%;">
                  <img src="@/assets/treeIcon.png" alt=""
                    style="width: 14px; height: 14px;line-height: 14px;margin-right: 6px;flex-shrink: 0;" />
                  <div style="flex: 1;width: 0;">
                    <div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                      {{ node.data.folderName }}
                    </div>
                  </div>
                </div>
              </template>
            </el-tree>
          </div>
          <div style="flex: 1;" v-loading="imageListLoading">
            <div style="height: 600px;overflow-y: auto;">
              <div class="imgList">
                <div v-for="item in imageList" :key="item.id" style="height: 100px;">
                  <!-- 文件夹 -->
                  <div class="folder" v-if="item.type == 1" @click="folderClick(item)">
                    <div class="content">
                      <img style="width: 65px;" src="@/assets/fileNew.png" alt="">
                      <div class="name">{{ item.folderName }}</div>
                    </div>
                  </div>
                  <!-- 图片 -->
                  <div class="image" v-else :class="selectIdList.includes(item.id) ? 'activate' : ''"
                    @click="imgClick(item)">
                    <div class="content">
                      <img :src="item.thumbnailPath || item.imageSourceUrl" alt="">
                      <div class="name">{{ item.imageName }}</div>
                    </div>
                    <div class="check" :style="{ display: selectIdList.includes(item.id) ? 'block' : 'none' }">
                      <div class="icon"><el-icon><Select /></el-icon></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="margin-top: 30px;width: 100%;display: flex;justify-content: flex-end;padding-right: 10px;">
              <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"
                :page-size="pagination.pageSize" :page-sizes="pagination.pageSizes" :small="true"
                :current-page="pagination.currentPage" @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
              </el-pagination>
            </div>
          </div>
          <!-- 文件详情 -->
          <div class="details">
            <div class="title">图片详情</div>
            <div v-if="detailsData">
              <div class="img">
                <img style="width: 100%;height: 150px;object-fit: contain;"
                  :src="detailsData.thumbnailPath || detailsData.imageSourceUrl" alt="">
              </div>
              <div class="detailsText">
                <div class="name">{{ detailsData.imageName }}.{{ detailsData.imageFormat }}</div>
                <div style="font-size: 12px;color: #606266;line-height: 26px;">
                  <div>
                    <span>创建时间：</span>
                    <span>{{ detailsData.createTime }}</span>
                  </div>
                  <div>
                    <span>图片格式：</span>
                    <span>{{ detailsData.imageFormat }}</span>
                  </div>
                  <div>
                    <span>图片大小：</span>
                    <span>{{ (detailsData.imageSize / 1024).toFixed(2) }}M</span>
                  </div>
                  <div>
                    <span>图片长度：</span>
                    <span>{{ detailsData.imageWidth }}</span>
                  </div>
                  <div>
                    <span>图片宽度：</span>
                    <span>{{ detailsData.imageHeight }}</span>
                  </div>
                  <div>
                    <span>图片DPI：</span>
                    <span>{{ detailsData.imageDpi }}</span>
                  </div>
                  <div v-if="imageType == 1">
                    <span>是否缩放：</span>
                    <span>{{ detailsData.scaleStatus == 1 ? '是' : '否' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">{{ $t("buttons.pureClose") }}</el-button>
          <el-button type="primary" @click="submit">{{ $t("buttons.pureConfirm") }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineEmits, nextTick, watch } from "vue";
import { i18nValue } from "@/lang";
import Search from "@/components/ReSearch/index.vue";
import {
  tradeImagePage as page1,
  tradeFolders as tree1,
  finishedImagePage as page2,
  finishedFolders as tree2,
  imagePage as page3,
  factFolders as tree3
}
  from "@/api/shop/creativeMangement";
import { message } from "@/utils/message";
import { getTenantBindFindByTenantId } from "@/api/shop/goodsManagement";


const props = withDefaults(defineProps<{
  limit: number
}>(), {
  limit: 10000
});

// 分页参数
const pagination = reactive({
  total: 0,
  pageSize: 50,
  currentPage: 1,
  background: true,
  pageSizes: [10, 20, 50, 100]
});
const emits = defineEmits(["close", "confirm"]);

const refreshSearch = ref(true);
let searchForm = reactive<any>({});
const searchData = reactive({
  initialForm: {
    factoryId: null
  },
  searchItems: [
    {
      type: "select",
      label: "工厂名称",
      labelI18n: "",
      prop: "factoryId",
      props: {
        label: 'targetTenantName',
        value: 'targetTenantId'
      },
      options: [],
      hide: () => imageType.value != 3
    },
    {
      type: "input",
      label: "图片名称",
      labelI18n: "",
      prop: "keyword",
      placeholderI18n: "",
      maxlength: Infinity
    },
    {
      type: "select",
      label: "是否缩放",
      labelI18n: "",
      prop: "scaleStatus",
      options: [
        { label: "是", value: '1' },
        { label: "否", value: '0' },
      ],
      hide: () => imageType.value !== 1
    },
    {
      type: "select",
      label: "素材格式",
      labelI18n: "",
      prop: "imageFormat",
      options: [
        { label: "png", value: "png" },
        { label: "jpg", value: "jpg" },
        { label: "jpeg", value: "jpeg" },
        { label: "tif", value: "tif" },
      ],
      hide: () => ![2, 3].includes(imageType.value)
    },
    {
      type: "datePicker",
      label: "时间",
      labelI18n: "",
      prop: "",
      startProp: "startTime",
      endProp: "endTime",
      span: 8
    },
  ]
});

function searchFn(data) {
  searchForm = data;
  searchData.initialForm.factoryId = data.factoryId
  pagination.currentPage = 1;
  goBackList.value = []
  getList();
}

function reset() {
  if (imageType.value === 3) {
    searchData.initialForm.factoryId = searchData.searchItems.find(item => item.label === "工厂名称").options[0].targetTenantId
  }
  searchForm = {};
  pagination.currentPage = 1;
  goBackList.value = []
  getList();
}


const dialogVisible = ref(false);
function show(defaultSelected = null) {
  if (defaultSelected?.length) {
    selectIdList.value = defaultSelected.map((item: any) => item.id)
    selectList.value = defaultSelected
  } else {
    selectIdList.value = []
    selectList.value = []
  }
  dialogVisible.value = true;
  imageType.value = 1
  detailsData.value = null
  goBackList.value = []
  imageList.value = []
  treeData.value = []
  treeLoading.value = false
  imageListLoading.value = false
  pagination.currentPage = 1
  pagination.pageSize = 50
  getTree();
  getList();
}

const imageType = ref(1);
function handleClick({ props }) {
  refreshSearch.value = false;
  nextTick(async () => {
    searchForm = {}
    refreshSearch.value = true;
    detailsData.value = null
    goBackList.value = []
    imageList.value = []
    treeData.value = []
    treeLoading.value = false
    imageListLoading.value = false
    if (imageType.value === 3) {
      await getFactoryList()
    }
    getTree();
    getList();
  })
}

// 点击树节点
function handleNodeClick(value) {
  getList(value.id)
}


// 获取图片列表
const imageListLoading = ref(false);
const imageList = ref([]);
function getList(folderId = null) {
  return new Promise((resolve, reject) => {
    let data = {
      ...searchForm,
      pageIndex: pagination.currentPage,
      pageSize: pagination.pageSize,
      folderId: null,
    }
    let fn = null
    if (imageType.value === 1) {
      fn = page1
      data.folderId = folderId ?? -1
    } else if (imageType.value === 2) {
      fn = page2
      data.folderId = folderId ?? 0
    } else {
      fn = page3
      data.folderId = folderId ?? -1
      if (searchData.initialForm.factoryId) data.factoryId = searchData.initialForm.factoryId
    }
    imageListLoading.value = true
    fn(data).then(res => {
      pagination.total = res.total;
      let folders = res.records[0].folders.map((item: any) => {
        return {
          ...item,
          type: 1
        }
      })
      let images = res.records[0].images.map((item: any) => {
        return {
          ...item,
          type: 2
        }
      })
      imageList.value = [...folders, ...images]
    }).finally(() => {
      imageListLoading.value = false
      resolve(true)
    })
  })

}
// 获取文件夹树
const treeLoading = ref(false);
const treeData = ref([]);
async function getTree() {
  const fn = imageType.value == 1 ? tree1 : imageType.value == 2 ? tree2 : tree3;
  const factoryId = imageType.value === 3 ? searchData.initialForm.factoryId : null;

  treeLoading.value = true;
  try {
    const res: any = await fn(factoryId);
    treeData.value = res;
  } catch (error) {
    message('获取文件夹树失败', { type: 'error' });
  } finally {
    treeLoading.value = false;
  }
}

function handleSizeChange(val: number) {
  pagination.pageSize = val;
  getList();
}

function handleCurrentChange(val: number) {
  pagination.currentPage = val;
  getList();
}


const detailsData = ref(null)
const selectIdList = ref([]) //已选图片ID
const selectList = ref([]) //已选图片列表
// 选择图片
function imgClick(item: any) {
  detailsData.value = item
  const index = selectIdList.value.indexOf(item.id)
  if (index > -1) {
    selectIdList.value.splice(index, 1)
    selectList.value.splice(index, 1)
  } else {
    if (props.limit && selectIdList.value.length >= props.limit) {
      selectIdList.value.shift()
      selectList.value.shift()
    }
    selectIdList.value.push(item.id)
    selectList.value.push(item)
  }
}
// 文件夹点击
const goBackList = ref(null)
function folderClick(item: any) {
  goBackList.value.push({ parentId: item.parentId, folderName: item.folderName, id: item.id })
  getList(item.id)
}

// 返回上一级
async function goBack() {
  getList(goBackList.value[goBackList.value.length - 1].parentId)
  goBackList.value.pop()
}



function submit() {
  emits("confirm", selectList.value);
  dialogVisible.value = false;
}
function close() {
  emits("close");
}
// 获取工厂列表
function getFactoryList() {
  return new Promise((resolve, reject) => {
    let { tenantId } = JSON.parse(localStorage.getItem("userInfo"));
    getTenantBindFindByTenantId({ tenantId }).then((res: any) => {
      searchData.searchItems.find(item => item.label === "工厂名称").options = res
      if (res?.length) {
        searchData.initialForm.factoryId = res[0].targetTenantId
      }
      resolve(true)
    })
  })
}
defineExpose({ show });
</script>

<style lang="scss" scoped>
.mainBody {
  display: flex;

  .tree {
    width: 200px;
    border-right: 1px solid #ccc;
    padding-right: 10px;
  }

  .imgList {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    gap: 10px;

    .folder,
    .image {
      width: 100px;
      height: 100px;
      // border: 1px solid #ccc;
      cursor: pointer;
      padding: 5px;
      position: relative;

      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
      }

      .check {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 20px;
        height: 20px;
        background-color: #409eff;
        color: #fff;
        border-radius: 5px 0 0 0;
        text-align: center;
        line-height: 20px;

        .icon {
          margin-top: 4px;
          margin-left: 3px;
        }
      }
    }
  }
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .name {
    font-size: 12px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: 4px;
    text-align: center;
    word-break: break-all;
    word-wrap: break-word;
    line-height: 16px;
  }
}

.activate {
  border: 3px solid #409eff;
  border-radius: 5px;
}

.details {
  width: 200px;
  border-left: 1px solid #ccc;
  padding: 0 10px;

  .title {
    font-size: 12px;
    font-weight: 700;
  }

  .detailsText {
    .name {
      word-break: break-all;
      overflow-wrap: break-word;
      font-weight: 700;
    }
  }
}

.btnBox {
  width: 100%;
  margin-bottom: 10px;

  :deep(.el-divider.el-divider--vertical) {
    border-color: #606266;
  }
}
</style>