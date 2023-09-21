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
console.log('weatherData', weatherData)
</script>

<template>
  <main class="w-full">
    <div>preview page for {{ city }}</div>
  </main>
</template>
