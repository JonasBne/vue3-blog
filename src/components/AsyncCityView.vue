<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const apiKey = import.meta.env.VITE_API_KEY

const route = useRoute()
const city = route.params.city

const requestError = ref(false)

const getWeatherData = async () => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${city}&days=7&key=${apiKey}`
    )
    return await response.json()
  } catch (e) {
    requestError.value = true
  }
}

const weatherData = await getWeatherData()
const { location, current } = weatherData
</script>

<template>
  <main class="flex flex-col items-center w-full my-4">
    <div class="flex flex-col items-center gap-y-2">
      <div class="font-bold text-2xl">{{ location.name }}</div>
      <div class="text-xs">{{ location.localtime }}</div>
    </div>
    <div class="flex flex-col items-center mt-8 gap-y-2">
      <div class="font-bold text-5xl">{{ current.temp_c }} ˚C</div>
      <div class="text-xs">Feels like {{ current.feelslike_c }} ˚C</div>
      <img alt="Weather icon" :src="current.condition.icon" class="mt-4" />
    </div>
  </main>
</template>
