<template>
  <div class="box_wrap">
    <iframe ref="iframe" width="100%" height="100%" frameborder="no"
            :src="src" />
  </div>
</template>

<script>
export default {
  name: "Aqscframe",
  data() {
    return {
      src: ''
    }
  },
  mounted() {
    this.src = this.$route.query.url
    this.$nextTick(() => {
      this.iframeListener()
    })
  },
  methods: {
    iframeListener() {
      const dom = this.$refs.iframe
      const loadBack = function() {
        dom.removeEventListener("load", loadBack, true)
      }
      if (dom) {
        dom.addEventListener("load", loadBack, true)
      }
    }
  }
};
</script>
<style>
.box_wrap {
  width: 100%;
  height: 100%;
  margin:0px;
  overflow-x:auto;
  overflow-y:hidden;
}
iframe {
  overflow: auto;
  border: 0  none;
}
</style>
