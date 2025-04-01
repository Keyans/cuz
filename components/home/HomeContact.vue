<template>
  <section class="bg-white py-20">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">供应商入驻</h2>
        <p class="text-gray-600 text-lg mb-8">立即入驻，前50名享终身免平台服务费！</p>
        <button class="bg-gradient-to-r from-yellow-300/80 to-yellow-400/90 hover:from-yellow-400/90 hover:to-yellow-500/95 text-black font-semibold py-3 px-8 rounded-lg transition-all duration-200 animate-bounce-custom shadow-lg">
          马上申请
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes bounce-custom {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-custom {
  animation: bounce-custom 1.5s ease-in-out infinite;
}
</style>

<script setup>
</script>