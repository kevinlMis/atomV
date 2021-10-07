import Vue from "vue";

/*
 * 触屏点击全局指令
 * 传参形式: v-touchTap:callbackName="paramId"
 * 不传参形式: v-touchTap="callbackName"
 */
Vue.directive('touchTap', {
  bind: function(el, binding, vnode) {
    const callback = binding.value
    const that = vnode.context
    if (el) {
      el.addEventListener("tap", (e) => {
        e = e || window.event;
        if (e && e.preventDefault && e.stopPropagation) {
          e.stopPropagation()
          e.preventDefault()
        } else {
          e.cancelBubble = true;
        }
        if (binding.arg) {
          that[binding.arg](callback)
        } else {
          callback()
        }
      })
    }
  }
});

/*
 * 触屏双击全局指令
 */
Vue.directive('touchDoubletap', {
  bind: function(el, binding, vnode) {
    const callback = binding.value
    const that = vnode.context
    if (el) {
      el.addEventListener("doubletap", (e) => {
        if (e && e.preventDefault && e.stopPropagation) {
          e.stopPropagation()
          e.preventDefault()
        }
        if (binding.arg) {
          that[binding.arg](callback)
        } else {
          callback()
        }
      })
    }
  }
});

/*
 * 触屏向左滑动全局指令
 */
Vue.directive('touchSwipeleft', {
  bind: function(el, binding, vnode) {
    const callback = binding.value
    const that = vnode.context
    if (el) {
      el.addEventListener("swipeleft", (e) => {
        if (e && e.preventDefault && e.stopPropagation) {
          e.stopPropagation()
          e.preventDefault()
        }
        if (binding.arg) {
          that[binding.arg](callback)
        } else {
          callback()
        }
      })
    }
  }
});

/*
 * 触屏向右滑动全局指令
 */
Vue.directive('touchSwiperight', {
  bind: function(el, binding, vnode) {
    const callback = binding.value
    const that = vnode.context
    if (el) {
      el.addEventListener("swiperight", (e) => {
        if (e && e.preventDefault && e.stopPropagation) {
          e.stopPropagation()
          e.preventDefault()
        }
        if (binding.arg) {
          that[binding.arg](callback)
        } else {
          callback()
        }
      })
    }
  }
});
