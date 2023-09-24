<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import InformationModal from './InformationModal.vue'
import { ref } from 'vue'
import { uid } from 'uid'
import { getItemLocalStorage } from '@/utils/getItemLocalStorage'
import { addItemLocalStorage } from '@/utils/addItemLocalStorage'

export interface CityInformation {
  id: string
  name: string
  lat: string
  lon: string
}

const route = useRoute()
const router = useRouter()

const savedCities = ref<CityInformation[]>([])

const addCity = () => {
  const cities = getItemLocalStorage('savedCities')

  if (cities) {
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
  addItemLocalStorage('savedCities', savedCities.value)

  let query = Object.assign({}, route.query)
  delete query.preview
  query.id = cityInformation.id
  router.replace({ query })
}

const isOpen = ref(false)
const toggleModal = () => (isOpen.value = !isOpen.value)

const removeCity = () => {
  const savedCities = getItemLocalStorage('savedCities') as CityInformation[]
  const filteredCities = savedCities.filter((city) => city.id !== route.query.id)
  addItemLocalStorage('savedCities', filteredCities)
  router.push('/')
}
</script>

<template>
  <header class="sticky top-0 shadow-xl w-full p-4">
    <nav class="flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-x-4 hover:cursor-pointer">
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
        <font-awesome-icon
          icon="fa-trash"
          class="hover:cursor-pointer"
          @click="removeCity"
          v-if="route.params.city && !route.query.preview"
        />
      </div>
    </nav>
  </header>
  <InformationModal v-if="isOpen" @close-modal="toggleModal" />
</template>
