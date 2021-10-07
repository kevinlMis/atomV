<template>
  <ul v-if="menu.children && menu.children.length >= 0 " class="menu-items" :style="{'padding-left': padding + 'px'}">
    <div slot="title">
      <li :hidden="[ status === menu.id ? 'actived-menu' : '']" @click="toggerMenu(menu.id)">
        <i class="menu-icon" />
        <i class="file-icon" />
        <span slot="title">{{ menu.name }}</span>
      </li>
    </div>
    <ul v-show="status === menu.id" :class="['menu-child']">
      <MenuTree v-for="item in menu.children" :key="item.id" :menu="item" />
    </ul>
  </ul>
  <li v-else>
    <i class="file-icon-child" />
    <span slot="title" class="child-title">{{ menu.name }}</span>
  </li>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MenuTree',
  props: {
    menu: {
      type: Object,
      required: true
    },
    padding: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'device'
    ]),
    status() {
      return this.device
    }
  },
  mounted() {
  },
  methods: {
    toggerMenu(id) {
      if (this.device === id) {
        this.$store.dispatch("app/setStatus", '');
        return false
      }
      this.$store.dispatch("app/setStatus", id);
    }
  }
}
</script>
<style lang="scss">

.menu-items {
    width: 100%;

    & > div{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      li {
        height: 32px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        cursor: pointer;

        .menu-icon {
          display: inline-block;
          width: 16px;
          height: 100%;
          background: url(~@/assets/images/向下1.png) no-repeat;
          background-position: center;
          background-size: 100%;
          transform: rotate(-90deg);
          -ms-transform: rotate(-90deg);
          -moz-transform: rotate(-90deg);
          -webkit-transform: rotate(-90deg);
          -o-transform: rotate(-90deg);
        }

        .file-icon {
          display: inline-block;
          width: 19px;
          height: 100%;
          background: url(~@/assets/images/folderOpen.png) no-repeat;
          background-position: center;
          background-size: 100%;
          margin:0 6px;
        }

        span {
          flex: 1;
          text-align: left;
          font-size: 13px;
          color: rgba(255,255,255, 0.7);
          line-height: 29px;
          padding-right: 10px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        &.actived-menu {

          .menu-icon {
            transform: rotate(-0deg);
            -ms-transform: rotate(-0deg);
            -moz-transform: rotate(-0deg);
            -webkit-transform: rotate(-0deg);
            -o-transform: rotate(-0deg);
          }
        }

      }
    }

    .spread-actived {
      i:last-child {
        transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -o-transform: rotate(90deg);
      }
    }

    .menu-child {
      width: 100%;
      height: auto;

      &.actived-menu {
        display: inline-block;
      }

      & > li {
        width: 100%;
        height: 32px;
        padding-left: 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        cursor: pointer;

        .file-icon-child {
          display: inline-block;
          width: 19px;
          height: 100%;
          background: url(~@/assets/images/HTML_02.png) no-repeat;
          background-position: center;
          background-size: 100%;
          margin:0 6px;
        }

        .child-title {
          flex: 1;
          text-align: left;
          font-size: 13px;
          color: rgba(255,255,255, 0.7);
          line-height: 29px;
          padding-right: 10px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }

    }
  }

</style>
