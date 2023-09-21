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
const searchError = ref(false)

watch(query, (newQuery) => {
  router.push({ query: { search: newQuery } })
})

const handleBlur = async () => {
  if (!query.value) {
    queryResults.value = null
    return
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?q=${query.value}&key=${apiKey}`
    )
    const data = await response.json()
    queryResults.value = data
  } catch (e) {
    searchError.value = true
  }
}
</script>

<template>
  <input
    name="query"
    class="bg-transparent text-white border-b w-full p-2 focus:outline-none focus:shadow-xl"
    placeholder="Search for a city..."
    v-model="query"
    @blur="handleBlur"
  />
  <ul class="p-2 absolute w-full shadow-md bg-slate-600" v-if="query && queryResults">
    <p v-if="searchError">Something went wrong. Please try again.</p>
    <li v-if="!searchError && queryResults.length === 0 && query.length > 0">
      No results were found for "{{ query }}"
    </li>
    <template v-else>
      <li v-for="result in queryResults" :key="result.id">
        {{ result.name }}
      </li>
    </template>
  </ul>
</template>
