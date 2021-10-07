<template>
  <div class="mui-content">
    <div class="mui-content-padded">
      <div class="header-title">
        <div class="header-left">
          <span class="animat" />
          <div class="header-li">
            <li v-for=" (item, index) in liArr" :key="index" :class="[actived === index ? 'active-ed' : '']" @click="avtived(index)">{{ item }}<span /></li>
          </div>
        </div>
        <div class="header-right">
          <span>admin<i /></span>
        </div>
      </div>
      <div class="project-contetn">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="项目" name="first">
            <div class="tabs-content">
              <div class="sreach-header">
                <el-input
                  v-model="projectNamge"
                  style="width: 300px;"
                  placeholder="请输入内容"
                  prefix-icon="el-icon-search"
                  @change="hanlderSreach"
                />
              </div>
              <div class="project-list">
                <li class="project-create">
                  <span class="create-bg" />
                  <span class="create-title">欢迎来到可视化平台</span>
                  <el-button>创建项目</el-button>
                </li>

                <li v-for="(item, index) in projectArr" :key="index" class="project-application">
                  <div class="app-image">
                    <i>
                      <font>APP</font>
                    </i>
                  </div>
                  <div @click="openProject(item.path)">
                    <span>{{ item.name }}</span>
                    <span class="project-video" />
                  </div>
                </li>

              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="扩展" name="second">
            <div class="tabs-content">
              <span class="empty-image" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { project } from '@/api/project'
export default {
  name: "Project",
  components: {},
  data() {
    return {
      headerTitle: 'index',
      activeName: 'first',
      actived: 0,
      projectNamge: '',
      liArr: ["首页", "文档", "管理"],
      projectArr: []
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
    this.getProjectList()
  },
  methods: {
    getProjectList() {
      project().then(response => {
        const { data } = response || []
        this.projectArr = data
      }).catch(error => {
        console.error(error)
      })
    },
    openProject(url) {
      if (url) {
        this.$router.push({
          path: url
        })
      }
    },
    handleClick(tab, event) {
    },
    avtived(id) {
      this.actived = id
    },
    hanlderSreach() {
    }
  }
};
</script>
<style lang="scss">
.mui-content {
  width: 100%;
  background-color: #FFFFFF;
  position: relative;

  .mui-input-groups {
    width: 350px;
    height: 300px;
    position: absolute;
    top: 0;
    right: 250px;
    bottom: 0;
    margin: auto 0;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 8px 1PX #ffffff;
    box-shadow: 0px 0px 6px 0PX #ffffff;
    padding: 30px 35px;

    .mui-input-rows {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      padding-bottom: 5px;
      margin-bottom: 10px;

      label {
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #515151;
        display: flex;

        i {
          margin-right: 10px;
        }

      }

      &.row-user {
        i{
          display: inline-block;
          width: 17px;
          height: 20px;
          background: url(~@/assets/images/users.png) no-repeat;
          background-position: center;
          margin-left: -2PX;
          background-size: 100%;
        }
      }

      &.row-password {
        i{
          display: inline-block;
          width: 14px;
          height: 20px;
          background: url(~@/assets/images/密码.png) no-repeat;
          background-position: center;
          background-size: 100%;
        }
      }

      input {
        width: 100%;
        height: 32px;
        line-height: 32px;
        margin-top: 10px;
        border: 0 none;
        font-size: 16px;
        background-color: transparent;
        padding: 0 27px;
      }

        &::after{
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          height: 1px;
          content: '';
          -webkit-transform: scaleY(.5);
          transform: scaleY(.5);
          background-color: #eaeaea;
        }
    }

    .mui-button-row {
      margin: 20px 0;
      text-align: center;

      button {
        width: 104px;
        height: 42px;
        border-radius: 21px;
        background-color: transparent;
        position: relative;

        span {
          display: inline-block;
          width: 94px;
          height: 32px;
          line-height: 32px;
          font-size: 15px;
          color: #FFFFFF;
          border-radius: 21px;
          background-color: #7872F9;
          position: absolute;
          top: 4px;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 0 auto;
        }
      }
    }
  }

}
.mui-content-padded {
  height: 100%;
  overflow: auto;
  background-color:#E8EEF4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span, i, div {
    color: #435563;
  }

  .header-title {
    width: 100%;
    height: 35PX;
    line-height: 35PX;
    padding: 0 30px;
    font-size: 14px;
    font-weight: 300;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #211d1d;
    text-align: left;
    background-color: #FFFFFF;
    -webkit-box-shadow: 0px 0px 8px 1PX #E8EEF4;
    box-shadow: 0px 0px 6px 0PX #E8EEF4;
    font-family: AlibabaPuHuiTiM;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .header-left {
      width: 50%;
      height: 100%;
      display: flex;

       & > span{
        display: inline-block;
        width: 30PX;
        background: url(~@/assets/images/atomv.png) no-repeat;
        background-position: center;
        background-size: 100%;
      }

      .header-li {
        display: flex;
        justify-content: flex-start;
        margin-left: 10px;

        li {
          width: auto;
          min-width: 70px;
          height: 100%;
          font-size: 15px;
          color: #435563;
          text-align: center;
          position: relative;
          font-weight: 500;
          cursor: pointer;

          &.active-ed {
            color: #7872F9;

            span {
              position: absolute;
              left: 0;
              right: 0%;
              bottom: 0;
              display: inline-block;
              width: 50%;
              height: 2PX;
              margin: auto;
              border-radius: 2PX;
              background-color: #7872F9;
            }
          }
        }
      }

    }

    .header-right {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: flex-end;

      & > span{
        display: inline-block;
        width: auto;
        font-weight: 15px;
        font-weight: 500;
        color: #435563;

        i {
          display: inline-block;
          width: 17PX;
          height: 100%;
          background: url(~@/assets/images/down_01.png) no-repeat;
          background-position: center;
          background-size: 100%;
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }
  }

  .project-contetn {
    flex: 1;
    width: 100%;
    padding: 30px 60px;

      .el-tabs__item {
          padding: 0 20px;
          height: 40px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          line-height: 40px;
          display: inline-block;
          list-style: none;
          font-size: 23px;
          font-weight: 500;
          color: #BEC4CA;
          position: relative;
      }

      .el-tabs__item.is-active {
          color: #435563;
      }

      .el-tabs__nav-wrap {
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background-color: transparent;
          z-index: 1;
        }

    }

    .el-tabs {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .el-tabs__content {
        flex: 1;
        width: 100%;

        .el-tab-pane {
          height: 100%;
        }
      }
    }

    .tabs-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .project-list {
        width: calc(100% + 15px);
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        overflow: hidden;

        & > li {
          width: 280px;
          height: 220px;
          margin-right: 20px;
          margin-bottom: 20px;
          border-radius: 2PX;
          overflow: hidden;
          background-color: #EDF4F4;
          -webkit-box-shadow: 0px 0px 8px 1PX #DCDFE6;
          box-shadow: 0px 0px 6px 0PX #DCDFE6;
        }

        .project-create {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: #fbfbfb;

          .create-bg {
            height: 60%;
            width: 100%;
            background: url(~@/assets/images/create_01.png) no-repeat;
            background-position: center;
            background-size: contain;
          }

          .create-title {
            color: #435563;
            text-align: center;
            font-size: 14px;
            font-weight: 600;
          }

          .el-button {
            width: 90px;
            height: 30px;
            padding: 0;
            margin: auto;
            text-align: center;
            line-height: 6px;
            font-size: 12px;
            border: 1px solid #409EFF;

            span {
              color: #409EFF;
            }
          }
        }

        .project-application {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .app-image {
            width: 100%;
            flex: 1;
            background: url(~@/assets/images/resource.png) no-repeat;
            background-position: center;
            background-size: contain;
            position: relative;
            overflow: hidden;
            transform: scale(1);
            transition: transform 0.5s ease 0s;

            &:hover {
              transform: scale(1.1);
            }

            & > i {
              width: 50PX;
              height: 60PX;
              position: absolute;
              background-color: #3DA5F4;
              transform: rotate( 45deg) translate(-33px, -3px);
              -ms-transform: rotate( 45deg) translate(-33px, -3px);
              -moz-transform: rotate( 45deg) translate(-33px, -3px);
              -webkit-transform: rotate( 45deg) translate(-33px, -3px);

              font {
                color: #FFFFFF;
                color: #FFFFFF;
                position: absolute;
                transform: rotate( -89deg) translate(-22px, 30px);
                -ms-transform: rotate( -89deg) translate(-22px, 30px);
                -moz-transform: rotate( -89deg) translate(-22px, 30px);
                -webkit-transform: rotate( -89deg) translate(-22px, 30px);
              }
            }
          }

          & > div:last-child {
            width: 100%;
            height: 30PX;
            line-height: 30PX;
            padding: 0 10px;
            font-size: 13px;
            background-color: #FFFFFF;
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            z-index: 3;

            span {
              font-weight: 600;
            }

            .project-video {
              display: inline-block;
              width: 17PX;
              height: 100%;
              background: url(~@/assets/images/video_light.png) no-repeat;
              background-position: center;
              background-size: 100%;
              vertical-align: middle;
              cursor: pointer;
            }

          }

        }

      }

    }

  }

}

</style>
