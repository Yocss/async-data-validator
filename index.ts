import { Validate, ValidRule, Rule } from './src/dto/type.dto'
// 表单校验
/**
 * @params {Object} rules { field: [{ required: true, message: '内容不能为空' }]}
 * @params {Object} form { field: 'john' }
 * @returns {Object} { status: true, infos: [] }
 */
export async function validate (rules: Object, form: Object): Promise<Validate> {
  const res = { status: true, infos: [] }
  const ruleKeys = Object.keys(rules)
  for (let i = 0; i < ruleKeys.length; i++) {
    const val = form[ruleKeys[i]]
    const subRules = rules[ruleKeys[i]]
    switch (getType(subRules)) {
      case 'object': {
        const d = await validRule(subRules, val, ruleKeys[i])
        if (!d.status) {
          res.infos.push({ message: d.message, field: d.key || '', value: val })
          res.status = false
        }
        break
      }
      case 'array': {
        for (let j = 0; j < subRules.length; j++) {
          let flag = true
          const d = await validRule(subRules[j], val, ruleKeys[i])
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
  }
  return res
}

const rules = ['required', 'len', 'min', 'max', 'enum', 'type', 'pattern', 'validator']

async function validRule(rule: Rule, val: any, key: string): Promise<ValidRule> {
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
      let isRequired = false
      // 检测字段是否必填
      const notNull = !(['', undefined, null, NaN].includes(val))
      if (k[i] === 'required' && ruleVal) {
        isRequired = true
        status = notNull
        if (!status) { break }
      }
      // 检测其他校验条件
      switch (k[i]) {
        // case 'required': {
        //   if (ruleVal) { status = val !== '' }
        //   break
        // }
        case 'len': {
          status = notNull ? val.length === ruleVal : !isRequired
          break
        }
        case 'min': {
          // 如果 val 是数字，则表示的是最小值, 字符串及 array 是长度最小值
          if (valType === 'number') {
            status = val >= ruleVal
          } else {
            status = notNull ? val.length >= ruleVal : !isRequired
          }
          break
        }
        case 'max': {
          if (valType === 'number') {
            status = val <= ruleVal
          } else {
            status = notNull ? val.length <= ruleVal : !isRequired
          }
          break
        }
        case 'enum': {
          status = notNull ? ruleVal.includes(val) : !isRequired
          break
        }
        case 'type': {
          status = notNull ? ruleVal.toLowerCase() === getType(val) : !isRequired
          break
        }
        case 'pattern': {
          const reg = new RegExp(ruleVal)
          status = notNull ? reg.test(val) : !isRequired
          break
        }
        case 'validator': {
          if (getType(ruleVal) === 'function' && ruleVal && val) {
            status = await ruleVal()
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
