export default {
  props: {
    redirect_type: {
      default: ""
    },
    redirect_payload: Object
  },
  data() {
    return {
      URLRedirectPaser: {},
      redirect_types: {
        search: "search",
        add: "add",
        delete: "delete",
        update: "update",
        view: "view",
        workbench: "workbench"
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.URLRedirectPaser.hasOwnProperty("redirectFor" + vm.redirect_type)) {
        // 通过 `vm` 访问组件实例
        vm.getPayloadParserByType(vm.redirect_type)
      }
    })
  },
  methods: {
    async getPayloadParserByType() {
      if (this.URLRedirectPaser.hasOwnProperty("redirectFor" + this.redirect_type)) {
        await this.URLRedirectPaser["redirectFor" + this.redirect_type](this.redirect_payload)
      }
    },
    registerURLRedirectPaser(redirect_type, action) {
      let result = false;
      for (var type in this.redirect_types) {
        if (this.redirect_types[type] === redirect_type) {
          result = true
        }
      }
      if (result) {
        if (typeof action === 'function') {
          this.URLRedirectPaser["redirectFor" + redirect_type] = action
        } else {
          this.$message.warning("参数 action类型错误，必须为function")
          return
        }
      } else {
        this.$message.warning("redirect_type 未指定，必须为以下类型" + this.redirect_types.toString())
        return
      }
    },
    pathPayloadToProps(route) {
      var jsonObject = {}
      let propsJSON = ''
      const paramsJSON = JSON.stringify(route.params)
      const queryJSON = JSON.stringify(route.query)
      if (paramsJSON !== '{}' && queryJSON !== '{}') {
        propsJSON = JSON.stringify(route.params) + JSON.stringify(route.query).replace('}{', ',');
        if (route.params.hasOwnProperty("redirect_type")) {
          jsonObject.redirect_type = route.params.redirect_type
        }
        if (route.query.hasOwnProperty("redirect_type")) {
          jsonObject.redirect_type = route.query.redirect_type
        }
      } else if (paramsJSON !== '{}' && queryJSON === '{}') {
        if (route.params.hasOwnProperty("redirect_type")) {
          jsonObject.redirect_type = route.params.redirect_type
        }
        propsJSON = JSON.stringify(route.params);
      } else if (paramsJSON === '{}' && queryJSON !== '{}') {
        propsJSON = JSON.stringify(route.query);
        if (route.query.hasOwnProperty("redirect_type")) {
          jsonObject.redirect_type = route.query.redirect_type
        }
      } else {
        propsJSON = '{}'
      }
      jsonObject = JSON.parse(propsJSON)
      const redirect_payload = {}
      // this.redirect_payload = JSON.parse(propsJSON)
      for (var key in jsonObject) {
        if (key !== 'redirect_type') {
          if (key.indexOf('redirect_') !== -1) {
            redirect_payload[key.substring(key.indexOf('redirect_') + 9, key.length)] = jsonObject[key]
          }
        }
      }
      jsonObject.redirect_payload = redirect_payload
      return jsonObject
    }
  }
}
