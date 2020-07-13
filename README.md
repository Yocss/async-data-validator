# form data validator

# Installing
```bash
  npm i async-data-validator -S
```

# Usage
```javascript
import { validate } from 'async-data-validator'
const result = await validate(rules, form)
```

# Description
## 1. result

###  result：{ Promise\<Object\> }， result of validate

```javascript
{ status: true, infos: [] }
// or
{ status: false, infos: [...] }
```


## 2. params

### rules：{ Object }， rules of validate
```javascript
/**
ruleItem: {
  required?: boolean;
  len?: number;
  min?: number;
  max?: number;
  enum?: array<string>;
  type?: string;
  pattern?: regex;
  validator?: async function
 }
*/

// rules
{ field: Array<ruleItem> | ruleItem }

// example
{
  field1: [
    { required: true, message: "it's required" },
    { len: 4, message: "it's length not equal 4" }
  ],
  filed2: { type: 'number', message: "must be number" }
}
```

### form: { Object }, form data to validate

```javascript
{
  field1: 'abcd',
  field2: 123456
}
```