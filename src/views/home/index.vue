<template>
  <div class="mui-content">
    <!--toolBar-->
    <div class="operation-panel">
      <div class="panel-l">
        <span class="lock-icon" />
        <span class="unlock-icon " />
        <span class="save-icon " />
        <span class="preview-icon " />
        <span class="publish-icon " />
      </div>
      <div class="panel-r">
        <span class="desktop-icon" />
        <span class="phone-icon" />
      </div>
    </div>
    <div class="main-contetn">
      <div class="content-left">
        <component-palette />
      </div>
      <div class="content-center">
        <working-area />
      </div>
      <div class="content-right">
        <configuration-area />
      </div>
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import ComponentPalette from '@/components/ComponentPalette'
import ConfigurationArea from '@/components/ConfigurationArea'
import WorkingArea from '@/components/WorkingArea'

export default {
  name: "Home",
  components: {
    ComponentPalette,
    ConfigurationArea,
    WorkingArea
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  mounted() {

  },
  beforeDestroy() {
    this.$store.dispatch("app/setIndex", false);
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch("app/setTabs", 0);
      if (!vm.sidebar.openedL) {
        vm.$store.dispatch("app/setOpenL", 'null');
      }
    })
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>

 @import "~@/styles/home-ui.scss";

</style>
