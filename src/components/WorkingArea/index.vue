<template>
  <div class="work-area">
    <div class="work-content">
      <draggable
        class="row-wrapper"
        handle=".move"
        :list="list"
        :group="{name: 'common'}"
        @change="setUniqueId"
      >
        <div
          v-for="(item, index) of list"
          :key="item.uniqueId"
          class="draggable-list move"
          style="position:relative;"
          :test="item.uniqueId"
        >
          <!--编辑、拖动、删除-->
          <handle-btn
            :show-edit="false"
            :index="index"
            @handleRemoveClick="handleRowRemoveClick"
          />

          <!--组件托放点-->
          <component
            :is="item.component"
            :cols="item.cols"
            :row-name="item.type"
            @handleRowRemoveClick="handleRowRemoveClick"
          />
        </div>
      </draggable>
    </div>
    <div class="work-operation">
      <span v-for="(item, index) in viewsList" :key="index" :class="[viewId === index ? 'actived-cl' : '']" @click="handleViews(index)">{{ item }}</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Draggable from "vuedraggable";
import HandleBtn from "@/components/HandleBtn";
import store from "@/store";
export default {
  name: "WorkingArea",
  components: {
    Draggable,
    HandleBtn
  },
  data() {
    return {
      list: [],
      viewsList: ['模型视图', '样式代码', 'js代码', 'vue代码'],
      viewId: 0
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
    list: {
      handler: function(val, oldVal) {
        console.log('val===', val, oldVal, this.list)
      },
      immediate: true
    }
  },
  methods: {
    // 移除row
    handleRowRemoveClick({ index }) {
      this.list.splice(index, 1);
    },
    setUniqueId(evt) {
      console.log('res', evt)
      if (evt.added) {
        evt.added.element.uniqueId = Date.now();
      }
    },
    handleViews(id) {
      this.viewId = id
    }
  }
};
</script>

<style lang="scss" scoped>
 .work-area {
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-between;

  .work-operation {
    width: 100%;
    height: 26px;
    line-height: 25px;
    display: flex;
    justify-content: flex-start;
    background-color: #F6F7FB;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    span {
      width: 70px;
      text-align: center;
      color: rgba(0, 0, 0, 0.7);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;

      &.actived-cl {
          background-color: rgba(255,255,255,0.99);
          border-right: 1px solid rgba(0, 0, 0, 0.2);
          border-left: 1px solid rgba(0, 0, 0, 0.2);
          color: #44ABF0;
      }
    }
  }

  .work-content {
    flex: 1;
    width: 100%;
    padding: 10px;
    position: relative;
     overflow: auto;

    .row-wrapper {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      padding: 5PX;

      .draggable-list {
        width: 100%;
      }
    }
  }
 }
</style>
