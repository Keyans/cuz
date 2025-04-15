<template>
  <div class="container mx-auto py-6">
    <!-- 面包屑导航 -->
    <div class="flex items-center mb-6 text-sm">
      <span class="text-gray-600">产品库</span>
      <span class="mx-2 text-gray-400">/</span>
      <span class="text-gray-600 cursor-pointer" @click="$router.push('/dashboard/publish/templates')">刊登模板</span>
      <span class="mx-2 text-gray-400">/</span>
      <span class="text-gray-900 font-medium">{{ isEdit ? '编辑模板' : '创建模板' }}</span>
    </div>

    <!-- 表单部分 -->
    <div class="bg-white rounded-lg shadow mb-6">
      <div class="p-4 lg:p-6">
        <h2 class="text-lg font-medium mb-4">基本信息</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">模板名称：</label>
            <input 
              v-model="formData.name" 
              type="text" 
              placeholder="请输入" 
              class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">所属店铺：</label>
            <div class="relative">
              <el-select 
                v-model="formData.stores" 
                multiple
                collapse-tags
                collapse-tags-tooltip
                placeholder="请选择店铺"
                class="w-full"
              >
                <el-option value="TEMU-PhoneCase" label="TEMU-PhoneCase" />
                <el-option value="TikTok-CaseShop" label="TikTok-CaseShop" />
                <el-option value="Amazon-Case" label="Amazon-Case" />
              </el-select>
            </div>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">模板语言：</label>
            <div class="relative">
              <el-select 
                v-model="formData.languages" 
                multiple
                collapse-tags
                collapse-tags-tooltip
                placeholder="请选择语言"
                class="w-full"
              >
                <el-option value="zh" label="中文" />
                <el-option value="en" label="英语" />
                <el-option value="es" label="西班牙语" />
                <el-option value="fr" label="法语" />
              </el-select>
            </div>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">模板排序：</label>
            <input 
              v-model="formData.sort" 
              type="number" 
              placeholder="请输入" 
              class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">商品标题：</label>
            <div class="relative">
              <el-input 
                v-model="formData.title" 
                placeholder="请输入商品标题" 
                class="w-full pr-28"
              />
              <el-button 
                class="absolute right-0 top-0 h-full z-10 px-3" 
                @click="openVariableDialog"
                type="primary" 
                plain
              >
                插入变量
              </el-button>
            </div>
          </div>
          <div class="flex flex-col md:col-span-2">
            <label class="text-sm text-gray-600 mb-1">商品描述：</label>
            <div class="relative">
              <el-input 
                v-model="formData.description" 
                type="textarea" 
                :rows="4" 
                placeholder="请输入商品描述"
                class="w-full" 
              />
              <el-button 
                class="absolute right-2 top-2 z-10" 
                @click="openVariableDialogForDesc"
                type="primary" 
                plain
                size="small"
              >
                插入变量
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow mb-6">
      <div class="p-4 lg:p-6">
        <h2 class="text-lg font-medium mb-4">类目信息</h2>
        <div class="grid grid-cols-1 md:grid-cols-1 gap-4 lg:gap-6">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 mb-1">商品类目：</label>
            <div class="relative">
              <select 
                v-model="formData.category" 
                class="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">请选择</option>
                <option value="3C数码配件>手机配件>其他">3C数码配件>手机配件>其他</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="mt-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="p-4 border border-gray-200 rounded">
                <div class="flex items-center justify-between mb-2">
                  <label class="text-sm font-medium text-gray-700">主要材质 <span class="text-red-500">*</span></label>
                </div>
                <div class="relative">
                  <select 
                    v-model="formData.attributes.material" 
                    class="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">请选择</option>
                    <option value="塑料">塑料</option>
                    <option value="硅胶">硅胶</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="p-4 border border-gray-200 rounded">
                <div class="flex items-center justify-between mb-2">
                  <label class="text-sm font-medium text-gray-700">功能特点</label>
                </div>
                <el-tag
                  v-for="tag in formData.attributes.features"
                  :key="tag"
                  class="mx-1 mb-1"
                  closable
                  @close="handleFeatureClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  v-if="featureInputVisible"
                  ref="featureInputRef"
                  v-model="featureInputValue"
                  class="mt-1 w-24"
                  size="small"
                  @keyup.enter="handleFeatureConfirm"
                  @blur="handleFeatureConfirm"
                />
                <el-button v-else class="mt-1 button-new-tag" size="small" @click="showFeatureInput">
                  + 添加
                </el-button>
              </div>

              <div class="p-4 border border-gray-200 rounded">
                <div class="flex items-center justify-between mb-2">
                  <label class="text-sm font-medium text-gray-700">流行元素</label>
                </div>
                <div class="relative">
                  <select 
                    v-model="formData.attributes.trend" 
                    class="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">请选择</option>
                    <option value="简约">简约</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div class="p-4 border border-gray-200 rounded">
                <div class="flex items-center justify-between mb-2">
                  <label class="text-sm font-medium text-gray-700">品牌名</label>
                </div>
                <div class="relative">
                  <select 
                    v-model="formData.attributes.brand" 
                    class="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">请选择</option>
                    <option value="其他">其他</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="p-4 border border-gray-200 rounded">
                <div class="flex items-center justify-between mb-2">
                  <label class="text-sm font-medium text-gray-700">美体工艺</label>
                </div>
                <el-tag
                  v-for="tag in formData.attributes.process"
                  :key="tag"
                  class="mx-1 mb-1"
                  closable
                  @close="handleProcessClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  v-if="processInputVisible"
                  ref="processInputRef"
                  v-model="processInputValue"
                  class="mt-1 w-24"
                  size="small"
                  @keyup.enter="handleProcessConfirm"
                  @blur="handleProcessConfirm"
                />
                <el-button v-else class="mt-1 button-new-tag" size="small" @click="showProcessInput">
                  + 添加
                </el-button>
              </div>

              <div class="p-4 border border-gray-200 rounded">
                <div class="flex items-center justify-between mb-2">
                  <label class="text-sm font-medium text-gray-700">印花工艺</label>
                </div>
                <el-tag
                  v-for="tag in formData.attributes.printing"
                  :key="tag"
                  class="mx-1 mb-1"
                  closable
                  @close="handlePrintingClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  v-if="printingInputVisible"
                  ref="printingInputRef"
                  v-model="printingInputValue"
                  class="mt-1 w-24"
                  size="small"
                  @keyup.enter="handlePrintingConfirm"
                  @blur="handlePrintingConfirm"
                />
                <el-button v-else class="mt-1 button-new-tag" size="small" @click="showPrintingInput">
                  + 添加
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow mb-6">
      <div class="p-4 lg:p-6">
        <h2 class="text-lg font-medium mb-4">商品信息</h2>
        
        <!-- 主图上传 -->
        <div class="mb-6">
          <label class="block text-sm text-gray-700 mb-2">主图：</label>
          <div class="flex items-center text-xs text-gray-500 mb-2">
            <span>取代换背景可保留尺寸，最宽比最高3:4且大于~1340px，宽>1785px，图片大小小于 2M 内，最多上传10张</span>
          </div>
          <div class="flex flex-wrap gap-4">
            <div 
              v-for="img in formData.images.main" 
              :key="img.id" 
              class="w-24 h-24 border rounded flex items-center justify-center bg-gray-50 relative"
            >
              <template v-if="img.uploading">
                <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                  <div class="w-16 h-16 flex items-center justify-center">
                    <svg class="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div class="h-full bg-blue-600" :style="{ width: img.progress + '%' }"></div>
                  </div>
                </div>
              </template>
              <img :src="img.url" class="w-20 h-20 object-cover" />
              <div class="absolute top-0 right-0 flex">
                <button 
                  @click="replaceImage('main', img.id)"
                  class="bg-black bg-opacity-60 text-white w-5 h-5 flex items-center justify-center rounded-full cursor-pointer m-1"
                  title="替换"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </button>
                <button 
                  @click="deleteImage('main', img.id)"
                  class="bg-black bg-opacity-60 text-white w-5 h-5 flex items-center justify-center rounded-full cursor-pointer m-1"
                  title="删除"
                >
                  ×
                </button>
              </div>
              <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs py-1 text-center">{{ img.name }}</div>
            </div>
            <div 
              v-if="formData.images.main.length < 10"
              @click="triggerFileSelect('main')" 
              class="w-24 h-24 border border-dashed rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
            >
              <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span class="text-xs text-gray-500 mt-1">添加图片</span>
              <input
                ref="mainImageInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="(e: Event) => handleFileSelect(e, 'main')"
              />
            </div>
          </div>
        </div>
        
        <!-- 详情图上传 -->
        <div class="mb-6">
          <label class="block text-sm text-gray-700 mb-2">详情图：</label>
          <div class="flex items-center text-xs text-gray-500 mb-2">
            <span>取代换背景可保留尺寸，图片宽高比例1/2.5 x 2，图片大小小于 2M 内，最多上传20张</span>
          </div>
          <div class="flex flex-wrap gap-4">
            <div 
              v-for="img in formData.images.detail" 
              :key="img.id" 
              class="w-24 h-24 border rounded flex items-center justify-center bg-gray-50 relative"
            >
              <template v-if="img.uploading">
                <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                  <div class="w-16 h-16 flex items-center justify-center">
                    <svg class="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div class="h-full bg-blue-600" :style="{ width: img.progress + '%' }"></div>
                  </div>
                </div>
              </template>
              <img :src="img.url" class="w-20 h-20 object-cover" />
              <div class="absolute top-0 right-0 flex">
                <button 
                  @click="replaceImage('detail', img.id)"
                  class="bg-black bg-opacity-60 text-white w-5 h-5 flex items-center justify-center rounded-full cursor-pointer m-1"
                  title="替换"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </button>
                <button 
                  @click="deleteImage('detail', img.id)"
                  class="bg-black bg-opacity-60 text-white w-5 h-5 flex items-center justify-center rounded-full cursor-pointer m-1"
                  title="删除"
                >
                  ×
                </button>
              </div>
              <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs py-1 text-center">{{ img.name }}</div>
            </div>
            <div 
              v-if="formData.images.detail.length < 20"
              @click="triggerFileSelect('detail')" 
              class="w-24 h-24 border border-dashed rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
            >
              <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span class="text-xs text-gray-500 mt-1">添加图片</span>
              <input
                ref="detailImageInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="(e: Event) => handleFileSelect(e, 'detail')"
              />
            </div>
          </div>
        </div>
        
        <!-- 素材图上传 -->
        <div class="mb-6">
          <label class="block text-sm text-gray-700 mb-2">素材图：</label>
          <div class="flex items-center text-xs text-gray-500 mb-2">
            <span>素材最宽高比例1:1且高宽大于800px，图片大小小于 2M 内，最多上传1张</span>
          </div>
          <div class="flex flex-wrap gap-4">
            <div 
              v-for="img in formData.images.material" 
              :key="img.id" 
              class="w-24 h-24 border rounded flex items-center justify-center bg-gray-50 relative"
            >
              <template v-if="img.uploading">
                <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                  <div class="w-16 h-16 flex items-center justify-center">
                    <svg class="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div class="h-full bg-blue-600" :style="{ width: img.progress + '%' }"></div>
                  </div>
                </div>
              </template>
              <img :src="img.url" class="w-20 h-20 object-cover" />
              <div class="absolute top-0 right-0 flex">
                <button 
                  @click="replaceImage('material', img.id)"
                  class="bg-black bg-opacity-60 text-white w-5 h-5 flex items-center justify-center rounded-full cursor-pointer m-1"
                  title="替换"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </button>
                <button 
                  @click="deleteImage('material', img.id)"
                  class="bg-black bg-opacity-60 text-white w-5 h-5 flex items-center justify-center rounded-full cursor-pointer m-1"
                  title="删除"
                >
                  ×
                </button>
              </div>
              <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs py-1 text-center">{{ img.name }}</div>
            </div>
            <div 
              v-if="formData.images.material.length < 1"
              @click="triggerFileSelect('material')" 
              class="w-24 h-24 border border-dashed rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
            >
              <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span class="text-xs text-gray-500 mt-1">添加图片</span>
              <input
                ref="materialImageInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="(e: Event) => handleFileSelect(e, 'material')"
              />
            </div>
          </div>
        </div>
        
        <!-- 规格信息 -->
        <div class="mb-6">
          <label class="block text-sm text-gray-700 mb-4">规格信息：</label>
          <div class="border rounded overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">颜色</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">尺寸</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU图</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">利润</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">建议零售价</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="border border-gray-300 rounded px-3 py-1">高级白色塑料</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="border border-gray-300 rounded px-3 py-1">大号</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="border border-gray-300 rounded px-3 py-1 bg-gray-100 text-center">SKU图</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center">
                      <input type="text" class="w-16 border border-gray-300 rounded px-2 py-1" placeholder="20" />
                      <span class="ml-1">%</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center">
                      <input type="text" class="w-16 border border-gray-300 rounded px-2 py-1" placeholder="20" />
                      <span class="ml-1">%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow mb-6">
      <div class="p-4 lg:p-6">
        <h2 class="text-lg font-medium mb-4">平台公共信息</h2>
        
        <!-- 经营站点 -->
        <div class="mb-6">
          <label class="block text-sm text-gray-700 mb-2">经营站点：</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label class="text-sm text-gray-600 mb-1">履单站点</label>
              <input type="text" class="border border-gray-300 rounded px-3 py-2" value="履单站点" readonly />
            </div>
            <div class="flex flex-col">
              <label class="text-sm text-gray-600 mb-1">卖家自发货地点</label>
              <input type="text" class="border border-gray-300 rounded px-3 py-2" value="卖家自发货地点" readonly />
            </div>
          </div>
        </div>
        
        <!-- 包装信息 -->
        <div class="mb-6">
          <label class="block text-sm text-gray-700 mb-2">包装信息：</label>
          <div class="p-4 border border-gray-200 rounded mb-4">
            <div class="flex items-center mb-4">
              <span class="text-sm font-medium">外包装图片：</span>
              <div class="flex space-x-4 ml-4">
                <div 
                  :class="['px-4 py-2 rounded text-sm cursor-pointer', formData.images.packaging.front ? 'bg-gray-100' : 'bg-white border border-gray-300']"
                  @click="triggerFileSelect('packaging-front')"
                >
                  正面图
                </div>
                <div class="bg-white border border-gray-300 px-4 py-2 rounded text-sm cursor-pointer">侧面图</div>
                <div class="bg-white border border-gray-300 px-4 py-2 rounded text-sm cursor-pointer">俯拍图</div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                v-if="formData.images.packaging.front"
                class="w-full h-32 border rounded relative overflow-hidden"
              >
                <template v-if="formData.images.packaging.front.uploading">
                  <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                    <div class="w-16 h-16 flex items-center justify-center">
                      <svg class="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                      <div class="h-full bg-blue-600" :style="{ width: formData.images.packaging.front.progress + '%' }"></div>
                    </div>
                  </div>
                </template>
                <img :src="formData.images.packaging.front.url" class="w-full h-full object-cover" />
                <div class="absolute top-0 right-0 flex">
                  <button 
                    @click="replaceImage('packaging-front', formData.images.packaging.front.id)"
                    class="bg-black bg-opacity-60 text-white w-6 h-6 flex items-center justify-center rounded-full cursor-pointer m-1"
                    title="替换"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  </button>
                  <button 
                    @click="deleteImage('packaging-front', formData.images.packaging.front.id)"
                    class="bg-black bg-opacity-60 text-white w-6 h-6 flex items-center justify-center rounded-full cursor-pointer m-1"
                    title="删除"
                  >
                    ×
                  </button>
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs py-1 text-center">正面图</div>
              </div>
              <div 
                v-else
                @click="triggerFileSelect('packaging-front')"
                class="w-full h-32 border border-dashed rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
              >
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span class="text-xs text-gray-500 mt-1">正面图</span>
                <input
                  ref="packagingFrontImageInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="(e: Event) => handleFileSelect(e, 'packaging-front')"
                />
              </div>
            </div>
          </div>
          
          <div class="p-4 border border-gray-200 rounded mb-4">
            <div class="flex items-center mb-4">
              <span class="text-sm font-medium">外包装类型：</span>
              <div class="flex ml-4">
                <label class="inline-flex items-center mr-4">
                  <input type="radio" class="form-radio" name="packagingType" value="hardbox" checked />
                  <span class="ml-2 text-sm">硬盒装</span>
                </label>
                <label class="inline-flex items-center mr-4">
                  <input type="radio" class="form-radio" name="packagingType" value="softpack" />
                  <span class="ml-2 text-sm">软包装</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="radio" class="form-radio" name="packagingType" value="other" />
                  <span class="ml-2 text-sm">其他不规则形状</span>
                </label>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div class="p-4 border border-gray-200 rounded">
                <p class="text-sm text-gray-700 mb-2">硬盒装：纸盒包装、塑料盒包装等硬质矩形包装</p>
                <p class="text-xs text-gray-500">如鞋盒、化妆品包装盒等，是立方体或长方体的硬包装</p>
              </div>
            </div>
          </div>
          
          <div class="p-4 border border-gray-200 rounded">
            <div class="flex items-center mb-4">
              <span class="text-sm font-medium">外包装形状：</span>
              <div class="flex ml-4">
                <label class="inline-flex items-center mr-4">
                  <input type="radio" class="form-radio" name="packagingShape" value="long" checked />
                  <span class="ml-2 text-sm">长方体</span>
                </label>
                <label class="inline-flex items-center mr-4">
                  <input type="radio" class="form-radio" name="packagingShape" value="cube" />
                  <span class="ml-2 text-sm">正方体</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="radio" class="form-radio" name="packagingShape" value="irregular" />
                  <span class="ml-2 text-sm">其他不规则形状</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="flex justify-center space-x-4 my-6">
      <ActionButton type="outline" text="取消" @click="cancel" class="w-full md:w-auto px-8" />
      <ActionButton type="primary" text="完成" @click="save" class="w-full md:w-auto px-8" />
    </div>

    <!-- 变量对话框 -->
    <VariableDialog 
      v-model:visible="variableDialogVisible"
      :initial-value="currentEditingText"
      @confirm="handleVariableConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ActionButton from '~/components/common/ActionButton.vue';
import type { InputInstance } from 'element-plus';
import VariableDialog from '~/components/common/VariableDialog.vue';
import { doGetTemplateDetail } from '~/apis/finance/publish'

// 创建接口类型
interface ImageItem {
  id: string;
  name: string;
  url: string;
  file: File | null;
  uploading: boolean;
  progress: number;
}

interface PackagingImages {
  front: ImageItem | null;
  side: ImageItem | null;
  top: ImageItem | null;
}

interface FormDataType {
  id: string;
  name: string;
  store: string;
  stores: string[];
  language: string;
  languages: string[];
  sort: string;
  title: string;
  description: string;
  category: string;
  attributes: {
    material: string;
    features: string[];
    trend: string;
    brand: string;
    process: string[];
    printing: string[];
  };
  images: {
    main: ImageItem[];
    detail: ImageItem[];
    material: ImageItem[];
    packaging: PackagingImages;
  };
  variants: any[];
  platform: {
    sites: {
      fulfillment: string;
      shipping: string;
    };
    packaging: {
      type: string;
      shape: string;
    };
  };
}

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
});

const route = useRoute();
const router = useRouter();
const isEdit = ref(false);
const templateId = ref('');

// 表单数据
const formData = reactive<FormDataType>({
  id: '',
  name: '',
  store: '',
  stores: [],
  language: '',
  languages: [],
  sort: '',
  title: '',
  description: '',
  category: '',
  attributes: {
    material: '',
    features: ['防摔', '防震'],
    trend: '',
    brand: '',
    process: ['哑光', '标准'],
    printing: ['激光', '丝网']
  },
  images: {
    main: [
      { id: 'main1', name: '主图1', url: 'https://via.placeholder.com/100', file: null, uploading: false, progress: 0 },
      { id: 'main2', name: '主图2', url: 'https://via.placeholder.com/100', file: null, uploading: false, progress: 0 }
    ],
    detail: [
      { id: 'detail1', name: '详情1', url: 'https://via.placeholder.com/100', file: null, uploading: false, progress: 0 },
      { id: 'detail4', name: '详情4', url: 'https://via.placeholder.com/100', file: null, uploading: false, progress: 0 }
    ],
    material: [
      { id: 'material1', name: '素材图', url: 'https://via.placeholder.com/100', file: null, uploading: false, progress: 0 }
    ],
    packaging: {
      front: null,
      side: null,
      top: null
    }
  },
  variants: [],
  platform: {
    sites: {
      fulfillment: '',
      shipping: ''
    },
    packaging: {
      type: 'hardbox',
      shape: 'long',
    }
  }
});

// 主图上传部分
const mainImageInput = ref<HTMLInputElement | null>(null);
const detailImageInput = ref<HTMLInputElement | null>(null);
const materialImageInput = ref<HTMLInputElement | null>(null);
const packagingFrontImageInput = ref<HTMLInputElement | null>(null);

// 标签输入相关
const featureInputVisible = ref(false);
const featureInputValue = ref('');
const featureInputRef = ref<InputInstance>();

const processInputVisible = ref(false);
const processInputValue = ref('');
const processInputRef = ref<InputInstance>();

const printingInputVisible = ref(false);
const printingInputValue = ref('');
const printingInputRef = ref<InputInstance>();

// 变量对话框相关
const variableDialogVisible = ref(false);
const currentEditingField = ref<'title' | 'description'>('title');
const currentEditingText = ref('');

// 触发文件选择
function triggerFileSelect(type: string) {
  switch (type) {
    case 'main':
      mainImageInput.value?.click();
      break;
    case 'detail':
      detailImageInput.value?.click();
      break;
    case 'material':
      materialImageInput.value?.click();
      break;
    case 'packaging-front':
      packagingFrontImageInput.value?.click();
      break;
  }
}

// 处理文件选择
const handleFileSelect = (event: Event, type: string) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;
  
  const file = input.files[0];
  
  // 检查文件类型和大小
  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件');
    return;
  }
  
  if (file.size > 2 * 1024 * 1024) { // 2MB
    alert('图片大小不能超过2MB');
    return;
  }
  
  // 创建图片对象
  const img: ImageItem = {
    id: `${type}-${Date.now()}`,
    name: type === 'main' ? `主图${formData.images.main.length + 1}` :
          type === 'detail' ? `详情${formData.images.detail.length + 1}` :
          type === 'material' ? '素材图' : '正面图',
    url: URL.createObjectURL(file),
    file: file,
    uploading: true,
    progress: 0
  };
  
  // 添加到相应数组
  if (type === 'main') {
    if (formData.images.main.length >= 10) {
      alert('主图最多上传10张');
      return;
    }
    formData.images.main.push(img);
  } else if (type === 'detail') {
    if (formData.images.detail.length >= 20) {
      alert('详情图最多上传20张');
      return;
    }
    formData.images.detail.push(img);
  } else if (type === 'material') {
    if (formData.images.material.length >= 1) {
      alert('素材图最多上传1张');
      return;
    }
    formData.images.material.push(img);
  } else if (type === 'packaging-front') {
    formData.images.packaging.front = img;
  }
  
  // 模拟上传过程
  simulateUpload(img);
  
  // 清空文件输入，以便可以再次选择同一文件
  input.value = '';
}

// 模拟上传过程
function simulateUpload(img: ImageItem) {
  const interval = setInterval(() => {
    img.progress += 10;
    if (img.progress >= 100) {
      clearInterval(interval);
      img.uploading = false;
      // 这里实际项目中应该是上传成功后的回调，获取到服务器返回的URL
      // img.url = response.url;
    }
  }, 300);
}

// 删除图片
const deleteImage = (type: string, id: string) => {
  if (type === 'main') {
    const index = formData.images.main.findIndex(img => img.id === id);
    if (index !== -1) {
      const img = formData.images.main[index];
      if (img.url && img.url.startsWith('blob:')) {
        URL.revokeObjectURL(img.url);
      }
      formData.images.main.splice(index, 1);
    }
  } else if (type === 'detail') {
    const index = formData.images.detail.findIndex(img => img.id === id);
    if (index !== -1) {
      const img = formData.images.detail[index];
      if (img.url && img.url.startsWith('blob:')) {
        URL.revokeObjectURL(img.url);
      }
      formData.images.detail.splice(index, 1);
    }
  } else if (type === 'material') {
    const index = formData.images.material.findIndex(img => img.id === id);
    if (index !== -1) {
      const img = formData.images.material[index];
      if (img.url && img.url.startsWith('blob:')) {
        URL.revokeObjectURL(img.url);
      }
      formData.images.material.splice(index, 1);
    }
  } else if (type === 'packaging-front') {
    if (formData.images.packaging.front) {
      if (formData.images.packaging.front.url.startsWith('blob:')) {
        URL.revokeObjectURL(formData.images.packaging.front.url);
      }
      formData.images.packaging.front = null;
    }
  }
}

// 替换图片
const replaceImage = (type: string, id: string) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  
  input.onchange = (event) => {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;
    
    const file = target.files[0];
    
    // 检查文件类型和大小
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) { // 2MB
      alert('图片大小不能超过2MB');
      return;
    }
    
    // 获取要替换的图片
    let imgToReplace: ImageItem | null = null;
    if (type === 'main') {
      imgToReplace = formData.images.main.find(img => img.id === id) || null;
    } else if (type === 'detail') {
      imgToReplace = formData.images.detail.find(img => img.id === id) || null;
    } else if (type === 'material') {
      imgToReplace = formData.images.material.find(img => img.id === id) || null;
    } else if (type === 'packaging-front') {
      imgToReplace = formData.images.packaging.front;
    }
    
    if (imgToReplace) {
      // 释放之前的URL
      if (imgToReplace.url && imgToReplace.url.startsWith('blob:')) {
        URL.revokeObjectURL(imgToReplace.url);
      }
      
      // 更新图片信息
      imgToReplace.url = URL.createObjectURL(file);
      imgToReplace.file = file;
      imgToReplace.uploading = true;
      imgToReplace.progress = 0;
      
      // 模拟上传
      simulateUpload(imgToReplace);
    }
  };
  
  input.click();
}

// 在组件销毁时清理blob URL
onUnmounted(() => {
  // 清理主图
  formData.images.main.forEach(img => {
    if (img.url && img.url.startsWith('blob:')) {
      URL.revokeObjectURL(img.url);
    }
  });
  
  // 清理详情图
  formData.images.detail.forEach(img => {
    if (img.url && img.url.startsWith('blob:')) {
      URL.revokeObjectURL(img.url);
    }
  });
  
  // 清理素材图
  formData.images.material.forEach(img => {
    if (img.url && img.url.startsWith('blob:')) {
      URL.revokeObjectURL(img.url);
    }
  });
  
  // 清理包装图
  if (formData.images.packaging.front && formData.images.packaging.front.url.startsWith('blob:')) {
    URL.revokeObjectURL(formData.images.packaging.front.url);
  }
});

// 初始化页面，判断是新建还是编辑
onMounted(async () => {
  if (route.query.id) {
    templateId.value = route.query.id as string;
    isEdit.value = true;
    // 获取模板数据
    await fetchTemplateData(templateId.value);
  }
});

// 模拟获取模板数据
async function fetchTemplateData(id: string) {
  try {
    // 这里应该是API调用获取数据
    console.log('获取模板数据', id);
    const { data1 } = await doGetTemplateDetail({id});
    console.log(data1);

    // 模拟数据
    const data = {
      id: id,
      name: 'T恤模板',
      store: 'TEMU-PhoneCase',
      stores: ['TEMU-PhoneCase', 'TikTok-CaseShop'],
      language: 'zh',
      languages: ['zh', 'en'],
      sort: '0',
      title: '高品质手机壳保护套',
      description: '优质材料制作，完美贴合手机，有效保护手机不受损伤。',
      category: '3C数码配件>手机配件>其他'
    };
    
    // 更新表单数据
    Object.assign(formData, data);
  } catch (error) {
    console.error('获取模板数据失败', error);
  }
}

// 保存模板
async function save() {
  try {
    // 在保存前把多选的第一个值赋给单选字段，保持兼容性
    if (formData.stores.length > 0) {
      formData.store = formData.stores[0];
    }
    if (formData.languages.length > 0) {
      formData.language = formData.languages[0];
    }
    
    if (isEdit.value) {
      // 更新模板
      console.log('更新模板', formData);
    } else {
      // 创建模板
      console.log('创建模板', formData);
    }
    
    // 保存成功后返回列表页
    router.push('/dashboard/publish/templates');
  } catch (error) {
    console.error('保存模板失败', error);
  }
}

// 取消
function cancel() {
  router.push('/dashboard/publish/templates');
}

// 功能特点标签方法
const handleFeatureClose = (tag: string) => {
  formData.attributes.features = formData.attributes.features.filter(item => item !== tag);
};

const showFeatureInput = () => {
  featureInputVisible.value = true;
  nextTick(() => {
    featureInputRef.value!.input!.focus();
  });
};

const handleFeatureConfirm = () => {
  if (featureInputValue.value) {
    if (!formData.attributes.features.includes(featureInputValue.value)) {
      formData.attributes.features.push(featureInputValue.value);
    }
  }
  featureInputVisible.value = false;
  featureInputValue.value = '';
};

// 美体工艺标签方法
const handleProcessClose = (tag: string) => {
  formData.attributes.process = formData.attributes.process.filter(item => item !== tag);
};

const showProcessInput = () => {
  processInputVisible.value = true;
  nextTick(() => {
    processInputRef.value!.input!.focus();
  });
};

const handleProcessConfirm = () => {
  if (processInputValue.value) {
    if (!formData.attributes.process.includes(processInputValue.value)) {
      formData.attributes.process.push(processInputValue.value);
    }
  }
  processInputVisible.value = false;
  processInputValue.value = '';
};

// 印花工艺标签方法
const handlePrintingClose = (tag: string) => {
  formData.attributes.printing = formData.attributes.printing.filter(item => item !== tag);
};

const showPrintingInput = () => {
  printingInputVisible.value = true;
  nextTick(() => {
    printingInputRef.value!.input!.focus();
  });
};

const handlePrintingConfirm = () => {
  if (printingInputValue.value) {
    if (!formData.attributes.printing.includes(printingInputValue.value)) {
      formData.attributes.printing.push(printingInputValue.value);
    }
  }
  printingInputVisible.value = false;
  printingInputValue.value = '';
};

// 打开变量对话框 - 商品标题
const openVariableDialog = () => {
  currentEditingField.value = 'title';
  currentEditingText.value = formData.title;
  variableDialogVisible.value = true;
};

// 打开变量对话框 - 商品描述
const openVariableDialogForDesc = () => {
  currentEditingField.value = 'description';
  currentEditingText.value = formData.description;
  variableDialogVisible.value = true;
};

// 处理变量对话框确认
const handleVariableConfirm = (value: string) => {
  if (currentEditingField.value === 'title') {
    formData.title = value;
  } else if (currentEditingField.value === 'description') {
    formData.description = value;
  }
};
</script>

<style>
.el-select {
  width: 100%;
}

.el-tag {
  margin-right: 4px;
  margin-bottom: 4px;
}

.button-new-tag {
  margin-left: 0;
  height: 32px;
  padding-top: 0;
  padding-bottom: 0;
}

/* 移动端样式优化 */
@media (max-width: 768px) {
  .el-select {
    width: 100%;
  }
  
  .container {
    padding-left: 12px;
    padding-right: 12px;
  }
  
  .el-input {
    width: 100%;
  }
  
  .el-tag {
    margin-top: 4px;
  }
}
</style> 