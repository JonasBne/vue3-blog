<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const query = ref(route.query.search || '')

watch(query, (newQuery) => {
  router.push({ query: { search: newQuery } })
})
</script>

<template>
  <main class="w-full">
    <div class="mt-4">
      <input
        name="query"
        class="bg-transparent text-white border-b border-b-weather-secondary w-full p-2 focus:outline-none focus:shadow-xl focus:border-weather-secondary"
        placeholder="Search for a city..."
        v-model="query"
      />
    </div>
  </main>
</template>
