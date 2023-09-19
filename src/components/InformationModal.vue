<template>
  <PrimaryModal>
    <h1 class="font-bold">About</h1>
    <p>
      The Local Weather app allows you to track the current and future weather of cities of your
      choosing.
    </p>
    <h1 class="font-bold">How it works</h1>
    <p>1. Search for your city by entering the name into the search bar.</p>
    <p>2. Click on the city you want to track.</p>
    <p>3. Click the plus icon to add the city to your list.</p>
    <h1 class="font-bold">Removing a city</h1>
    <p>
      If you no longer whish to track a city, simply select the city within the home page. At the
      bottom of the page, there will be an option to delete the city.
    </p>
  </PrimaryModal>
</template>
<script setup lang="ts">
import PrimaryModal from './PrimaryModal.vue'
</script>
