### 一、路由跳转参数传递 urlRedirectMixin （使用）
1、主动调用方

1.1 通过代码实现路由跳转
```js
/**
路由跳转时 会将参数的redirect_ 进行截图  取 redirect_后半部分  传递给目标页面
例如 redirect_test1   test1
**/
this.$router.push({ path: '/AQSC_JXGL274772155433054208/dqwhrw', query: { redirect_type:'search', redirect_test1: 'AAAAAAAAAAAAAA', redirect_test2: 'BBBBBBBBBBBBBBBBBB'}
this.$router.push({ path: '/AQSC_JXGL274772155433054208/dqwhrw?redirect_type=search&redirect_test1=AAAAAAAAAAAAAA&redirect_test2=BBBBBBBBBBBBBBBBBB' }
this.$router.push({ name: 'JhjxDqwhrwIndex', params: { redirect_type:'search',redirect_test1: 'AAAAAAAAAAAAAA',redirect_ test2: 'BBBBBBBBBBBBBBBBBB' }
```
1.2 通过菜单配置实现路由跳转
在菜单链接地址 追加参数

 /jhjx/views/ywdjcl/yqybjyrw?redirect_type=search&redirect_test1=AAAAAAAAAAAAAA&redirect_test2=BBBBBBBBBBBBBBBBBB

2、 接收方需要进行的操作
```js
/**
  引用mixin
**/
import urlRedirectMixin from '@/mixin/urlRedirectMixin.js'
mixins: [urlRedirectMixin]
```
```js
/**
调用registerURLRedirectPaser 注册语义对应的方法  写在created里面 (主要告诉路由调用方当前功能提供什么方法)
当调用方传递跳转后执行 将参数传递给指定的方法并执行方法
引入mixin this.redirect_types 可以获取到 相应的解析器类型
this.search、this.view为接收方定义的方法
调用方调用成功后 将 redirect_payload（即路由携带的参数）传给注册的方法
**/
// 引入urlRedirectMixin后可以访问this.redirect_types，this.search是function，并以跳转语义的payload为参数
this.registerURLRedirectPaser(this.redirect_types.search, this.search)
this.registerURLRedirectPaser(this.redirect_types.view, this.view)
```

### 路由跳转逻辑实现方式(了解)
1、路由挂载代码
```js
import urlRedirectMixin from '@/mixin/urlRedirectMixin.js'
const urlRedirectMixins = {
  methods: urlRedirectMixin.methods
}
tmp.props = function(route) {
        return urlRedirectMixins.methods.pathPayloadToProps(route)
      }
```
2、组件路由守卫
```js
/**
  组件路由守卫，用于执行路由跳转后注册的方法
  **/
  beforeRouteEnter(to, from, next){
      next(vm => {
        // 通过 `vm` 访问组件实例
        vm.getPayloadParserByType(vm.redirect_type)  // 根据语义执行方法
      })
    }
  ```
  
  
### 二、Toolbar上多个form内元素对齐脚本使用

1、引用
```js
import tableHeight from '@/mixin/tableHeight'
...
mixins: [tableHeight],
```

2、自传ref (类比页面上使用多个toolbar),使用以下方法再传一套ref
```js
<aqsc-layout class="aqscNormalbackgroundColor">
  <aqsc-toolbar-layout>
	<template v-slot:left>
	  <el-form ref="sourceForm" ...>    // 第一套 默认ref
	</template>
	<template v-slot:right ...>
  </aqsc-toolbar-layout>
</aqsc-layout>
<aqsc-layout class="aqscNormalbackgroundColor">
  <aqsc-toolbar-layout>
	<template v-slot:left>
	  <el-form ref="form1" label-width="80px" ...>    // 第二套 传进
	</template>
  </aqsc-toolbar-layout>
</aqsc-layout>
...
<aqsc-toolbar-query-panel ...>
  <template v-slot:condition>
	<el-form ref="aimForm" label-width="80px" ...>    // 第一套 默认ref
  </template>
</aqsc-toolbar-query-panel>
<aqsc-toolbar-query-panel ref="queryPane2" ...>
  <template v-slot:condition>
	<el-form ref="form2" label-width="80px" ...>    // 第二套 传进
  </template>
</aqsc-toolbar-query-panel>
...
  created() {
  ...
    this.changeHeight(0);
    this.$nextTick(() => {
      this.formColWidthAuto("form1", "form2");
    });
  },
  mounted() {
  ...
    window.addEventListener('resize', () => {
      this.formColWidthAuto("form1", "form2");
    });
  },
  activated() {
  ...
    this.formColWidthAuto("form1", "form2");
  },
```

3、需要手动触发对齐时，手动调用formColWidthAuto方法
```js
handleSearchTap() {
  this.searchAlwaysOn = !this.searchAlwaysOn
  if (this.searchAlwaysOn) {
    this.moreTitle = '隐藏';
    this.moreIcon = 'aqsc-hide';
    this.$nextTick(() => {...})
    this.formColWidthAuto();    // 手动触发对齐
  } else {
    this.moreIcon = 'aqsc-eye';
    this.moreTitle = '更多';
    this.changeHeight(0);
  }
},
```

4、form内同时存在'不需要自适应宽度'和'需要自适应宽度'子节点
1).子节点可拆分时,直接拆分成2个form
```js
<aqsc-toolbar-query-panel v-show="searchAlwaysOn" ref="queryPanel">
  <template v-slot:condition>
	<el-form ref="aimForm" label-width="80px">
	  <el-row ...>
	</el-form>
	// 拆分form
	<el-form label-width="80px">
	  <el-row ...>
	  <el-row ...>
	</el-form>
  </template>
</aqsc-toolbar-query-panel>
```
2).单独条目不需要自适应宽度的,通过添加class处理
```js
<aqsc-toolbar-query-panel v-show="searchAlwaysOn" ref="queryPanel">
  <template v-slot:condition>
	<el-form ref="aimForm" label-width="80px">
	  <el-row>
		<el-col :span="7"...>
		<el-col :span="7"...>
		<el-col :span="10">
		  <el-form-item ... label-width="120px" class="form-col-width-no-atuo">     // 添加class，当前条目不再向上对齐宽度
			...
		  </el-form-item>
		</el-col>
	  </el-row>
	</el-form>
  </template>
</aqsc-toolbar-query-panel>
```

5、event

事件名 | 说明 | 参数
-| - | -
formColWidthAuto | 参数传入2个form的ref(默认值'sourceForm','aimForm')或form对象本身;以参数第一个form为准,对齐两个form的内容 | String/Object

### 三、Ecxel数据复制粘贴到el-table

1、引用部分
```js
...
import tableCFExcel from '@/mixin/tableCFExcel'

export default {
  name: "...",
  components: {....},
  mixins: [tableCFExcel],
  ...
```

2、传入目标table的ref值
```js
methods: {
    ...
    handleAddTap(tag) {
      ...
      this.aimTableRef = 'addGridTable';        // 需要复制excel数据到表格之前,将目标表格ref值赋值给aimTableRef, 默认为”gridtable”
      this.rowsEditTag = 'isEditTag';           // 需要复制的table的行 `<el-input v-if="!row.isEdit"` `<span v-if="row.isEdit"`, 默认为”isEdit”
    }
}
```

3、自动添加行的方法
开发人员复写tableCFExcelAddRow(),在excel复制的数据 超过table最大条数时达到自动添加行的效果。(默认的tableCFExcelAddRow()方法，不能保证新增行的行的序号、斑马线等的正确性)

4、demo

/src/views/samples/editgrid2.vue

### 四、el-table动态列展示/隐藏,列拖动

通过使用公共组件'aqsc-col-hid-tool'实现目标table动态列展示、隐藏、拖动功能

### 五、el-table表头拖动改变列宽(header-dragend事件)和列的minWidth属性兼容

1、引用
```js
import tableHeight from '@/mixin/tableHeight'
...
mixins: [tableHeight],
```

2、方法参数传入 目标table本身或者目标table的ref值 (该值默认为”gridtable”)
```js
<template>
      ...
      <el-table ref="gridtable" ... @header-dragend="dragColunsFunc">
      ...
</template>

methods: {
    ...
    dragColunsFunc(tag) {
      ...
      this.headerDragendFMW("gridtable");
    }
}
```

3、event

事件名 | 说明 | 参数
-| - | -
dragColunsFunc | 在列拖动改变宽度(resizable)之后调用;传入参数table本身或者table的ref;当宽度不合法时更正拖动之后列的最小宽度 | String/Object

4、demo

/src/views/samples/eltableDemo2.vue
