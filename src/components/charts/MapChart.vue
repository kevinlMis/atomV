<template>
  <div class="chart-wrapper" :class="{corner: false}">
    <div class="chart-inner" :class="{corner: false}"
         :style="{background: config.background}">
      <h4 class="title"
          :style="{background: config.background,color: config.fontColor}">
        {{ config.title }}
      </h4>
      <div ref="myChart" class="myChart" style="height:100%;" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/mixin/resize'
import chinaJson from '@/utils/china.js'

export default {
  mixins: [resize],
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    config: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.myChart)
      echarts.registerMap('china', chinaJson)
      this.setOptions()
    },
    convertData() {
      const geoCoordMap = [
        { name: '台湾省', value: 1000 },
        { name: '黑龙江省', value: 80 },
        { name: '内蒙古自治区', value: 110 },
        { name: "吉林省", value: 2584 },
        { name: '北京市', value: 116 },
        { name: "辽宁省", value: 1216 },
        { name: "河北省", value: 12 },
        { name: "天津市", value: 12 },
        { name: "山西省", value: 12 },
        { name: "陕西省", value: 12 },
        { name: "甘肃省", value: 12 },
        { name: "宁夏回族自治区", value: 12 },
        { name: "青海省", value: 12 },
        { name: "新疆维吾尔自治区", value: 12 },
        { name: "西藏自治区", value: 12 },
        { name: "四川省", value: 12 },
        { name: "重庆省", value: 12 },
        { name: "山东省", value: 12 },
        { name: "河南省", value: 12 },
        { name: "江苏省", value: 12 },
        { name: "安徽省", value: 12 },
        { name: "湖北省", value: 12 },
        { name: "浙江省", value: 12 },
        { name: "福建省", value: 12 },
        { name: "江西省", value: 12 },
        { name: "湖南省", value: 12 },
        { name: "贵州省", value: 12 },
        { name: "云南省", value: 12 },
        { name: "广东省", value: 12 },
        { name: "广西壮族自治区", value: 12 },
        { name: "海南省", value: 12 },
        { name: '上海市', value: 12 },
        { name: '香港', value: 12 },
        { name: '澳门', value: 12 }
      ]
      return geoCoordMap
    },
    setOptions() {
      this.chart.setOption({
        visualMap: {
          left: 'left',
          bottom: 'bottom',
          max: 1000,
          textStyle: {
            color: '#fff'
          },
          inRange: {
            color: ['#F4E9E7', '#F12B07']
          },
          text: ['高', '低']
        },
        geo: {
          map: 'china',
          show: true,
          roam: true,
          zoom: 1.4,
          top: 40,
          aspectScale: 0.9,
          boundingCoords: [0, 0],
          label: {
            normal: {
              show: true
            }
          },
          emphasis: {
            itemStyle: {
              areaColor: '#0a2dae',
              color: '#070B1F'
            },
            label: {
              normal: {
                show: true
              }
            }
          }
        },
        series: {
          type: 'map',
          map: 'china',
          name: this.config.title,
          geoIndex: 0,
          data: this.convertData()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/chart.scss';
</style>
