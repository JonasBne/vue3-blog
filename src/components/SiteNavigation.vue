<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import InformationModal from './InformationModal.vue'
import { ref } from 'vue'
import { uid } from 'uid'

interface CityInformation {
  id: string
  name: string
  lat: string
  lon: string
}

const route = useRoute()
const router = useRouter()

const savedCities = ref<CityInformation[]>([])

const addCity = () => {
  if (localStorage.getItem('savedCities')) {
    const cities = JSON.parse(localStorage.getItem('savedCities') || '')
    savedCities.value = cities
  }

  const cityInformation = {
    id: uid(),
    state: route.params.state,
    name: route.params.city,
    lat: route.query.lat,
    lon: route.query.lon
  } as CityInformation

  savedCities.value.push(cityInformation)
  localStorage.setItem('savedCities', JSON.stringify(savedCities.value))

  let query = Object.assign({}, route.query)
  delete query.preview
  query.id = cityInformation.id
  router.replace({ query })
}

const isOpen = ref(false)
const toggleModal = () => (isOpen.value = !isOpen.value)
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
          v-if="route.query.preview === 'true'"
        />
      </div>
    </nav>
  </header>
  <InformationModal v-if="isOpen" @close-modal="toggleModal" />
</template>
