<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  watch: {
    $route() {
      window.scroll(0, 0);
    },
  },
};
</script>

<style>
</style>
