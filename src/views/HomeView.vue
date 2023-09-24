<script setup lang="ts">
import CitySearch from '@/components/CitySearch.vue'
import type { CityInformation } from '@/components/SiteNavigation.vue'
import { getItemLocalStorage } from '@/utils/getItemLocalStorage'
import { reactive, onMounted, watch } from 'vue'

const state = reactive({
  savedCities: [] as CityInformation[]
})

onMounted(() => {
  state.savedCities = getItemLocalStorage('savedCities') as CityInformation[]
})

watch(
  () => state.savedCities,
  (newSavedCities) => {
    state.savedCities = newSavedCities
  }
)
</script>

<template>
  <main class="w-full p-4">
    <div class="mt-4">
      <CitySearch />
    </div>
    <section class="mt-6">
      <ul v-if="state.savedCities">
        <li
          v-for="city in state.savedCities"
          :key="city.id"
          class="bg-slate-600 p-4 rounded-md font-bold text-lg"
        >
          {{ city.name }}
        </li>
      </ul>
      <p class="font-bold" v-else>
        You have no saved cities. Search for a city and save it on the preview page.
      </p>
    </section>
  </main>
</template>
