<template>
  <!--组件面板-->
  <div class="compents-panel">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="组件属性" name="1">
        <div>
          <div v-for="(item, index) in protoTypeCompentList" :key="index" class="compent-layout">
            <span @click="tiggerHanlder(item)">
              <i :class="[item.isSpread ? 'isSpread' : '']" />{{ item.panelName }}
            </span>
            <ul v-show="item.isSpread" :class="['compent-area-panel']">
              <div class="wrapper-property">
                <el-form label-position="left" label-width="70px" :model="dataObj.config">
                  <el-form-item label="标题">
                    <el-input v-model="dataObj.config.title" />
                  </el-form-item>
                  <el-form-item label="高度">
                    <el-input v-model="dataObj.config.height" type="number" />
                  </el-form-item>
                  <el-form-item label="数据源">
                    <el-select v-model="dataObj.config.dataSource" placeholder="请选择数据源">
                      <el-option label="区域一" value="shanghai" />
                      <el-option label="区域二" value="beijing" />
                    </el-select>
                  </el-form-item>
                  <el-form-item v-if="dataObj.config.smooth !== undefined" label="平滑曲线">
                    <el-switch v-model="dataObj.config.smooth" />
                  </el-form-item>
                  <el-form-item v-if="dataObj.config.stack !== undefined" label="堆叠">
                    <el-switch v-model="dataObj.config.stack" />
                  </el-form-item>
                  <el-form-item v-if="dataObj.config.roseType !== undefined" label="南丁格尔">
                    <el-switch v-model="dataObj.config.roseType" />
                  </el-form-item>
                  <el-form-item v-if="dataObj.config.radius1 !== undefined" label="内圈半径(0-100)">
                    <el-input v-model="dataObj.config.radius1" type="number" />
                  </el-form-item>
                  <el-form-item v-if="dataObj.config.radius2 !== undefined" label="外圈半径(0-100)">
                    <el-input v-model="dataObj.config.radius2" type="number" />
                  </el-form-item>
                  <el-form-item label="X轴基数">
                    <el-input v-model="dataObj.config.cardinalNumber" type="number" />
                  </el-form-item>
                  <el-form-item label="系列颜色">
                    <el-color-picker v-model="dataObj.config.colors" />
                  </el-form-item>
                  <el-form-item label="背景颜色">
                    <el-color-picker v-model="dataObj.config.background" />
                  </el-form-item>
                  <el-form-item label="字体颜色">
                    <el-color-picker v-model="dataObj.config.fontColor" />
                  </el-form-item>
                </el-form>
              </div>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="面板属性" name="2">
        <div>
          <span class="empty-image" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import store from "@/store";

export default {
  name: "Header",
  components: {

  },
  data() {
    return {
      activeName: '1',
      activeCompent: '1',
      protoTypeCompentList: [
        {
          "id": '1',
          "panelName": '基本属性',
          "isSpread": true,
          "type": 'layout',
          "compents": []
        }
      ],
      dataObj: {
        config: {
          title: '',
          height: 370,
          chartData: [
            { name: '在业', data: [130, 210, 160, 90, 90, 120, 140] },
            { name: '注销', data: [120, 200, 150, 80, 70, 110, 130] }
          ],
          chartX: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-06'],
          smooth: false,
          cardinalNumber: null,
          colors: ['#4872FF', '#2FCFC4', '#40A9FE', '#FFC16C', '#3BA8FC', '#FF4D4F', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          background: '',
          fontColor: ''
        }
      },
      baseCompentList: []
    };
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isMypage() {
      return store.getters.sidebar.isMypage;
    }
  },
  watch: {
    $route() {}
  },
  mounted() {
    this.$eventBus.$on('prototypeConfigEvent', (msg) => {
      console.log('eventMsg=', msg)
      this.dataObj = msg
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    tiggerHanlder(item) {
      this.$set(item, 'isSpread', !item.isSpread)
    }
  }
};
</script>

<style lang="scss">
.compents-panel {
  width: 100%;
  height: 100%;

  .srecah-header {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid rgba(34, 37, 39, 0.8);

    .el-input {
      width: 100%;
      height: 100%;
      line-height: 40px;

      .el-input__prefix, .el-input__suffix {
        position: absolute;
        top: 0px;

        .el-input__icon{
          color: #999999;
          font-size: 14px;
          font-weight: 600;
        }
      }

      input.el-input__inner {
        height: 100%;
        line-height: 40PX;
        font-size: 14px;
        border: 0 none;
      }

      ::-webkit-input-placeholder {
        color: #999999;
        font-size: 14px;
      }
    }
  }

  .el-tab-pane {
    overflow: auto;
  }

  .el-tabs--card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .el-tabs__header {
      width: 100%;
      height: auto;
      margin: 0px;
      border: 0 none;

      .el-tabs__nav {
        width: 100%;
        border: 0 none;

        .el-tabs__item {
          width: 50%;
          height: 32px;
          line-height: 32px;
          border: 1px solid rgba(34, 37, 39, 0.8);
          color: rgba(255,255,255,0.8);
          text-align: center;
          border-radius: 1PX;
          font-size: 14px;
          background-color: #303336;

          &:nth-child(2) {
            border-left: 0 none;
          }

          &.is-active {
            background-color: #44ABF0;
            box-shadow: 0px 0px 5px 0px #44ABF0;
            -webkit-box-shadow: 0px 0px 5px 0px #44ABF0;
            border-color: #44ABF0;
          }
        }
      }
    }

    .el-tabs__content {
      flex: 1;
      width: 100%;

      .el-tab-pane {
        width: 100%;
        height: 100%;

        & > div{
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          overflow: auto;

        }

      }
    }
  }

  .compent-layout {
    width: 100%;

    & > span:first-child {
      width: 100%;
      height: 32px;
      line-height: 32px;
      display: flex;
      padding: 0 5px;
      font-size: 13px;
      color: rgba(255,255,255,0.8);
      cursor: pointer;
      background-color: #303336;
      border-top: 1px solid rgba(34, 37, 39, 0.8);
      border-bottom: 1px solid rgba(34, 37, 39, 0.8);

      i {
        display: inline-block;
        width: 15PX;
        height: 100%;
        background: url(~@/assets/images/向下1.png) no-repeat;
        background-position: center;
        background-size: 100%;
        margin-right: 10px;
        cursor: pointer;
        -webkit-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        transform: rotate(-90deg);
        -moz-transition: all 0.3s ease;
        -webkit-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        transition: all 0.3s ease;

        &.isSpread {
          -webkit-transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          transform: rotate(0deg);
          -moz-transition: all 0.3s ease;
          -webkit-transition: all 0.3s ease;
          -o-transition: all 0.3s ease;
          transition: all 0.3s ease;
        }
      }
    }

    .compent-area-panel {
      width: 100%;
      flex: 1;
      display: flex;
      padding: 2px 3px;
      justify-content: flex-start;
      flex-wrap: wrap;

      .els-list {
        width: calc(100% / 3);
        height: 90px;
        padding: 10px 13px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;

        &:hover {
          background-color: #303336;
          border: 1px solid rgba(34, 37, 39, 0.8);
          border-radius: 5PX;
        }

        & > span:first-child {
          flex: 1;
          display: inline-block;
          width: 100%;
          background: url(~@/assets/images/删格布局.png) no-repeat;
          background-position: center;
          background-size: 76%;
        }

        & > span:last-child {
          height: 30px;
          line-height: 30px;
          width: 100%;
          color: rgba(255,255,255,0.8);
          font-size: 13px;
          text-align: center;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }

  .wrapper-property {
    width: 100%;
    padding: 10px;

    .el-form-item {
      margin-bottom: 8px;

      .el-form-item__content {
        line-height: 24px;
      }

      .el-input__inner {
        height: 24px;
        line-height: 24px;
        color: #FFFFFF;
        font-size: 13px;
        font-weight: 400;
        border-radius: 3PX;
        padding: 0 5px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: transparent;
      }

      .el-input__icon {
        line-height: 24px;
      }

      .el-form-item__label {
        line-height: 24px;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 500;
        font-size: 13px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .el-color-picker__trigger {
        width: 22px;
        height: 22px;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .el-switch{
        height: 17px;
        line-height: 17px;
      }

      ::-webkit-input-placeholder {
        color: #999999;
        font-size: 12px;
      }

    }
  }
}
</style>
