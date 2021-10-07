<template>
  <!--组件面板-->
  <div class="compents-panel">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="组件" name="1">
        <div>
          <div class="srecah-header">
            <el-input
              v-model="sreachVal"
              placeholder="Search"
              prefix-icon="el-icon-search" />
          </div>
          <div class="compents-selects">
            <el-tabs v-model="activeCompent" type="card" @tab-click="handleClick">
              <el-tab-pane label="基本组件" name="1">
                <div>
                  <div v-for="(item, index) in baseCompentList" :key="index" class="compent-layout">
                    <span @click="tiggerHanlder(item)">
                      <i :class="[item.isSpread ? 'isSpread' : '']" />{{ item.panelName }}
                    </span>
                    <ul v-show="item.isSpread" :class="['compent-area-panel']">
                      <template>
                        <draggable class="compent-area-panel"
                                   handle=".move"
                                   animation="300"
                                   :group="{name: 'common', pull: 'clone', put: false}"
                                   :sort="false"
                                   :list="item.compents"
                                   :clone="handleDragClone"
                                   :move="handleDragForbidMove">
                          <li v-for="(element,elIndex) in item.compents" :key="elIndex" class="els-list move">
                            <span :class="[element.icon]" />
                            <span :title="element.name">{{ element.name }}</span>
                          </li>
                        </draggable>
                      </template>
                    </ul>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="扩展组件" name="2">
                <span class="empty-image" />
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="模板" name="2">
        <div>
          <span class="empty-image" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Row from '@/components/Row'
import LineChart from '@/components/charts/LineChart'
import BarChart from '@/components/charts/BarChart'
import PieChart from '@/components/charts/PieChart'
import MapChart from '@/components/charts/MapChart'
import GraphChart from '@/components/charts/GraphChart'
import Map3DChart from '@/components/charts/Map3DChart'

import Draggable from 'vuedraggable'
import store from "@/store";
import { deepClones } from '@/utils'

const colors = ['#4872FF', '#2FCFC4', '#40A9FE', '#FFC16C', '#3BA8FC', '#FF4D4F', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']

export default {
  name: "Header",
  components: {
    Draggable
  },
  data() {
    return {
      activeName: '1',
      activeCompent: '1',
      stackList: [],
      sreachVal: '',
      projectName: 'MyprojectManage',
      baseCompentList: [
        {
          "id": '1',
          "panelName": '布局',
          "isSpread": true,
          "type": 'layout',
          "compents": [
            {
              name: '24', type: '24', component: Row, icon: 'grid-icon',
              cols: [{ col: 24, children: [] }]
            },
            {
              name: '12-12', type: '12_12', component: Row, icon: 'grid-icon',
              cols: [{ col: 12, children: [] }, { col: 12, children: [] }]
            },
            {
              name: '10-14', type: '10_14', component: Row, icon: 'grid-icon',
              cols: [{ col: 10, children: [] }, { col: 14, children: [] }]
            },
            {
              name: '8-8-8', type: '8_8_8', component: Row, icon: 'grid-icon',
              cols: [{ col: 8, children: [] }, { col: 8, children: [] }, { col: 8, children: [] }]
            },
            {
              name: '6-12-6', type: '6_12_6', component: Row, icon: 'grid-icon',
              cols: [{ col: 6, children: [] }, { col: 12, children: [] }, { col: 6, children: [] }]
            },
            {
              name: '6-6-6-6', type: '6_6_6_6', component: Row, icon: 'grid-icon',
              cols: [{ col: 6, children: [] }, { col: 6, children: [] }, { col: 6, children: [] }, { col: 6, children: [] }]
            }
          ]
        },
        {
          "id": '2',
          "panelName": '表单',
          "isSpread": false,
          "type": 'from',
          "compents": [
            {
              "name": '文本框',
              "path": '/compents/form',
              "icon": 'text-icon'
            },
            {
              "name": '下拉选框',
              "path": '/compents/form',
              "icon": 'select-icon'
            },
            {
              "name": '单选框',
              "path": '/compents/form',
              "icon": 'radio-icon'
            },
            {
              "name": '多选框',
              "path": '/compents/form',
              "icon": 'multiple-icon'
            },
            {
              "name": '文本域',
              "path": '/compents/form',
              "icon": 'textarea-icon'
            }
          ]
        },
        {
          "id": '3',
          "panelName": '图表',
          "isSpread": true,
          "type": 'charts',
          "compents": [
            { name: '折线图', type: 'line', component: LineChart, cpnName: 'LineChart', icon: 'line-icon',
              config: {
                title: '企业存续', height: 370,
                chartData: [
                  { name: '在业', data: [130, 210, 160, 90, 90, 120, 140] },
                  { name: '注销', data: [120, 200, 150, 80, 70, 110, 130] }
                ],
                chartX: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-06'],
                smooth: false,
                cardinalNumber: null,
                colors: colors,
                background: '',
                fontColor: ''
              }
            },
            {
              name: '柱状图', type: 'bar', component: BarChart, cpnName: 'BarChart', icon: 'bar-icon',
              config: {
                title: '人口变化趋势', height: 370,
                chartData: [
                  { name: '增加', data: [130, 200, 160, 90, 90, 100, 140] },
                  { name: '减少', data: [120, 200, 150, 80, 70, 110, 130] }
                ],
                chartX: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-06'],
                cardinalNumber: null,
                colors: colors,
                stack: false,
                background: '',
                fontColor: ''
              }
            },
            {
              name: '饼图', type: 'pie', component: PieChart, cpnName: 'PieChart', icon: 'pie-icon',
              config: {
                title: '产业分类', height: 370,
                chartData: [
                  { value: 335, name: '第一产业(农业)' },
                  { value: 310, name: '第二产业(工业)' },
                  { value: 234, name: '第三产业(服务业)' }
                ],
                roseType: false,
                radius1: 0,
                radius2: 75,
                colors: colors,
                background: '',
                fontColor: ''
              }
            },
            { name: 'map', type: 'map', component: MapChart, cpnName: 'MapChart', icon: 'map-icon',
              config: {
                title: 'map', height: 370,
                chartData: [],
                background: '',
                fontColor: ''
              }
            },
            { name: '关系图', type: 'graph', component: GraphChart, cpnName: 'GraphChart', icon: 'graph-icon',
              config: {
                title: '关系图', height: 370,
                chartData: {},
                background: '',
                fontColor: ''
              }
            },
            { name: '3D地理图', type: '3dmap', component: Map3DChart, cpnName: 'Map3DChart', icon: '3dmap-icon',
              config: {
                title: '3D地理图', height: 370,
                chartData: [],
                background: '',
                fontColor: ''
              }
            }
          ]
        }
      ]

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
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    tiggerHanlder(item) {
      this.$set(item, 'isSpread', !item.isSpread)
    },
    // 保证图表只能放入row内
    handleDragForbidMove(evt) {
      console.log('res', evt.to.className)
      if (evt.to.className === 'row-wrapper' && !evt.draggedContext.element.cols) {
        return false
      }
      return true
    },
    handleDragClone(evt) {
      const basic = {
        name: evt.name,
        type: evt.type,
        uniqueId: evt.uniqueId
      }
      const obj = evt.cols ? { cols: evt.cols } : { config: evt.config, cpnName: evt.cpnName }
      return {
        ...deepClones(Object.assign(basic, obj)),
        component: evt.component
      }
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

          .compents-selects {
            flex: 1;
            width: 100%;
          }
        }

      }
    }
  }

  .compents-selects {
    width: 100%;
    height: 100%;

    .el-tabs--card {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .el-tabs__header {
        width: 100%;
        height: 100PX;
        margin: 0px;
        padding: 30px 20px;
        border: 0 none;

        .el-tabs__nav {
          width: 100%;
          border: 0 none;

          .el-tabs__item {
            width: 50%;
            border: 1px solid rgba(34, 37, 39, 0.8);
            color: rgba(255,255,255,0.8);
            text-align: center;
            font-size: 14px;
            line-height: 32px;

            &:nth-child(2) {
              border-left: 0 none;
              border-top-right-radius: 5PX;
              border-bottom-right-radius: 5PX;
            }

            &:nth-child(1) {
              border-top-left-radius: 5PX;
              border-bottom-left-radius: 5PX;
            }

            &.is-active {
              color: #44ABF0;
              background-color: #303336;
              box-shadow: none;
              -webkit-box-shadow: none;
            }
          }
        }
      }

      .el-tabs__content {
        flex: 1;
        width: 100%;

        .el-tab-pane {
          height: 100%;
          overflow: auto;
          display: flex;

          & > div{
            width: 100%;
            height: 100%;
            display: inline-block;
            position: absolute;
          }
        }
      }
    }

    .el-tabs__content {
      overflow: auto;
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
            background: url(~@/assets/images/默认图.png) no-repeat;
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
  }
}
</style>
