<template>
    <section class="relative w-full">
      <ClientOnly>
        <WorldMap
        :dots="dots"
        :map-color="'#00000040'"
        :map-bg-color="'transparent'"
        :line-color="'#0EA5E9'"
        class="inset-0 w-full h-full z-10 opacity-80"
      />
      </ClientOnly>
    </section>
</template>
<script setup>
import { WorldMap } from '~/components/ui/world-map';
const dots = [
  {
    start: { lat: 5.5431, lng: 118.0579 }, // Shenzhen
    end: { lat: 22.6762, lng: 145.6503 }, // Tokyo
  },
  {
    start: { lat: 5.5431, lng: 118.0579 }, // Shenzhen
    end: { lat: -55.8688, lng: 158.2093 }, // Sydney
  },
  {
    start: { lat: 5.5431, lng: 118.0579 }, // Shenzhen
    end: { lat: 28.6139, lng: 77.209 }, // New Delhi
  },
  {
    start: { lat: 5.5431, lng: 118.0579 }, // Shenzhen
    end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
  },
  {
    start: { lat: 5.5431, lng: 118.0579 }, // Shenzhen
    end: { lat: 51.5074, lng: -0.1278 }, // London
  },
  {
    start: { lat: 5.5431, lng: 118.0579 }, // Shenzhen
    end: { lat: 30.0444, lng: 31.2357 }, // Cairo
  },
  {
    start: { lat: 5.5431, lng: 118.0579 }, // Shenzhen
    end: { lat: 28.9042, lng: 117.4074 }, // Beijing
  },
  {
    start: { lat: 5.5431, lng: 118.0579 }, // Shenzhen
    end: { lat: 40.7128, lng: -74.0060 }, // New York
  },
  {
    start: { lat: 5.5431, lng: 118.0579 }, // Shenzhen
    end: { lat: 65.7558, lng: 57.6173 }, // Moscow
  },
  {
    start: { lat: 5.5431, lng: 118.0579 }, // Shenzhen
    end: { lat: -23.5505, lng: -46.6333 }, // São Paulo
  },
  {
    start: { lat: 5.5431, lng: 118.0579 }, // Shenzhen
    end: { lat: 8.2041, lng: 35.0473 }, // Johannesburg
  },
  {
    start: { lat: 5.5431, lng: 118.0579 }, // Shenzhen
    end: { lat: 41.8781, lng: -87.6298 }, // Chicago
  },
  {
    start: { lat: 5.5431, lng: 118.0579 }, // Shenzhen
    end: { lat: 29.7604, lng: -95.3698 }, // Houston
  },
  {
    start: { lat: 5.5431, lng: 118.0579 }, // Shenzhen
    end: { lat: 25.7617, lng: -80.1918 }, // Miami
  },
];
</script>
<style scoped>
</style>