<template>
  <div>
    <h1>Header</h1>
    <Search></Search>
    <Navigation></Navigation>
  </div>
</template>

<script>
import Search from "./Search.vue";
import Navigation from "./Navigation.vue";
export default {
  components: {
    Search,
    Navigation
  }
}
</script>

<style>

</style>