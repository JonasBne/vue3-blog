<template>
  <div class="flex flex-col items-center min-w-fit min-h-fit">
    <dialog open class="flex flex-col gap-y-4 p-4 m-4 rounded-lg text-sm">
      <slot />
      <button
        class="bg-gray-700 text-white cursor-pointer rounded-md p-2"
        @click="$emit('close-modal')"
      >
        Close
      </button>
    </dialog>
  </div>
</template>
<script setup lang="ts">
defineEmits(['close-modal'])
</script>
