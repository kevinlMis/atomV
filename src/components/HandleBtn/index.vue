<template>
  <div class="tag-group">
    <el-tag v-if="showEdit" type="warning" title="编辑" size="small" class="edit" @click="handleEditClick">
      <i class="el-icon-edit-outline" />
    </el-tag>
    <el-tag type="info" size="small" title="拖动" class="move">
      <i class="el-icon-rank" />
    </el-tag>
    <el-tag type="danger" size="small" title="删除" class="remove" @click="handleRemoveClick">
      <i class="el-icon-circle-close" />
    </el-tag>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0
    },
    colIndex: {
      type: Number,
      default: 0
    },
    showEdit: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleRemoveClick() {
      this.$emit('handleRemoveClick', { index: this.index, colIndex: this.colIndex })
    },
    handleEditClick() {
      this.$emit('handleEditClick', { index: this.index, colIndex: this.colIndex })
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-group {
  position: absolute;
  top: -10PX;
  right: 5PX;
  z-index: 1;

  .el-tag {
    margin-left: 5PX;
    cursor: pointer;
    border-radius: 15PX;

    &.el-tag--small {
      width: 24PX;
      height: 24PX;
      padding: 0;
      display: inline;
      background-color:#409EFF;
      color: #ffffff;
    }

    i {
      font-size: 16PX;
      display: inline-block;
      margin: auto;

      &.el-icon-circle-close {
        font-size: 18px;
      }
    }
  }
}
</style>
