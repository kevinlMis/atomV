<template>
  <div class="file-design">
    <div class="srecah-header">
      <el-input
        v-model="sreachVal"
        placeholder="搜索"
        prefix-icon="el-icon-search" />
    </div>
    <div class="file-config">
      <span class="title">{{ title }}</span>
      <div class="drop-down">
        <span class="shrink" />
        <span class="unfold" />
        <span class="add" />
      </div>

    </div>
    <div class="file-tree">
      <menu-tree
        v-for="(router,index) in treeArray" :key="index"
        :menu="router"
      />
    </div>
    <div class="page-config">
      <span class="border-config">设置</span>
      <li>
        <span>分辨率配置</span>
      </li>
    </div>
  </div>
</template>
<script>
import menuTree from '@/components/MenuTree'
export default {
  name: 'PageTreeFile',
  components: {
    menuTree
  },
  data() {
    return {
      sreachVal: '',
      title: 'SimpleReport',
      treeArray: [
        {
          "id": "URIER0001",
          "name": "Pages",
          "tag": "My Pages",
          "attrRelevance": "",
          "icon": "file-icons",
          "type": "folder",
          "describe": "My files",
          "children": [
            {
              "id": "URIER00022",
              "name": "projectIndex",
              "tag": "My Pages",
              "type": "html",
              "attrRelevance": "",
              "icon": "file-icons",
              "describe": "My files"
            },
            {
              "id": "URIER00023",
              "name": "projectIndex",
              "tag": "My Pages",
              "type": "html",
              "attrRelevance": "",
              "icon": "file-icons",
              "describe": "My files"
            }
          ]
        },
        {
          "id": "URIER030021",
          "name": "Pages",
          "tag": "My Pages",
          "attrRelevance": "",
          "icon": "file-icons",
          "type": "folder",
          "describe": "My files",
          "children": [
            {
              "id": "URIER002023",
              "name": "projectIndex",
              "tag": "My Pages",
              "type": "html",
              "attrRelevance": "",
              "icon": "file-icons",
              "describe": "My files"
            }
          ]
        },
        {
          "id": "URIER00036",
          "name": "Pages",
          "tag": "My Pages",
          "attrRelevance": "",
          "icon": "file-icons",
          "type": "folder",
          "describe": "My files",
          "children": [
            {
              "id": "URIER00027",
              "name": "projectIndex",
              "tag": "My Pages",
              "type": "html",
              "attrRelevance": "",
              "icon": "file-icons",
              "describe": "My files"
            }
          ]
        }
      ]
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style  lang="scss">

.file-design {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .file-config {
    width: 100%;
    height: 30PX;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    .title {
      width: 70%;
      display: inline-block;
      text-align: left;
      font-size: 12px;
      line-height: 30px;
      color: #999999;
      opacity: 0.8;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .drop-down {
      flex: 1;
      display: flex;
      justify-content: space-between;

      & > span {
        cursor: pointer;
      }

      .shrink {
        display: inline-block;
        width: 24PX;
        height: 100%;
        background: url(~@/assets/images/展开.png) no-repeat;
        background-position: center;
        background-size: 100%;
      }

      .unfold {
        display: inline-block;
        width: 24PX;
        height: 100%;
        margin:0px 3px 0px -3px;
        background: url(~@/assets/images/收缩.png) no-repeat;
        background-position: center;
        background-size: 100%;
        transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -webkit-transform:rotate(-90deg);
      }

      .add {
        display: inline-block;
        width: 19PX;
        height: 100%;
        background: url(~@/assets/images/新增.png) no-repeat;
        background-position: center;
        background-size: 100%;
      }
    }
  }

  .file-tree {
    flex: 1;
    padding: 10px 0;

  }

  .page-config {
    width: 100%;
    height: 50px;
    position: relative;
    padding: 5px 0;
    border-top: 1px solid rgba(255,255,255, 0.2);

    .border-config {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: -7px;
      text-align: center;
      color: rgba(255,255,255, 0.2);
      display: inline-block;
      width: 90px;
      height: 12px;
      font-size: 12px;
      background-color: #42474A;
    }

    li {
      width: 100%;
      height: 30px;
      line-height: 28px;
      margin-top: 10px;
      padding: 0px 30px;

      span {
         display: inline-block;
         display: flex;
         width: 100%;
         height: 100%;
         color: rgba(255,255,255, 0.6);;

         &::before {
            content: '';
            display: inline-block;
            width: 24PX;
            height: 100%;
            margin-right: 5px;
            background: url(~@/assets/images/设置.png) no-repeat;
            background-position: center;
            background-size: 100%;
         }
      }
    }
  }
}
</style>
