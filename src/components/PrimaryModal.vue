<template>
  <div class="flex flex-col items-center min-w-fit min-h-fit">
    <dialog v-show="isOpen" class="flex flex-col gap-y-4 p-4 m-4 rounded-lg text-sm">
      <slot />
      <button
        class="bg-weather-primary text-white cursor-pointer rounded-md p-2"
        @click="$emit('close-modal')"
      >
        Close
      </button>
    </dialog>
  </div>
</template>
<script setup lang="ts">
defineEmits(['close-modal'])

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})
</script>
