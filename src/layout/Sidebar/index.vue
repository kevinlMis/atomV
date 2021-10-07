<template>
  <div class="sidebar-nav">
    <div class="sidebar-menu">
      <li v-for="(item, index) in menuArr" :key="index" :class="[item.isActived ? 'actived' : '']" @click="toggerMenu">
        <span :class="[item.icon]" :title="item.name" />
      </li>
    </div>
    <div class="nav-content">
      <component
        :is="switchComp"
        :key="Math.random()*10"
      />
    </div>
  </div>
</template>

<script>

import PageTreeFile from '@/components/PageTreeFile'

export default {
  name: "Sidebar",
  components: {
    PageTreeFile
  },
  props: {},
  data() {
    return {
      title: 'atomV',
      randomN: 0,
      switchComp: 'PageTreeFile',
      menuArr: [
        {
          "name": "设计页面",
          "component": "design",
          "icon": "design",
          "isActived": true
        },
        {
          "name": "数据源配置",
          "component": "database",
          "icon": "database",
          "isActived": false
        },
        {
          "name": "设计页面",
          "component": "configuration",
          "icon": "configuration"
        }
      ]
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    setBgMask() {
      this.randomN = 0
      const that = this
      const fn = function(num) {
        num = num || 0
        if (num < 0.01) {
          num += 0.0008
          that.randomN = num
          setTimeout(() => {
            fn(num)
          }, 100);
        }
        return num
      }
      fn(0)
    },
    closeMenu() {
      if (this.$store.getters.sidebar.openedL) {
        this.$store.dispatch("app/setOpenL", '');
      }
      if (this.$store.getters.sidebar.openedR) {
        this.$store.dispatch("app/setOpenR", '');
      }
      this.$store.dispatch("app/setMask", false);
    },
    toggerMenu(row) {
      // this.switchComp = row.component
    }
  }
}
</script>
