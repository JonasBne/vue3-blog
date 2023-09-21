<script setup lang="ts">
import { useRoute } from 'vue-router'
import InformationModal from './InformationModal.vue'
import { ref, watch } from 'vue'

interface CityInformation {
  id: `${string}-${string}-${string}-${string}-${string}`
  name: string
  lat: string
  lon: string
}

const route = useRoute()
const params = ref(route.params)
const query = route.query
const isPreview = ref(query.preview === 'true')

watch(
  () => route.query.preview,
  (newPreview) => {
    isPreview.value = newPreview === 'true'
  }
)

watch(
  () => route.params,
  (newParams) => {
    params.value = newParams
  }
)

const isOpen = ref(false)
const toggleModal = () => (isOpen.value = !isOpen.value)

const savedCities = ref<CityInformation[]>([])

const addCity = () => {
  if (localStorage.getItem('cities')) {
    const cities = JSON.parse(localStorage.getItem('cities') || '')
    savedCities.value = cities
  }

  const cityInformation = {
    id: crypto.randomUUID(),
    name: params.value.city,
    lat: query.lat,
    lon: query.lon
  } as CityInformation

  console.log('query', query, params)

  savedCities.value.push(cityInformation)
  localStorage.setItem('cities', JSON.stringify(savedCities.value))
}
</script>

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
        <font-awesome-icon
          icon="fa-plus"
          class="hover:cursor-pointer"
          @click="addCity"
          v-if="isPreview"
        />
      </div>
    </nav>
  </header>
  <InformationModal v-if="isOpen" @close-modal="toggleModal" />
</template>
