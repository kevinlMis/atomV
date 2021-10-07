<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
    }
  },
  computed: {
    key() {
      return this.$route.path;
    }
  }
}
</script>

<style lang="scss" scoped>

.app-main {
  height: 100%;
  width: 100%;
}
</style>
