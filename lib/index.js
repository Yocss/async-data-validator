var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value) }) }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected(value) { try { step(generator['throw'](value)) } catch (e) { reject(e) } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
// validate data
const validate = function(rules, form) {
  return __awaiter(this, void 0, void 0, function * () {
    const res = {
      status: true, infos: []
    }
    const ruleKeys = Object.keys(rules)
    for (let i = 0; i < ruleKeys.length; i++) {
      const val = form[ruleKeys[i]]
      const subRules = rules[ruleKeys[i]]
      switch (getType(subRules)) {
        case 'object': {
          const d = yield validRule(subRules, val, ruleKeys[i])
          if (!d.status) {
            res.infos.push({ message: d.message, field: d.key || '', value: val })
            res.status = false
          }
          break
        }
        case 'array': {
          for (let j = 0; j < subRules.length; j++) {
            const d = yield validRule(subRules[j], val, ruleKeys[i])
            if (!d.status) {
              res.status = false
              res.infos.push({
                value: val,
                message: d.message,
                field: d.key || ''
              })
              break
            }
          }
          break
        }
      }
    }
    return res
  })
}
// validate single rule
function validRule(rule, val, key) {
  return __awaiter(this, void 0, void 0, function * () {
    // const aRule = Object.keys(rule)
    const res = { status: true, message: '', key }
    // 1. 取值的类型
    const valType = getType(val)
    // 2. 所有校验规则
    const k = Object.keys(rule)
    for (let i = 0; i < k.length; i++) {
      // 规则字段是在支持的校验规则
      const ruleVal = rule[k[i]]
      let status = true
      res.message = rule.message
      // 支持的规则才继续运行
      const rules = ['required', 'len', 'min', 'max', 'enum', 'type', 'pattern', 'validator']
      if (rules.includes(k[i])) {
        // 1. 字段是否为必需
        let isRequired = false
        // 2. 字段值是否为空
        const isNull = /^\s+$/.test(val) || ['', undefined, null].includes(val)
        if (k[i] === 'required' && ruleVal) {
          status = !isNull
          isRequired = ruleVal === true
        }
        if (!status) {
          res.status = status
          break
        }
        // 非必需 && 值为空，则跳过检查, 否则执行检查
        const pass = !isRequired && isNull
        // 检测其他校验条件
        switch (k[i]) {
          case 'len': {
            status = pass || val.length === ruleVal
            break
          }
          case 'min': {
            // 如果 val 是数字，则表示的是最小值, 当为字符串或 array 时表示长度最小值
            if (valType === 'number') {
              status = pass || val >= ruleVal
            } else {
              status = pass || val.length >= ruleVal
            }
            break
          }
          case 'max': {
            if (valType === 'number') {
              status = pass || val <= ruleVal
            } else {
              status = pass || val.length <= ruleVal
            }
            break
          }
          case 'enum': {
            status = pass || ruleVal.includes(val)
            break
          }
          case 'type': {
            status = pass || ruleVal.toLowerCase() === getType(val)
            break
          }
          case 'pattern': {
            const reg = new RegExp(ruleVal)
            status = pass || reg.test(val)
            break
          }
          case 'validator': {
            if (getType(ruleVal) === 'function') {
              status = yield ruleVal(val)
              break
            }
          }
        }
      }
      res.status = status
      if (!status) {
        break
      }
    }
    return res
  })
}
// return variable's type
function getType(val) {
  const t = Object.prototype.toString.call(val).slice(8, -1)
  return t.toLowerCase()
}
export default validate
