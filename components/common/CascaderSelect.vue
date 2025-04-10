<template>
  <div class="relative" ref="selectRef">
    <!-- 选择器输入框 -->
    <div
      @click="isOpen = !isOpen"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <span :class="{ 'text-gray-400': !selectedProvince }">
        {{ displayValue }}
      </span>
    </div>

    <!-- 下拉选项 -->
    <div v-if="isOpen" class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
      <!-- 省份选择 -->
      <div class="flex">
        <div class="w-1/3 border-r border-gray-200 max-h-60 overflow-y-auto">
          <div
            v-for="province in provinces"
            :key="province.code"
            @click="handleSelect(province, 'province')"
            class="px-4 py-2 cursor-pointer hover:bg-gray-100"
            :class="{ 'bg-blue-50 text-blue-600': selectedProvince?.code === province.code }"
          >
            {{ province.name }}
          </div>
        </div>

        <!-- 城市选择 -->
        <div v-if="selectedProvince?.children?.length" class="w-1/3 border-r border-gray-200 max-h-60 overflow-y-auto">
          <div
            v-for="city in selectedProvince.children"
            :key="city.code"
            @click="handleSelect(city, 'city')"
            class="px-4 py-2 cursor-pointer hover:bg-gray-100"
            :class="{ 'bg-blue-50 text-blue-600': selectedCity?.code === city.code }"
          >
            {{ city.name }}
          </div>
        </div>

        <!-- 区县选择 -->
        <div v-if="selectedCity?.children?.length" class="w-1/3 max-h-60 overflow-y-auto">
          <div
            v-for="district in selectedCity.children"
            :key="district.code"
            @click="handleSelect(district, 'district')"
            class="px-4 py-2 cursor-pointer hover:bg-gray-100"
            :class="{ 'bg-blue-50 text-blue-600': selectedDistrict?.code === district.code }"
          >
            {{ district.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import chinaAreaData from 'china-area-data'
import worldCountries from 'world-countries'

interface Region {
  code: string
  name: string
  children?: Region[]
}

// 格式化世界国家数据
const formatWorldData = (): Region[] => {
  return worldCountries.map(country => ({
    code: country.cca3,
    name: country.name.common,
    children: country.capital ? [{
      code: `${country.cca3}-CAP`,
      name: country.capital[0],
      children: []
    }] : []
  }))
}

const props = defineProps({
  modelValue: {
    type: Object as () => {
      province: string
      city: string
      district: string
    },
    default: () => ({
      province: '',
      city: '',
      district: ''
    })
  },
  placeholder: {
    type: String,
    default: '请选择地区'
  },
  mode: {
    type: String,
    default: 'china' // 'china' 或 'world'
  }
})

const emit = defineEmits(['change'])

const selectRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const selectedProvince = ref<Region | null>(null)
const selectedCity = ref<Region | null>(null)
const selectedDistrict = ref<Region | null>(null)

// 转换中国地区数据格式
const formatChinaData = (data: any): Region[] => {
  return Object.keys(data['86']).map(provinceCode => ({
    code: provinceCode,
    name: data['86'][provinceCode],
    children: Object.keys(data[provinceCode] || {}).map(cityCode => ({
      code: cityCode,
      name: data[provinceCode][cityCode],
      children: data[cityCode] ? Object.keys(data[cityCode]).map(districtCode => ({
        code: districtCode,
        name: data[cityCode][districtCode]
      })) : []
    }))
  }))
}

// 根据模式获取地区数据
const provinces = computed(() => {
  return props.mode === 'china' ? formatChinaData(chinaAreaData) : formatWorldData()
})

// 初始化选中值
const initSelectedValues = () => {
  if (props.modelValue) {
    const { province, city, district } = props.modelValue
    
    // 查找并设置省份
    const foundProvince = provinces.value.find(p => p.name === province)
    if (foundProvince) {
      selectedProvince.value = foundProvince
      
      // 查找并设置城市
      const foundCity = foundProvince.children?.find(c => c.name === city)
      if (foundCity) {
        selectedCity.value = foundCity
        
        // 查找并设置区县
        const foundDistrict = foundCity.children?.find(d => d.name === district)
        if (foundDistrict) {
          selectedDistrict.value = foundDistrict
        }
      }
    }
  }
}

// 监听 modelValue 变化
watch(() => props.modelValue, () => {
  initSelectedValues()
}, { immediate: true })

// 监听 mode 变化
watch(() => props.mode, () => {
  // 切换模式时重新初始化选中值
  initSelectedValues()
})

// 处理选择变化
const handleSelect = (region: Region, level: 'province' | 'city' | 'district') => {
  if (level === 'province') {
    selectedProvince.value = region
    selectedCity.value = null
    selectedDistrict.value = null
  } else if (level === 'city') {
    selectedCity.value = region
    selectedDistrict.value = null
  } else {
    selectedDistrict.value = region
  }

  // 发送选择变化事件
  emit('change', {
    province: selectedProvince.value?.name || '',
    city: selectedCity.value?.name || '',
    district: selectedDistrict.value?.name || ''
  })

  // 如果选择完成，关闭下拉框
  if (
    (level === 'district') || 
    (level === 'city' && !region.children?.length) ||
    (level === 'province' && !region.children?.length)
  ) {
    isOpen.value = false
  }
}

// 显示选中的值
const displayValue = computed(() => {
  if (selectedProvince.value) {
    const parts = [selectedProvince.value.name]
    if (selectedCity.value) {
      parts.push(selectedCity.value.name)
      if (selectedDistrict.value) {
        parts.push(selectedDistrict.value.name)
      }
    }
    return parts.join(' / ')
  }
  return props.placeholder
})

// 点击外部关闭下拉面板
onClickOutside(selectRef, () => {
  isOpen.value = false
})
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #E5E7EB transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 3px;
}
</style>