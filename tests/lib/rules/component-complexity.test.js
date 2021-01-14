/**
 * @fileoverview Rule to enforce low complexity.
 */

'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/component-complexity');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('component-complexity', rule, {
  valid: [{
    code: 'const MyPlainFunction = () => \'hello\''
  }, {
    code: `const MyComplexFunction = () => {
      let name = Adam
      if (props.count === 1) {
        name = 'Foo'
      }
      if (props.count === 1) {
        name = 'Foo'
      }
      if (props.count === 1) {
        name = 'Foo'
      }
      if (props.count === 1) {
        name = 'Foo'
      }
      if (props.count === 1) {
        name = 'Foo'
      }
      if (props.count === 1) {
        name = 'Foo'
      }
      if (props.count === 1) {
        name = 'Foo'
      }
      if (props.count === 1) {
        name = 'Foo'
      }
      if (props.count === 1) {
        name = 'Foo'
      }
      if (props.count === 1) {
        name = 'Foo'
      }
      if (props.count === 1) {
        name = 'Foo'
      }
      if (props.count === 1) {
        name = 'Foo'
      }
      if (props.count === 1) {
        name = 'Foo'
      }
      if (props.count === 1) {
        name = 'Foo'
      }
      return name
    }`
  }],

  invalid: [{
    code: `function UseNegativeBuyingPowerCopy() {
      const phxUnifiedAccount = useModel({
        model: PHXUnifiedAccountsRecord,
      })
      const account = useWaitForAccount()
      const portfolio = useModel({
        model: PortfolioRecord,
        params: account
          ? {
              accountNumber: account.account_number,
            }
          : null,
      })
      if (Date.now() === 1) {
        console.warn('hello')
      }
      if (Date.now() === 1) {
        console.warn('hello')
      }
      if (Date.now() === 1) {
        console.warn('hello')
      }
      if (Date.now() === 1) {
        console.warn('hello')
      }
      if (Date.now() === 1) {
        console.warn('hello')
      }
      if (Date.now() === 1) {
        console.warn('hello')
      }
      if (Date.now() === 1) {
        console.warn('hello')
      }
      if (Date.now() === 1) {
        console.warn('hello')
      }
      if (Date.now() === 1) {
        console.warn('hello')
      }
      if (Date.now() === 1) {
        console.warn('hello')
      }
      if (Date.now() === 1) {
        console.warn('hello')
      }
      if (Date.now() === 1) {
        console.warn('hello')
      }
      if (Date.now() === 1) {
        console.warn('hello')
      }
      if (Date.now() === 1) {
        console.warn('hello')
      }
      if (Date.now() === 1) {
        console.warn('hello')
      }
      if (Date.now() === 1) {
        console.warn('hello')
      }
      if (Date.now() === 1) {
        console.warn('hello')
      }

      return (
        <NegativeBuyingPowerCopy
          negativeBuyingPowerCase={
            isLevel3
              ? NegativeBuyingPowerCase.NotNearMarginCallLevel3
              : NegativeBuyingPowerCase.NotNearMarginCallGold
          }
        />
      )
    }`,
    errors: [
      {message: `Function 'UseNegativeBuyingPowerCopy' has a complexity of 20. Maximum allowed is 14.`}
    ],
  }]
});
