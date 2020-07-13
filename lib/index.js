define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validate = void 0;
    // 表单校验
    /**
     * @params {Object} rules { field: [{ required: true, message: '内容不能为空' }]}
     * @params {Object} form { field: 'john' }
     * @returns {Object} { status: true, infos: [] }
     */
    function validate(rules, form) {
        var res = { status: true, infos: [] };
        var ruleKeys = Object.keys(rules);
        ruleKeys.forEach(function (k) {
            var val = form[k];
            var subRules = rules[k];
            switch (getType(subRules)) {
                case 'object': {
                    var d = validRule(subRules, val, k);
                    if (!d.status) {
                        res.infos.push({ message: d.message, field: d.key || '', value: val });
                        res.status = false;
                    }
                    break;
                }
                case 'array': {
                    for (var i = 0; i < subRules.length; i++) {
                        var flag = true;
                        var d = validRule(subRules[i], val, k);
                        if (!d.status) {
                            flag = false;
                            res.status = false;
                            res.infos.push({ message: d.message, field: d.key || '', value: val });
                            break;
                        }
                    }
                    break;
                }
            }
        });
        return res;
    }
    exports.validate = validate;
    var rules = ['required', 'len', 'min', 'max', 'enum', 'type', 'pattern', 'validator'];
    function validRule(rule, val, key) {
        var aRule = Object.keys(rule);
        var res = { status: true, message: '', key: key };
        // 1. 取值的类型
        var valType = getType(val);
        // 2. 所有校验规则
        var k = Object.keys(rule);
        for (var i = 0; i < k.length; i++) {
            // 规则字段是在支持的校验规则
            var ruleVal = rule[k[i]];
            var status_1 = true;
            res.message = rule.message;
            if (rules.includes(k[i])) {
                switch (k[i]) {
                    case 'required': {
                        if (ruleVal) {
                            status_1 = val !== '';
                        }
                        break;
                    }
                    case 'len': {
                        status_1 = val.length === ruleVal;
                        break;
                    }
                    case 'min': {
                        // 如果 val 是数字，则表示的是最小值, 字符串及 array 是长度最小值
                        if (valType === 'number') {
                            status_1 = val >= ruleVal;
                        }
                        else {
                            status_1 = val.length >= ruleVal;
                        }
                        break;
                    }
                    case 'max': {
                        if (valType === 'number') {
                            status_1 = val <= ruleVal;
                        }
                        else {
                            status_1 = val.length <= ruleVal;
                        }
                        break;
                    }
                    case 'enum': {
                        status_1 = ruleVal.includes(val);
                        break;
                    }
                    case 'type': {
                        status_1 = ruleVal === getType(val);
                        break;
                    }
                    case 'pattern': {
                        var reg = new RegExp(ruleVal);
                        status_1 = reg.test(val);
                        break;
                    }
                    case 'validator': {
                        if (getType(ruleVal) === 'function' && ruleVal) {
                            status_1 = ruleVal();
                            break;
                        }
                    }
                }
            }
            res.status = status_1;
            if (!status_1) {
                break;
            }
        }
        return res;
    }
    function getType(val) {
        var t = Object.prototype.toString.call(val).slice(8, -1);
        return t.toLowerCase();
    }
});
