import { Validate, ValidRule, Rule } from './src/dto/type.dto'
// 表单校验
/**
 * @params {Object} rules { field: [{ required: true, message: '内容不能为空' }]}
 * @params {Object} form { field: 'john' }
 * @returns {Object} { status: true, infos: [] }
 */
export function validate (rules: Object, form: Object): Validate {
  const res = { status: true, infos: [] }
  const ruleKeys = Object.keys(rules)
  ruleKeys.forEach(k => {
    const val = form[k]
    const subRules = rules[k]
    switch (getType(subRules)) {
      case 'object': {
        const d = validRule(subRules, val, k)
        if (!d.status) {
          res.infos.push({ message: d.message, field: d.key || '', value: val })
          res.status = false
        }
        break
      }
      case 'array': {
        for (let i = 0; i < subRules.length; i++) {
          let flag = true
          const d = validRule(subRules[i], val, k)
          if (!d.status) {
            flag = false
            res.status = false
            res.infos.push({ message: d.message, field: d.key || '', value: val })
            break
          }
        }
        break
      }
    }
  })
  return res
}

const rules = ['required', 'len', 'min', 'max', 'enum', 'type', 'pattern', 'validator']

function validRule(rule: Rule, val: any, key: string): ValidRule {
  const aRule = Object.keys(rule)
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
    if (rules.includes(k[i])) {
      switch (k[i]) {
        case 'required': {
          if (ruleVal) { status = val !== '' }
          break
        }
        case 'len': {
          status = val.length === ruleVal
          break
        }
        case 'min': {
          // 如果 val 是数字，则表示的是最小值, 字符串及 array 是长度最小值
          if (valType === 'number') {
            status = val >= ruleVal
          } else {
            status = val.length >= ruleVal
          }
          break
        }
        case 'max': {
          if (valType === 'number') {
            status = val <= ruleVal
          } else {
            status = val.length <= ruleVal
          }
          break
        }
        case 'enum': {
          status = ruleVal.includes(val)
          break
        }
        case 'type': {
          status = ruleVal === getType(val)
          break
        }
        case 'pattern': {
          const reg = new RegExp(ruleVal)
          status = reg.test(val)
          break
        }
        case 'validator': {
          if (getType(ruleVal) === 'function' && ruleVal) {
            status = ruleVal()
            break
          }
        }
      }
    }
    res.status = status
    if (!status) { break }
  }
  return res
}

function getType (val: any): string {
  const t = Object.prototype.toString.call(val).slice(8, -1)
  return t.toLowerCase()
}