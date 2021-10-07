/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  // 取消登陆名限制
  if (str) {
    return true;
  } else {
    return false;
  }
}

/**
 * 策略模式-表单校验
 * @param {Array} arg 配置检验策略
 * @returns {Object} paramObj 表单数据对象
 */
export function formValidation(arg, paramObj) {
  const config = arg || []
  paramObj = paramObj || {}

  this.verify = function() {
    let falg = false
    for (const i in config) {
      if (Object.prototype.hasOwnProperty.call(config, i)) {
        const key = config[i].key
        for (const n in paramObj) {
          if (paramObj.hasOwnProperty(n) && key === n) {
            const _fn = config[i].validate;
            falg = this[_fn](paramObj[n], config[i].msg)
            break;
          }
        }
        if (falg) {
          break;
        }
      }
    }
    return falg
  }
}

formValidation.prototype.isNumberForP = function(value, msg) {
  msg = msg || ''
  if (!/^[1-9]{0,9}[0-9]*([\.][0-9]{0,4})?$/.test(value)) {
    return new Error(`${msg}输入只能为整数或者小数4位，注意小数格式！`)
  } else {
    return false
  }
}
formValidation.prototype.isNumberTwoP = function(value, msg) {
  msg = msg || ''
  if (!/^[1-9]{0,9}[0-9]*([\.][0-9]{0,2})?$/.test(value)) {
    return new Error(`${msg}输入只能为整数或者小数2位，注意小数格式！`)
  } else {
    return false
  }
}
formValidation.prototype.isInteger = function(value, msg) {
  msg = msg || ''
  if (!/^[0-9]{0,10}$/.test(value)) {
    return new Error(`${msg}输入只能为整数，整数最多10位！`)
  } else {
    return false
  }
}
formValidation.prototype.isNumberd = function(value, msg) {
  msg = msg || ''
  if (value && value.length > 244) {
    return new Error(`${msg}输入最多为244个字符！`)
  } else {
    return false
  }
}

formValidation.prototype.isEmpty = function(value, msg) {
  msg = msg || ''
  if (!value) {
    return new Error(`${msg}输入不能为空！`)
  } else {
    return false
  }
}
