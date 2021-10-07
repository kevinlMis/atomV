/**
 * 封装构造函数栈
 * 场景:移动端返回操作路由记录
*/
function Stack() {
  this.items = [];
  // 压栈
  Stack.prototype.push = function(element) {
    return this.items.push(element)
  }
  // 出栈
  Stack.prototype.pop = function() {
    this.items.pop()
    return this
  }
  // 历史记录出栈
  Stack.prototype.hisPop = function() {
    if (this.items.length > 1) {
      return this.pop().items.pop()
    } else {
      return ''
    }
  }
  // 查看栈顶元素
  Stack.prototype.peek = function() {
    return this.items[this.items.length - 1]
  }
  // 判断栈是否为空
  Stack.prototype.isEmpty = function() {
    return this.items.length === 0
  }
  // 清空栈
  Stack.prototype.clear = function() {
    this.items = []
    return this.items.length === 0
  }
  // 获取栈中元素的个数
  Stack.prototype.size = function() {
    return this.items.length
  }
  // 字符串输出栈元素
  Stack.prototype.toString = function() {
    let str = '';
    for (let i = 0; i < this.items.length; i++) {
      str += this.items[i] + ' '
    }
    return str
  }
}

let stack
if (!stack) {
  stack = new Stack();
}

export default stack
