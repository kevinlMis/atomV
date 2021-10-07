<template>
  <div v-if="centerDataObj !== null && JSON.stringify(centerDataObj) !== '{}'" :ref="refc" class="pieCoal-chart" />
  <div v-else class="no-prompt">
    <span>暂无数据</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Piecoal',
  components: {},
  props: {
    dataArraya: {
      type: Object,
      default: () => {
        return { all: 0, practicalVal: 0, planVal: 0 }
      }
    },
    refc: {
      type: String,
      default: () => {
        return 'chartsPie'
      }
    }
  },
  data() {
    return {
      centerDataObj: { all: 0, practicalVal: 0, planVal: 0 },
      myChart: null,
      chartTimeOut: null
    }
  },
  computed: {
    ...mapState({
      mobile: state => state.user.mobile
    })
  },
  watch: {
    dataArraya: {
      handler(val, oldVal) {
        if (oldVal !== val) {
          this.$set(this.centerDataObj, 'all', val.all || 0)
          this.$set(this.centerDataObj, 'practicalVal', val.practicalVal || 0)
          this.$set(this.centerDataObj, 'planVal', val.planVal || 0)
          this.initChart()
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.centerDataObj !== null && JSON.stringify(this.centerDataObj) !== '{}' ? this.initChart() : ''
    this.listenResize()
  },
  methods: {
    initChart() {
      const all = this.centerDataObj.all !== undefined ? this.centerDataObj.all : 100
      const practicalVal = this.centerDataObj.practicalVal !== undefined ? this.centerDataObj.practicalVal : 100
      const planVal = this.centerDataObj.planVal !== undefined ? this.centerDataObj.planVal : 100
      const backgroundColor = ['#5F76AF', '#4C4C4C', '#E9E9E9']
      const option = {
        backgroundColor: 'transparent',
        tooltip: {
          show: false,
          trigger: 'item'
        },
        legend: {
          show: false,
          orient: 'vertical',
          bottom: '20',
          x: 'center',
          itemWidth: 9,
          itemHeight: 9,
          itemGap: 12,
          textStyle: {
            color: 'rgba(255,255,255,.65)',
            fontSize: 12,
            padding: [0, 0, 0, 10]
          }
        },
        series: [
          {
            name: '实际',
            type: 'pie',
            radius: ['85%', '95%'],
            startAngle: 0, // 起始角度
            clockWise: true, // 顺时针加载
            hoverAnimation: false,
            data: [
              {
                value: practicalVal,
                name: '合格率',
                itemStyle: {
                  color: backgroundColor[0],
                  shadowBlur: 2,
                  shadowColor: 'rgba(0, 0, 0, 0.1)' // 阴影颜色

                }
              },
              {
                value: all - practicalVal,
                name: '',
                itemStyle: {
                  color: 'transparent'
                }
              }
            ],
            z: 3,
            label: {
              show: false
            }
          },
          {
            name: '计划',
            type: 'pie',
            radius: ['85%', '95%'],
            startAngle: 0, // 起始角度
            clockWise: true, // 顺时针加载
            hoverAnimation: false,
            data: [
              {
                value: planVal,
                name: '合格率',
                itemStyle: {
                  color: backgroundColor[1],
                  shadowBlur: 2,
                  shadowColor: 'rgba(0, 0, 0, 0.1)' // 阴影颜色
                }
              },
              {
                value: all - planVal,
                name: '',
                itemStyle: {
                  color: 'transparent'
                }
              }
            ],
            z: 2,
            label: {
              show: false
            }
          },
          {
            name: '背景底色',
            type: 'pie',
            radius: ['85%', '95%'],
            startAngle: 0, // 起始角度
            clockWise: true, // 顺时针加载
            hoverAnimation: false,
            data: [
              {
                value: all,
                name: '合格率',
                itemStyle: {
                  color: backgroundColor[2],
                  shadowBlur: 2,
                  shadowColor: 'rgba(0, 0, 0, 0.1)' // 阴影颜色
                }
              }
            ],
            z: 1,
            label: {
              show: false
            }
          }

        ]
      };

      if (this.$refs[this.refc] !== undefined) {
        this.myChart = this.$echarts.init(this.$refs[this.refc])
        // 绘制图表
        this.myChart.setOption(option)
      }
    },
    listenResize() {
      window.addEventListener("resize", () => {
        if (this.chartTimeOut) {
          clearTimeout(this.chartTimeOut)
        }
        this.chartTimeOut = setTimeout(() => {
          if (this.myChart) {
            this.myChart.resize()
          }
        }, 100);
      }, false)
    }

  }
}
</script>
<style lang="scss" scoped>
  .pieCoal-chart {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .greet-page-main .no-prompt{
    width: 100%;
    span {
      font-size: 1.2em;
    }
  }
</style>
