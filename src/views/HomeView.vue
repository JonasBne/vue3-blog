<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface SearchResult {
  id: number
  name: string
  region: string
  country: string
  lat: number
  lon: number
  url: string
}

const apiKey = import.meta.env.VITE_API_KEY

const router = useRouter()
const route = useRoute()

const query = ref(route.query.search || '')
const queryResults = ref<SearchResult[] | null>(null)

watch(query, (newQuery) => {
  router.push({ query: { search: newQuery } })
})

watch(queryResults, (newQueryResults) => console.log('query results', newQueryResults))

const handleBlur = async () => {
  const response = await fetch(`https://api.weatherapi.com/v1/search.json?q=Antwerp&key=${apiKey}`)
  const data = await response.json()
  queryResults.value = data
}
</script>

<template>
  <main class="w-full">
    <div class="mt-4">
      <input
        name="query"
        class="bg-transparent text-white border-b border-b-weather-secondary w-full p-2 focus:outline-none focus:shadow-xl focus:border-weather-secondary"
        placeholder="Search for a city..."
        v-model="query"
        @blur="handleBlur"
      />
    </div>
  </main>
</template>
