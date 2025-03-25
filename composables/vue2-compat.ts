// Utility to help with Vue 2 compatibility
// This allows Vue 2 style API usage in Vue 3 context

import {
  reactive,
  computed,
  onMounted,
  onUnmounted,
  watch
} from 'vue'

// Helper function to convert Vue 3 composition API to something similar to Vue 2 options API
export function createVue2CompatComponent(options: any) {
  // Handle data
  const dataFn = options.data || (() => ({}))
  const data = reactive(dataFn())

  // Handle computed properties
  const computedProps: Record<string, any> = {}
  if (options.computed) {
    Object.entries(options.computed).forEach(([key, fn]) => {
      computedProps[key] = computed(() => {
        // @ts-ignore
        return fn.call({ ...data, ...computedProps })
      })
    })
  }

  // Handle lifecycle hooks
  onMounted(() => {
    options.mounted?.call({ ...data, ...computedProps })
  })

  onUnmounted(() => {
    options.beforeDestroy?.call({ ...data, ...computedProps })
  })

  // Handle methods
  const methods: Record<string, any> = {}
  if (options.methods) {
    Object.entries(options.methods).forEach(([key, fn]) => {
      // @ts-ignore
      methods[key] = (...args: any[]) => fn.call({ ...data, ...computedProps, ...methods }, ...args)
    })
  }

  // Handle watchers
  if (options.watch) {
    Object.entries(options.watch).forEach(([key, handler]) => {
      watch(
        () => data[key as keyof typeof data],
        (newVal, oldVal) => {
          // @ts-ignore
          (typeof handler === 'function' ? handler : handler.handler).call(
            { ...data, ...computedProps, ...methods },
            newVal,
            oldVal
          )
        },
        typeof handler === 'object' ? handler : undefined
      )
    })
  }

  return {
    ...data,
    ...computedProps,
    ...methods,
  }
}

// Example usage:
// import { createVue2CompatComponent } from '~/composables/vue2-compat'
//
// const component = createVue2CompatComponent({
//   data() {
//     return {
//       count: 0
//     }
//   },
//   computed: {
//     doubleCount() {
//       return this.count * 2
//     }
//   },
//   methods: {
//     increment() {
//       this.count++
//     }
//   },
//   mounted() {
//     console.log('Component mounted')
//   }
// })
