<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { resetFontsize } from "@/utils/index.js";
export default {
  name: "App",
  mounted() {
    setTimeout(() => {
      resetFontsize();
    }, 0);
    resetFontsize();
  }
};
</script>

<style lang="scss" scoped>
</style>
