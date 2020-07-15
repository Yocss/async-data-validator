const assert = require('assert')
// import { validate } from '../lib/index'
// const validate = require('../lib/index')
const mocha = require('mocha')
// import assert from 'assert'

const rule1 = {
  filed: [
    { required: true, message: '必填' }
  ]
}
const form1 = {
  field: ''
}

// console.log(validate(rule1, form1))

describe('Test validate func', function() {
//   it('1', async function() {
//     const { status, infos } = await validate(rule1, form1)
//     // should(status).be.equal(true)
    assert.strictEqual(true, true)
//   })
})
