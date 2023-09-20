<template>
  <header class="sticky top-0 shadow-xl w-full p-4">
    <nav class="flex items-center justify-between">
      <RouterLink to="home" class="flex items-center gap-x-4 hover:cursor-pointer">
        <font-awesome-icon icon="fa-sun" />
        <div class="font-bold">Vue Weather</div>
      </RouterLink>
      <div class="flex gap-x-4">
        <font-awesome-icon
          icon="fa-circle-info"
          class="hover:cursor-pointer"
          @click="toggleModal"
        />
        <font-awesome-icon icon="fa-plus" class="hover:cursor-pointer" />
      </div>
    </nav>
  </header>
  <InformationModal v-if="isOpen" @close-modal="toggleModal" />
</template>

<script setup lang="ts">
import InformationModal from './InformationModal.vue'
import { ref } from 'vue'

const isOpen = ref(false)
const toggleModal = () => (isOpen.value = !isOpen.value)
</script>
