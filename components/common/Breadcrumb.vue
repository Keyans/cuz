<template>
  <nav class="mb-4 flex items-center text-sm text-gray-500">
    <template v-for="(item, index) in breadcrumbItems" :key="index">
      <router-link
        v-if="item.path"
        :to="item.path"
        class="hover:text-primary"
      >{{ item.title }}</router-link>
      <span
        v-else
        class="text-gray-900"
      >{{ item.title }}</span>
      <span
        v-if="index < breadcrumbItems.length - 1"
        class="mx-2"
      >/</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  title: string
  path?: string
}

interface Props {
  items?: BreadcrumbItem[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => []
})

const route = useRoute()
const meta = computed(() => route.meta)

// 根据路由元数据自动生成面包屑
const autoBreadcrumbs = computed(() => {
  if (!meta.value.breadcrumb) return []

  const breadcrumb = meta.value.breadcrumb as BreadcrumbItem[]
  return breadcrumb
})

// 合并props传入的items和自动生成的面包屑
const breadcrumbItems = computed(() => {
  if (props.items && props.items.length > 0) {
    return props.items
  }
  return autoBreadcrumbs.value
})
</script>