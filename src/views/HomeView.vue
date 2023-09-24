<script setup lang="ts">
import CitySearch from '@/components/CitySearch.vue'
import type { CityInformation } from '@/components/SiteNavigation.vue'
import { getItemLocalStorage } from '@/utils/getItemLocalStorage'
import { reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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

const handleRedirect = (city: CityInformation) =>
  router.push({
    name: 'cityView',
    params: {
      city: city.name
    },
    query: {
      id: city.id,
      lat: city.lat,
      lon: city.lon
    }
  })
</script>

<template>
  <main class="w-full">
    <div class="mt-4">
      <CitySearch />
    </div>
    <section class="my-12">
      <ul v-if="state.savedCities">
        <li
          v-for="city in state.savedCities"
          :key="city.id"
          class="bg-slate-500 p-4 rounded-md font-bold text-lg m-4"
          @click="handleRedirect(city)"
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
