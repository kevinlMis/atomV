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

export default {
  mixins: [resize],
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    },
    chartData: {
      type: Object,
      default() {
        return {
          nodes: [
            { name: '南通市大数据集团发展有限公司', category: '企业' },
            { name: '刘正午', category: '自然人' },
            { name: '南通文旅科技有限公司', category: '企业' },
            { name: '周剑飞', category: '自然人' },
            { name: '南通电子口岸有限公司', category: '自然人' },
            { name: '江苏海宇航务工程有限公司', category: '企业' },
            { name: '陈一彤', category: '自然人' },
            { name: '陈建', category: '自然人' },
            { name: '罗伯乐', category: '自然人' }
          ],
          links: [
            { source: '南通市大数据集团发展有限公司', target: '刘正午', name: '董事成员' },
            { source: '南通市大数据集团发展有限公司', target: '南通文旅科技有限公司', name: '下属子公司' },
            { source: '南通市大数据集团发展有限公司', target: '周剑飞', name: '董事成员' },
            { source: '南通电子口岸有限公司', target: '刘正午', name: '董事成员' },
            { source: '南通市大数据集团发展有限公司', target: '南通电子口岸有限公司', name: '下属子公司' },
            { source: '南通电子口岸有限公司', target: '江苏海宇航务工程有限公司', name: '下属子公司' },
            { source: '南通电子口岸有限公司', target: '陈一彤', name: '董事成员' },
            { source: '南通电子口岸有限公司', target: '陈建', name: '董事成员' },
            { source: '南通市大数据集团发展有限公司', target: '罗伯乐', name: '董事成员' }
          ]
        }
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
      this.setOptions()
    },
    setOptions() {
      this.chartData.nodes.forEach(node => {
        if (node.name === '南通市大数据集团发展有限公司') {
          node.symbolSize = 100
          node.itemStyle = {
            color: '#2BBB91'
          }
        }
      })
      this.chartData.links.forEach(link => {
        link.label = {
          align: "center",
          fontSize: 12
        };

        if (link.name === "法人") {
          link.lineStyle = {
            color: '#02A1D7'
          };
        } else if (link.name === "股东" || link.name === '董事成员') {
          link.lineStyle = {
            color: '#EA715B'
          };
        } else {
          link.lineStyle = {
            color: '#4D73F4'
          };
        }
      })
      const categories = [{
        name: '企业',
        itemStyle: {
          color: '#4D73F4'
        }
      },
      {
        name: '自然人',
        itemStyle: {
          color: '#EA715B'
        }
      }]
      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            return `${params.marker}${params.name}`
          }
        },
        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 58,
            roam: true,
            categories: categories,
            edgeSymbol: ["none", "arrow"],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 20
                },
                formatter(x) {
                  return x.data.name
                }
              }
            },
            label: {
              show: true,
              color: '#fff'
            },
            force: {
              repulsion: 2000,
              edgeLength: 80
            },
            data: this.chartData.nodes,
            links: this.chartData.links
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/chart.scss';
</style>
