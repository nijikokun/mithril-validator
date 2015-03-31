var assert = require('assert')
var m

beforeEach(function () {
  m = require('../mithril.validator.js')(require('mithril'))
})

describe('m.validator', function () {
  it('should properly load itself onto mithril', function () {
    assert(m.validator)
  })

  it('should properly create an instance', function () {
    assert(typeof new m.validator().errors === 'object')
  })

  it('should properly pass values to validators', function (done) {
    var validator = new m.validator({
      name: function (name) {
        assert(name === 'nijikokun')
        done()
      }
    })

    validator.validate({
      name: 'nijikokun'
    })
  })

  it('should properly report error count', function () {
    var validator = new m.validator({
      name: function (name) {
        return 'problems officer?'
      }
    })

    validator.validate({
      name: 'nobody'
    })

    assert(validator.hasErrors() === 1)
  })

  it('should properly store validation results', function () {
    var validator = new m.validator({
      name: function (name) {
        return 'problems officer?'
      }
    })

    validator.validate({
      name: 'nobody'
    })

    assert(validator.hasError('name') === 'problems officer?')
  })

  it('should properly clear errors', function () {
    var validator = new m.validator({
      name: function (name) {
        return 'problems officer?'
      }
    })

    validator.validate({
      name: 'nobody'
    })

    assert(validator.hasErrors() === 1)
    validator.clearErrors()
    assert(validator.hasErrors() === 0)
  })

  it('should support missing values', function () {
    var validator = new m.validator({
      name: function (name) {
        return 'problems officer?'
      }
    })

    validator.validate({})

    assert(validator.hasErrors() === 1)
  })

  it('should support m.prop values', function (done) {
    var validator = new m.validator({
      name: function (name) {
        assert(name === 'testing')
        done()
      }
    })

    validator.validate({
      name: m.prop('testing')
    })
  })
})
