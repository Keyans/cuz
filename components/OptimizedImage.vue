<template>
  <div :class="wrapperClass">
    <nuxt-img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :placeholder="placeholder"
      :quality="quality"
      :loading="loading"
      :sizes="sizes"
      :class="imgClass"
      format="webp"
      :provider="provider"
      :preset="preset"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [Number, String],
    default: undefined
  },
  height: {
    type: [Number, String],
    default: undefined
  },
  placeholder: {
    type: String,
    default: undefined
  },
  quality: {
    type: Number,
    default: 80
  },
  loading: {
    type: String,
    default: 'lazy'
  },
  sizes: {
    type: String,
    default: '(max-width: 768px) 100vw, 50vw'
  },
  imgClass: {
    type: String,
    default: ''
  },
  wrapperClass: {
    type: String,
    default: ''
  },
  provider: {
    type: String,
    default: undefined
  },
  preset: {
    type: String,
    default: undefined
  }
})
</script>
