# Mithril Validator

Easily validate [Mithril.js][mithril] models, and objects.

[![version][npm-version]][npm-url]
[![License][npm-license]][license-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependencies][david-image]][david-url]

## Install

- Download [the latest package][download]
- NPM: `npm install mithril-validator`

## Setup

```js
var m = require('mithril')
require('mithril-validator')(m)
```

## Documentation

### new m.validator(validators) -> Validator

Validates mithril models and objects through validation functions mapped to specific model properties.

#### Example

```js
// Our mithril model
var Todo = function (data) {
  this.name = m.prop(data.name || '')
  this.done = m.prop(data.done)
}

// Initialize a new validator
var validator = new m.validator({

  // Check model name property
  name: function (name) {
    if (!name) {
      return "Name is required."
    }
  }

})

// Results in "Name is required."
validator.validate(new Todo()).hasError('name')
```

#### validator.hasErrors() -> Boolean

Returns length of error mapping

```js
if (validator.hasErrors()) {
  // do something
}
```

#### validator.hasError(key) -> Mixed

Returns the element associated with the specified key from the error mapping

```js
m('input', {
  // Set class to error when an error for this field has occurred
  // Trigger validator on submission or when a field changes
  class: ctrl.validator.hasError('name') ? 'error' : '',
  onchange: m.withAttr('value', ctrl.model.name),
  value: ctrl.model.name()
})
```

#### validator.clearErrors() -> void

Removes all of the elements from the error list.

```js
// Results in "Name is required."
validator.hasError('name')

validator.clearErrors()

// Results in undefined
validator.hasError('name')
```

#### validator.validate(model) -> Validator

Validates the specified model against the validations mapping in this instance.

Each (shallow) property is iterated over and cross-checked against the given model for value,
then the validation function is invoked passing the model as context and value as the first argument.

On a truthy result from a validation function the result is placed on the error object with the
property name as the identifier.

```js
validator.validate(new Todo())
```

**Note** Missing properties are treated as `undefined` and do not throw errors, you should do this yourself
within the property validator.

## License

Licensed under [The MIT License](LICENSE).

[license-url]: https://github.com/Nijikokun/mithril-validator/blob/master/LICENSE

[travis-url]: https://travis-ci.org/Nijikokun/mithril-validator
[travis-image]: https://img.shields.io/travis/Nijikokun/mithril-validator.svg?style=flat

[npm-url]: https://www.npmjs.com/package/mithril-validator
[npm-license]: https://img.shields.io/npm/l/mithril-validator.svg?style=flat
[npm-version]: https://img.shields.io/npm/v/mithril-validator.svg?style=flat
[npm-downloads]: https://img.shields.io/npm/dm/mithril-validator.svg?style=flat

[coveralls-url]: https://coveralls.io/r/Nijikokun/mithril-validator
[coveralls-coverage]: https://img.shields.io/coveralls/jekyll/jekyll.svg

[codeclimate-url]: https://codeclimate.com/github/Nijikokun/mithril-validator
[codeclimate-quality]: https://img.shields.io/codeclimate/github/Nijikokun/mithril-validator.svg?style=flat
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/Nijikokun/mithril-validator.svg?style=flat

[david-url]: https://david-dm.org/Nijikokun/mithril-validator
[david-image]: https://img.shields.io/david/Nijikokun/mithril-validator.svg?style=flat

[download]: https://github.com/Nijikokun/mithril-validator/archive/v1.0.0.zip
[mithril]: https://github.com/lhorie/mithril.js
[mithril-request]: http://lhorie.github.io/mithril/mithril.request.html
[mithril-request-signature]: http://lhorie.github.io/mithril/mithril.request.html#signature