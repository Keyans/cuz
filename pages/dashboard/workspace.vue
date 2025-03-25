<template>
  <div>
    <div class="mb-6 md:mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-primary mb-1">Design Workspace</h1>
          <p class="text-gray-600 text-sm md:text-base">Create and customize your product designs</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <button class="btn-primary text-sm md:text-base w-full sm:w-auto" @click="saveDesign">
            <span class="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save Design
            </span>
          </button>
        </div>
      </div>

      <!-- Workspace tabs -->
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px space-x-6 overflow-x-auto scrollbar-hidden" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="py-3 px-1 whitespace-nowrap text-sm font-medium border-b-2 transition-colors"
            :class="activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Workspace content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      <!-- Design canvas area -->
      <div class="lg:col-span-2 bg-white rounded-lg shadow p-4 md:p-6">
        <div
          class="aspect-square w-full bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden mb-4"
          ref="canvasArea"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <!-- Product preview -->
          <img
            :src="selectedProduct.image"
            alt="Product template"
            class="w-full h-full object-contain"
          />

          <!-- Design overlay -->
          <div
            v-if="designImage"
            class="absolute inset-0 flex items-center justify-center"
          >
            <div
              class="w-1/2 h-1/2 relative cursor-move"
              @mousedown="startDrag"
              @touchstart.prevent="startTouchDrag"
              :style="{
                transform: `translate(${designPosition.x}px, ${designPosition.y}px) scale(${designScale}) rotate(${designRotation}deg)`,
                transformOrigin: 'center center'
              }"
            >
              <img
                :src="designImage"
                alt="Your design"
                class="w-full h-full object-contain"
              />

              <!-- Design control handles -->
              <div class="absolute -bottom-3 -right-3 w-6 h-6 bg-secondary rounded-full cursor-se-resize flex items-center justify-center"
                @mousedown.stop="startResize"
                @touchstart.prevent.stop="startTouchResize"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>

              <!-- Rotation handle -->
              <div class="absolute -top-3 -right-3 w-6 h-6 bg-purple rounded-full cursor-pointer flex items-center justify-center"
                @mousedown.stop="startRotate"
                @touchstart.prevent.stop="startTouchRotate"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Design controls -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Scale</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.01"
              v-model="designScale"
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Rotation</label>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              v-model="designRotation"
              class="w-full"
            />
          </div>

          <div class="sm:col-span-2 flex flex-wrap gap-2">
            <button
              class="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-xs rounded flex items-center"
              @click="resetDesign"
            >
              Reset
            </button>
            <button
              class="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-xs rounded flex items-center"
              @click="removeDesign"
            >
              Remove
            </button>
            <button
              class="px-2 py-1 bg-accent text-white hover:bg-opacity-90 text-xs rounded flex items-center"
              @click="centerDesign"
            >
              Center
            </button>
          </div>
        </div>
      </div>

      <!-- Design options panel -->
      <div>
        <!-- Product selection -->
        <div class="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
          <h3 class="text-sm md:text-base font-bold text-primary mb-3">Choose Product</h3>
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="product in products"
              :key="product.id"
              @click="selectProduct(product)"
              class="cursor-pointer border rounded-lg p-2 transition-all"
              :class="selectedProduct.id === product.id ? 'border-primary bg-secondary bg-opacity-20' : 'border-gray-200 hover:border-gray-300'"
            >
              <img :src="product.image" :alt="product.name" class="w-full h-20 object-contain mb-2" />
              <p class="text-xs text-center font-medium">{{ product.name }}</p>
            </div>
          </div>
        </div>

        <!-- Upload design -->
        <div class="bg-white rounded-lg shadow p-4 md:p-6">
          <h3 class="text-sm md:text-base font-bold text-primary mb-3">Upload Design</h3>
          <label class="block w-full cursor-pointer">
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p class="mt-2 text-xs sm:text-sm text-gray-600">
                Drag and drop an image or <span class="text-primary font-medium">browse</span>
              </p>
              <p class="mt-1 text-xs text-gray-500">PNG, JPG, SVG (max 5MB)</p>
              <input
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleFileUpload"
              />
            </div>
          </label>

          <!-- Design templates -->
          <div class="mt-4">
            <h4 class="text-xs font-medium text-gray-700 mb-2">Or choose from templates:</h4>
            <div class="grid grid-cols-3 gap-2">
              <div
                v-for="(template, index) in designTemplates"
                :key="index"
                @click="applyTemplate(template)"
                class="cursor-pointer border rounded-lg p-1 hover:border-primary"
              >
                <img :src="template" :alt="'Template ' + (index + 1)" class="w-full h-12 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success toast notification -->
    <div
      v-if="showToast"
      class="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md transition-all"
      style="max-width: 300px; z-index: 50;"
    >
      <div class="flex items-center">
        <div class="py-1">
          <svg class="h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p class="font-bold">Design saved!</p>
          <p class="text-sm">Your design has been saved successfully.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Set the dashboard layout
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

// Tabs for workspace
const tabs = [
  { id: 'design', name: 'Design' },
  { id: 'mockup', name: 'Mockup' },
  { id: 'colors', name: 'Colors & Variants' },
  { id: 'settings', name: 'Product Settings' }
]
const activeTab = ref('design')

// Available products
const products = ref([
  { id: 1, name: 'T-Shirt', image: '/assets/products/tshirt.png' },
  { id: 2, name: 'Hoodie', image: '/assets/products/hoodie.png' },
  { id: 3, name: 'Mug', image: '/assets/products/mug.png' },
  { id: 4, name: 'Tote Bag', image: '/assets/products/bags.png' }
])
const selectedProduct = ref(products.value[0])

// Design state
const designImage = ref<string | null>(null)
const designPosition = ref({ x: 0, y: 0 })
const designStartPosition = ref({ x: 0, y: 0 })
const designScale = ref(1)
const designRotation = ref(0)
const isDragging = ref(false)
const isResizing = ref(false)
const isRotating = ref(false)
const dragStartPos = ref({ x: 0, y: 0 })
const canvasArea = ref<HTMLElement | null>(null)

// Design templates
const designTemplates = ref([
  '/assets/templates/template1.png',
  '/assets/templates/template2.png',
  '/assets/templates/template3.png',
])

// Toast notification
const showToast = ref(false)

// Product selection
const selectProduct = (product: any) => {
  selectedProduct.value = product
}

// File upload handling
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        designImage.value = e.target.result
        resetDesignPosition()
      }
    }

    reader.readAsDataURL(file)
  }
}

// Apply template
const applyTemplate = (templateUrl: string) => {
  designImage.value = templateUrl
  resetDesignPosition()
}

// Drag handling
const startDrag = (event: MouseEvent) => {
  if (isResizing.value || isRotating.value) return

  isDragging.value = true
  dragStartPos.value = {
    x: event.clientX,
    y: event.clientY
  }
  designStartPosition.value = { ...designPosition.value }

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

const onDrag = (event: MouseEvent) => {
  if (!isDragging.value) return

  const dx = event.clientX - dragStartPos.value.x
  const dy = event.clientY - dragStartPos.value.y

  designPosition.value = {
    x: designStartPosition.value.x + dx,
    y: designStartPosition.value.y + dy
  }
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

// Touch drag handling
const startTouchDrag = (event: TouchEvent) => {
  if (isResizing.value || isRotating.value) return

  if (event.touches.length === 1) {
    isDragging.value = true
    const touch = event.touches[0]
    dragStartPos.value = {
      x: touch.clientX,
      y: touch.clientY
    }
    designStartPosition.value = { ...designPosition.value }
  }
}

const handleTouchStart = (event: TouchEvent) => {
  // Handle general touch events on the canvas
}

const handleTouchMove = (event: TouchEvent) => {
  if (isDragging.value && event.touches.length === 1) {
    const touch = event.touches[0]
    const dx = touch.clientX - dragStartPos.value.x
    const dy = touch.clientY - dragStartPos.value.y

    designPosition.value = {
      x: designStartPosition.value.x + dx,
      y: designStartPosition.value.y + dy
    }
  } else if (isResizing.value && event.touches.length === 1) {
    const touch = event.touches[0]
    const dx = touch.clientX - dragStartPos.value.x
    const dy = touch.clientY - dragStartPos.value.y
    const scaleFactor = 0.01

    const newScale = designScale.value + (dx + dy) * scaleFactor
    designScale.value = Math.max(0.5, Math.min(2, newScale))

    dragStartPos.value = {
      x: touch.clientX,
      y: touch.clientY
    }
  } else if (isRotating.value && event.touches.length === 1) {
    onTouchRotate(event)
  }
}

const handleTouchEnd = (event: TouchEvent) => {
  isDragging.value = false
  isResizing.value = false
  isRotating.value = false
}

// Resize handling
const startResize = (event: MouseEvent) => {
  event.preventDefault()
  isResizing.value = true
  dragStartPos.value = {
    x: event.clientX,
    y: event.clientY
  }

  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
}

const onResize = (event: MouseEvent) => {
  if (!isResizing.value) return

  const dx = event.clientX - dragStartPos.value.x
  const dy = event.clientY - dragStartPos.value.y
  const scaleFactor = 0.01

  const newScale = designScale.value + (dx + dy) * scaleFactor
  designScale.value = Math.max(0.5, Math.min(2, newScale))

  dragStartPos.value = {
    x: event.clientX,
    y: event.clientY
  }
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
}

// Touch resize handling
const startTouchResize = (event: TouchEvent) => {
  event.preventDefault()
  if (event.touches.length === 1) {
    isResizing.value = true
    const touch = event.touches[0]
    dragStartPos.value = {
      x: touch.clientX,
      y: touch.clientY
    }
  }
}

// Rotation handling
const startRotate = (event: MouseEvent) => {
  event.preventDefault()
  isRotating.value = true
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const angleStart = Math.atan2(
    event.clientY - centerY,
    event.clientX - centerX
  ) * (180 / Math.PI)

  const startRotation = designRotation.value

  const onMouseRotate = (e: MouseEvent) => {
    const angleCurrent = Math.atan2(
      e.clientY - centerY,
      e.clientX - centerX
    ) * (180 / Math.PI)

    const angleChange = angleCurrent - angleStart
    designRotation.value = (startRotation + angleChange + 360) % 360
  }

  const stopRotate = () => {
    isRotating.value = false
    document.removeEventListener('mousemove', onMouseRotate)
    document.removeEventListener('mouseup', stopRotate)
  }

  document.addEventListener('mousemove', onMouseRotate)
  document.addEventListener('mouseup', stopRotate)
}

// Touch rotation handling
const startTouchRotate = (event: TouchEvent) => {
  event.preventDefault()
  if (event.touches.length === 1) {
    isRotating.value = true
    const touch = event.touches[0]
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const angleStart = Math.atan2(
      touch.clientY - centerY,
      touch.clientX - centerX
    ) * (180 / Math.PI)

    dragStartPos.value = {
      x: touch.clientX,
      y: touch.clientY
    }
    const startRotation = designRotation.value

    // Store this data for the touch move handler
    const rotateData = {
      centerX,
      centerY,
      angleStart,
      startRotation
    }

    // Attach to the component instance
    Object.assign(canvasArea.value || {}, { rotateData })
  }
}

const onTouchRotate = (event: TouchEvent) => {
  if (!isRotating.value || !canvasArea.value?.rotateData) return

  const touch = event.touches[0]
  const { centerX, centerY, angleStart, startRotation } = canvasArea.value.rotateData

  const angleCurrent = Math.atan2(
    touch.clientY - centerY,
    touch.clientX - centerX
  ) * (180 / Math.PI)

  const angleChange = angleCurrent - angleStart
  designRotation.value = (startRotation + angleChange + 360) % 360
}

// Center design
const centerDesign = () => {
  designPosition.value = { x: 0, y: 0 }
}

// Reset design position and scale
const resetDesignPosition = () => {
  designPosition.value = { x: 0, y: 0 }
  designScale.value = 1
  designRotation.value = 0
}

// Reset all design parameters
const resetDesign = () => {
  resetDesignPosition()
}

// Remove design
const removeDesign = () => {
  designImage.value = null
  resetDesignPosition()
}

// Save design
const saveDesign = () => {
  // In a real app, this would save the design to the backend
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Create placeholder template images for design templates
onMounted(() => {
  // This would normally fetch templates from the server
  designTemplates.value = [
    '/assets/products/tshirt-2.png',
    '/assets/products/hoodie-2.png',
    '/assets/products/bags.png'
  ]
})

// Clean up event listeners
onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
})
</script>

<style scoped>
/* Optional: Add styles specific to the workspace page */
input[type="range"] {
  -webkit-appearance: none;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  background: #afe468;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: #afe468;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

/* Hide scrollbar for tab navigation while keeping functionality */
.scrollbar-hidden {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;  /* Chrome, Safari, Opera */
}
</style>
