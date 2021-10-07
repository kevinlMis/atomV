<template>
  <section :class="[{ 'app-main': needTagsView }]">
    <transition name="fade-transform" mode="out-in">
      <div class="transition-in">
        <Header />
        <div class="v-content">
          <div class="sidebar-v">
            <sidebar />
          </div>
          <div class="app-views">
            <app-main />
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import AppMain from './appMain'
import Sidebar from './Sidebar'
import { project } from '@/api/project'
export default {
  name: "Layout",
  components: {
    AppMain,
    Sidebar
  },
  props: {
    needTagsView: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style  lang="scss" scoped>
.app-main {
  height: 100%;
  width: 100%;
  position: relative;

  .transition-in {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .v-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex: 1;

      .sidebar-v {
        width: 300px;
        height: 100%;
      }

      .app-views {
        height: 100%;
        flex: 1;
      }
    }
  }
}

</style>
