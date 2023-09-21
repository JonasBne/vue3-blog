<script setup lang="ts">
import AsyncCityView from '@/components/AsyncCityView.vue'
</script>

<template>
  <main class="w-full">
    <Suspense>
      <AsyncCityView />
      <template #fallback> Loading weather data... </template>
    </Suspense>
  </main>
</template>
