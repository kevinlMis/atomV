<template>
  <el-row :gutter="20" class="row-position">
    <span>{{ rowName + '栅格' }}</span>
    <el-col v-for="(col,ind) of colsList"
            :key="ind"
            :md="col.col">
      <draggable class="content"
                 handle=".move"
                 :list="col.children"
                 :group="{name: 'common'}"
                 :move="handleDragForbidMove"
                 @change="setUniqueId"
      >
        <div v-for="(item,index) of col.children"
             :key="item.uniqueId"
             style="position:relative">
          <handle-btn :index="index"
                      :col-index="ind"
                      :show-edit="!!item.config"
                      @handleRemoveClick="handleChartRemoveClick"
                      @handleEditClick="handleEditClick" />
          <component
            :is="item.component"
            :row-name="item.type"
            :cols="item.cols"
            :config="item.config"
          />
        </div>
      </draggable>
    </el-col>
  </el-row>
</template>

<script>
import Draggable from 'vuedraggable'
import HandleBtn from '@/components/HandleBtn'

export default {
  components: {
    Draggable,
    HandleBtn
  },
  props: {
    cols: {
      type: Array,
      default() {
        return []
      }
    },
    rowName: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      colsList: this.cols,
      drawer: false,
      configInfo: {}
    }
  },
  watch: {
    'col.children': {
      handler: function(val, oldVal) {
        console.log('colsList===', val, oldVal, this.list)
      },
      immediate: true
    }
  },
  methods: {
    // 编辑操作
    handleEditClick({ index, colIndex }) {
      const item = this.colsList[colIndex].children[index]
      this.configInfo = item
      this.$eventBus.$emit('prototypeConfigEvent', item)
    },
    // 移除图表
    handleChartRemoveClick({ index, colIndex }) {
      this.colsList[colIndex].children.splice(index, 1)
    },
    // 保证图表只能放入row内
    handleDragForbidMove(evt) {
      if (evt.to.className === 'row-wrapper' && !evt.draggedContext.element.cols) {
        return false
      }
      return true
    },
    // 设置唯一id，否则排序有bug
    setUniqueId(evt) {
      console.log('add=', evt.added)
      if (evt.added) {
        evt.added.element.uniqueId = Date.now()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/row.scss';
::v-deep.el-drawer__wrapper .el-drawer {
  width: 30% !important;
}
@media screen and(max-width: 768px) {
  ::v-deep.el-drawer__wrapper .el-drawer {
    width: 80% !important;
  }
}

.row-position {
  position: relative;
  margin: 0;

  & > span {
    position: absolute;
    top: 0px;
    left: 0px;
    display: inline-block;
    min-width: 50px;
    height: auto;
    font-size: 12px;
    text-align: center;
    border-radius: 2PX;
    background-color: #409EFF;
    color: #FFFFFF;
  }
}

.el-row {
  width: 100%;
  margin: 0PX;
  margin-top: 10PX;
  margin-left: 0px !important;
  margin-right: 0px !important;
}

.el-row .el-col {
    min-height: 100PX;
    padding-top: 15PX;
    padding-bottom: 10PX;
    margin: 0PX;
    border-radius: 5PX;
    border: 1px dashed #409EFF;

    .content {
      height: 100%;
      width: 100%;

      & > div{
        height: 100%;
      }
    }
}

.chart-wrapper {
  height: 100%;
}
</style>
