<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <AppHeader />

    <!-- Main content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Layout component setup
</script>
