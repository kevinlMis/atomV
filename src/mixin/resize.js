import { debounce } from '@/utils'

export default {
  data() {
    return {
      htmlFontSize: 0
    }
  },
  computed: {
    // 大屏  1920  ->  1rem = 192px  height = 370px 以此为基准
    // 中屏  1366  ->  1rem = 128px  height = ?px
    // 动态计算图表高度(px)   height = height / (192/htmlFontSize)
    // rem    height = height / htmlFontSize
    innerHeight() {
      if (this.config.height) {
        return (this.config.height / (192 / this.htmlFontSize)) / this.htmlFontSize + 'rem'
      } else {
        return (370 / (192 / this.htmlFontSize)) / this.htmlFontSize + 'rem'
      }
    },
    chartHeight() {
      if (this.config.height) {
        return ((this.config.height - 40) / (192 / this.htmlFontSize)) / this.htmlFontSize + 'rem'
      } else {
        return (330 / (192 / this.htmlFontSize)) / this.htmlFontSize + 'rem'
      }
    }
  },
  watch: {
    'config.height': {
      handler() {
        this._resizeHandler()
      }
    }
  },
  mounted() {
    this._getHtmlFontSize()
    this._resizeHandler = debounce((e) => {
      if (this.chart) {
        this.chart.resize()
      }
    })
    this._initResizeEvent()
  },
  beforeDestroy() {
    this._destroyResizeEvent()
  },
  methods: {
    _getHtmlFontSize() {
      const htmlFontSize = document.documentElement.style.fontSize.replace('px', '')
      this.htmlFontSize = htmlFontSize
    },
    _initResizeEvent() {
      window.addEventListener('resize', this._resizeHandler)
    },
    _destroyResizeEvent() {
      window.removeEventListener('resize', this._resizeHandler)
    }
  }
}
