<template>
  <div>
    <header :class="['mui-bar mui-bar-nav header-bg',isMypage ? 'header-mypage' : '']">
      <div class="header-left">
        <span class="animat" />
        <span class="header-title">{{ projectName }}</span>
        <span>
          <i />
        </span>
      </div>
      <div class="header-center">
        <li>
          <span>p_simple_report</span><i />
        </li>
        <li>
          <span>p_simple_report</span><i />
        </li>
      </div>
      <div class="header-right" />
    </header>
  </div>
</template>
<script>
import Sidebar from '@/layout/Sidebar'
import { mapGetters } from 'vuex'
import stack from "@/stack";
import store from "@/store";
export default {
  name: "Header",
  components: {
    Sidebar
  },
  data() {
    return {
      stackList: [],
      projectName: 'MyprojectManage'
    };
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),

    title() {
      return !store.getters.sidebar.isIndexP ? store.getters.sidebar.title || 'atomV' : 'atomV';
    },
    isHeader() {
      return store.getters.sidebar.isHeader;
    },
    isMypage() {
      return store.getters.sidebar.isMypage;
    }
  },
  watch: {
    $route() {}
  },
  methods: {
    goBack() {
      if (!stack.isEmpty()) {
        const path = stack.hisPop()
        if (path) {
          this.$router.push({ path: path })
        } else {
          this.$message({
            type: "info",
            message: "没有历史记录了！"
          });
        }
      } else {
        this.$message({
          type: "info",
          message: "没有历史记录了！"
        });
      }
    },
    showMenu() {
      const that = this
      this.$store.dispatch("app/setOpenR", '');
      setTimeout(() => {
        that.$store.dispatch("app/setMask", this.sidebar.openedR);
      }, 610);
    },
    toggerShow() {
      const that = this
      if (!this.sidebar.isIndexP) {
        this.goBack()
        return false
      }
      this.$store.dispatch("app/setOpenL", '');
      setTimeout(() => {
        that.$store.dispatch("app/setMask", this.sidebar.openedL);
      }, 610);
    }
  }
};
</script>

<style lang="scss" scoped>

.mui-bar-nav {
  height: 44PX;
  line-height: 44PX;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .header-left {
    width: 300px;
    padding-left: 10PX;
    display: flex;
    border-right:1px solid rgba(255,255,255,0.1);
    justify-content: space-between;

    & > span:first-child {
      display: inline-block;
      width: 30PX;
      background: url(~@/assets/images/atomv.png) no-repeat;
      background-position: center;
      background-size: 100%;
    }

    .header-title {
      flex: 1;
      line-height: 40PX;
      padding: 0 10px;
      font-size: 15px;
      text-align: left;
      color: rgba(255,255,255,0.9);
    }

    & > span:last-child {
      width: 40PX;
      height: 100%;

      i {
        display: inline-block;
        width: 25PX;
        height: 25PX;
        margin: 9px;
        border: 1px solid rgba(255,255,255, 0.6);
        border-radius: 5PX;
        background: url(~@/assets/images/箭头1.png) no-repeat;
        background-position: center;
        background-size: 35%;
        transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        opacity: 0.5;
        cursor: pointer;
      }
    }
  }

  .header-center {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    li {
      width: 160px;
      height: 100%;
      position: relative;
      border-right: 1px solid rgba(255,255,255,0.1);

      span {
        height: 100%;
        width: calc(100% - 40px);
        display: inline-block;
        margin: 0 10px;
        line-height: 40PX;
        color: rgba(255,255,255,0.8);
        font-size: 13px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      i {
        position: absolute;
        top: 10px;
        right: 6px;
        width: 24px;
        height: 24px;
        border-radius: 3PX;
        color: rgba(255,255,255,0.8);

        &::before {
          content: 'x';
          height: 0;
          position: absolute;
          top: -13px;
          right: 7px;
          font-size: 15px;
        }
      }
    }

  }

  .header-right {
    width: 50PX;
    background: url(~@/assets/images/个人中心.png) no-repeat;
    background-position: center;
    background-size: 57%;
    border-left:1px solid rgba(255,255,255,0.1);
    cursor: pointer;
  }
}

.header-bg {
  width: 100%;
  background-color: #2B2F33;
  font-family: AlibabaPuHuiTiL;
  display: flex;
  justify-content: space-between;

  &.header-mypage {
    box-shadow: none;
    -webkit-box-shadow: none;
  }

  .mui-icon-transLate {
    transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
  }

  .mui-title {
    flex: 1;
    font-size: 17px;
    font-weight: 300;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    text-align: left;
    padding-left: 14PX;
    padding-right: 12px;
    line-height: 44PX;
    position: unset;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mui-icon-back:before,
  .mui-icon-left-nav:before {
    color: #ffffff;
  }
}
</style>
