<template>
  <div class="message shadow-md" v-if="visible">
    <svg
      v-if="type === 'success'"
      t="1744105391349"
      class="icon"
      viewBox="0 0 1098 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1519"
      :width="size ?? 16"
      :height="size ?? 16"
    >
      <path
        d="M476.808045 0.000043C213.401753 0.106685-0.031993 213.68973 0 477.074693S213.551052 953.98938 476.94668 954.021373s476.957344-213.412417 477.085315-476.808045A477.010665 477.010665 0 0 0 476.808045 0.000043z m273.761252 353.369671L441.861388 661.853674a43.1901 43.1901 0 0 1-62.023117 0L202.214984 484.251715a43.864079 43.864079 0 1 1 62.033781-62.033782l147.21959 147.21959 277.89897-276.86454a43.861946 43.861946 0 1 1 62.023117 62.033781z m0 0"
        p-id="1520"
        fill="#67c23a"
      ></path>
    </svg>

    <svg
      v-else-if="type === 'error'"
      t="1744106304386"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4637"
      :width="size ?? 16"
      :height="size ?? 16"
    >
      <path
        d="M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m238.4 641.6l-45.6 45.6L512 557.6 318.4 750.4l-45.6-45.6L467.2 512 273.6 318.4l45.6-45.6L512 467.2l193.6-193.6 45.6 45.6L557.6 512l192.8 193.6z"
        p-id="4638"
        fill="#f56c6c"
      ></path>
    </svg>

    <svg
      v-else-if="type === 'warn'"
      t="1744107187031"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="5806"
      :width="size ?? 16"
      :height="size ?? 16"
    >
      <path
        d="M512 4.12672c280.49408 0 507.87328 227.3792 507.87328 507.87328 0 280.49408-227.3792 507.87328-507.87328 507.87328C231.50592 1019.87328 4.12672 792.49408 4.12672 512 4.12672 231.50592 231.50592 4.12672 512 4.12672zM512 685.96736c-42.47552 0-76.91264 34.42688-76.91264 76.91264 0 42.47552 34.43712 76.91264 76.91264 76.91264 42.47552 0 76.91264-34.43712 76.91264-76.91264C588.91264 720.39424 554.47552 685.96736 512 685.96736zM509.78816 625.83808c36.58752 0 66.24256-29.66528 66.24256-66.24256l0-309.1456c0-36.58752-29.65504-66.24256-66.24256-66.24256-36.58752 0-66.24256 29.66528-66.24256 66.24256l0 309.1456C443.5456 596.18304 473.20064 625.83808 509.78816 625.83808z"
        fill="#e6a23c"
        p-id="5807"
      ></path>
    </svg>

    <span class="text">{{ text }}</span>
  </div>
</template>
<script setup lang="ts">
import { onMounted, type PropType, ref } from "vue";
type MsgType = "warn" | "error" | "success";
//使用方式：useNuxtApp().$message.success("你好");
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  size: {
    type: String,
  },
  type: {
    type: String as PropType<MsgType>,
    default: "warn",
  },
});

const colorMap: Record<MsgType, { text: string; bg: string }> = {
  error: {
    text: "#f56d6d",
    bg: "#fef0f0",
  },
  success: {
    text: "#6dc542",
    bg: "#f0f9eb",
  },
  warn: {
    text: "#e9ae56",
    bg: "#fdf6ec",
  },
};

const bgColor = computed(() => {
  return colorMap[props.type]?.bg;
});
const textColor = computed(() => {
  return colorMap[props.type]?.text;
});
const visible = ref(false);
onMounted(() => {
  visible.value = true;
});
</script>
<style scoped>
.message {
  position: fixed;
  z-index: 8888;
  top: 0;
  color: v-bind("textColor");
  left: 50%;
  height: 40px;
  line-height: 40px;
  top: 80px;
  transform: translate(-50%);
  padding: 12px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  animation: downed 100ms ease;
  border-radius: 4px;
  box-sizing: border-box;
}
@keyframes downed {
  0% {
    top: 60px;
  }
  100% {
    top: 80px;
  }
}
.text {
  margin-left: 5px;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
