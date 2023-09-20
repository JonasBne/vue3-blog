<template>
  <div class="flex flex-col items-center h-full bg-slate-700 text-white">
    <SiteNavigation />
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteNavigation from '@/components/SiteNavigation.vue'
</script>
<style lang=""></style>
