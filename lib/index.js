var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        return __awaiter(this, void 0, void 0, function () {
            var res, ruleKeys, i, val, subRules, _a, d, j, flag, d;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        res = { status: true, infos: [] };
                        ruleKeys = Object.keys(rules);
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < ruleKeys.length)) return [3 /*break*/, 10];
                        val = form[ruleKeys[i]];
                        subRules = rules[ruleKeys[i]];
                        _a = getType(subRules);
                        switch (_a) {
                            case 'object': return [3 /*break*/, 2];
                            case 'array': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 9];
                    case 2: return [4 /*yield*/, validRule(subRules, val, ruleKeys[i])];
                    case 3:
                        d = _b.sent();
                        if (!d.status) {
                            res.infos.push({ message: d.message, field: d.key || '', value: val });
                            res.status = false;
                        }
                        return [3 /*break*/, 9];
                    case 4:
                        j = 0;
                        _b.label = 5;
                    case 5:
                        if (!(j < subRules.length)) return [3 /*break*/, 8];
                        flag = true;
                        return [4 /*yield*/, validRule(subRules[j], val, ruleKeys[i])];
                    case 6:
                        d = _b.sent();
                        if (!d.status) {
                            flag = false;
                            res.status = false;
                            res.infos.push({ message: d.message, field: d.key || '', value: val });
                            return [3 /*break*/, 8];
                        }
                        _b.label = 7;
                    case 7:
                        j++;
                        return [3 /*break*/, 5];
                    case 8: return [3 /*break*/, 9];
                    case 9:
                        i++;
                        return [3 /*break*/, 1];
                    case 10: return [2 /*return*/, res];
                }
            });
        });
    }
    exports.validate = validate;
    var rules = ['required', 'len', 'min', 'max', 'enum', 'type', 'pattern', 'validator'];
    function validRule(rule, val, key) {
        return __awaiter(this, void 0, void 0, function () {
            var aRule, res, valType, k, i, ruleVal, status_1, isRequired, notNull, _a, reg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        aRule = Object.keys(rule);
                        res = { status: true, message: '', key: key };
                        valType = getType(val);
                        k = Object.keys(rule);
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < k.length)) return [3 /*break*/, 12];
                        ruleVal = rule[k[i]];
                        status_1 = true;
                        res.message = rule.message;
                        if (!rules.includes(k[i])) return [3 /*break*/, 10];
                        isRequired = false;
                        notNull = !(['', undefined, null, NaN].includes(val));
                        if (k[i] === 'required' && ruleVal) {
                            isRequired = true;
                            status_1 = notNull;
                            if (!status_1) {
                                return [3 /*break*/, 12];
                            }
                        }
                        _a = k[i];
                        switch (_a) {
                            case 'len': return [3 /*break*/, 2];
                            case 'min': return [3 /*break*/, 3];
                            case 'max': return [3 /*break*/, 4];
                            case 'enum': return [3 /*break*/, 5];
                            case 'type': return [3 /*break*/, 6];
                            case 'pattern': return [3 /*break*/, 7];
                            case 'validator': return [3 /*break*/, 8];
                        }
                        return [3 /*break*/, 10];
                    case 2:
                        {
                            status_1 = notNull ? val.length === ruleVal : !isRequired;
                            return [3 /*break*/, 10];
                        }
                        _b.label = 3;
                    case 3:
                        {
                            // 如果 val 是数字，则表示的是最小值, 字符串及 array 是长度最小值
                            if (valType === 'number') {
                                status_1 = val >= ruleVal;
                            }
                            else {
                                status_1 = notNull ? val.length >= ruleVal : !isRequired;
                            }
                            return [3 /*break*/, 10];
                        }
                        _b.label = 4;
                    case 4:
                        {
                            if (valType === 'number') {
                                status_1 = val <= ruleVal;
                            }
                            else {
                                status_1 = notNull ? val.length <= ruleVal : !isRequired;
                            }
                            return [3 /*break*/, 10];
                        }
                        _b.label = 5;
                    case 5:
                        {
                            status_1 = notNull ? ruleVal.includes(val) : !isRequired;
                            return [3 /*break*/, 10];
                        }
                        _b.label = 6;
                    case 6:
                        {
                            status_1 = notNull ? ruleVal.toLowerCase() === getType(val) : !isRequired;
                            return [3 /*break*/, 10];
                        }
                        _b.label = 7;
                    case 7:
                        {
                            reg = new RegExp(ruleVal);
                            status_1 = notNull ? reg.test(val) : !isRequired;
                            return [3 /*break*/, 10];
                        }
                        _b.label = 8;
                    case 8:
                        if (!(getType(ruleVal) === 'function' && ruleVal && val)) return [3 /*break*/, 10];
                        return [4 /*yield*/, ruleVal()];
                    case 9:
                        status_1 = _b.sent();
                        return [3 /*break*/, 10];
                    case 10:
                        res.status = status_1;
                        if (!status_1) {
                            return [3 /*break*/, 12];
                        }
                        _b.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 1];
                    case 12: return [2 /*return*/, res];
                }
            });
        });
    }
    function getType(val) {
        var t = Object.prototype.toString.call(val).slice(8, -1);
        return t.toLowerCase();
    }
});
