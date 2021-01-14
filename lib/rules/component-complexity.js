/**
 * @fileoverview Enforce consistent usage of destructuring assignment of props, state, and context.
 */

'use strict';

const lodash = require('lodash');
const astUtils = require('eslint/lib/rules/utils/ast-utils');
const Components = require('eslint-plugin-react/lib/util/Components')

module.exports = {
  meta: {
    type: 'Suggestion',
    docs: {
      description: 'Check for complexity in functions that return JSX',
      category: 'Best Practices',
      recommended: false
    },
    schema: [
      {
        oneOf: [
          {
            type: 'integer',
            minimum: 0
          },
          {
            type: 'object',
            properties: {
              maximum: {
                type: 'integer',
                minimum: 0
              },
              max: {
                type: 'integer',
                minimum: 0
              }
            },
            additionalProperties: false
          }
        ]
      }
    ],

    messages: {
      complex: '{{name}} has a complexity of {{complexity}}. Maximum allowed is {{max}}.'
    }
  },

  create: Components.detect((context, components) => {
    // configurations
    const option = context.options[0];
    let THRESHOLD = 14;

    if (
      typeof option === 'object'
            && (Object.prototype.hasOwnProperty.call(option, 'maximum') || Object.prototype.hasOwnProperty.call(option, 'max'))
    ) {
      THRESHOLD = option.maximum || option.max;
    } else if (typeof option === 'number') {
      THRESHOLD = option;
    }

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    // Using a stack to store complexity (handling nested functions)
    const fns = [];

    /**
         * When parsing a new function, store it in our function stack
         * @param {ASTNode} node node to evaluate
         * @returns {void}
         * @private
         */
    function startFunction(node) {
      if (components.get(node)) {
        fns.push(1);
      }
    }

    /**
         * Evaluate the node at the end of function
         * @param {ASTNode} node node to evaluate
         * @returns {void}
         * @private
         */
    function endFunction(node) {
      if (components.get(node)) {
        const name = lodash.upperFirst(astUtils.getFunctionNameWithKind(node));
        const complexity = fns.pop();

        if (complexity > THRESHOLD) {
          context.report({
            node,
            messageId: 'complex',
            data: {name, complexity, max: THRESHOLD}
          });
        }
      }
    }

    /**
         * Increase the complexity of the function in context
         * @returns {void}
         * @private
         */
    function increaseComplexity() {
      if (fns.length) {
        fns[fns.length - 1] += 1;
      }
    }

    /**
         * Increase the switch complexity in context
         * @param {ASTNode} node node to evaluate
         * @returns {void}
         * @private
         */
    function increaseSwitchComplexity(node) {
      // Avoiding `default`
      if (node.test) {
        increaseComplexity();
      }
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {
      FunctionDeclaration: startFunction,
      FunctionExpression: startFunction,
      ArrowFunctionExpression: startFunction,
      'FunctionDeclaration:exit': endFunction,
      'FunctionExpression:exit': endFunction,
      'ArrowFunctionExpression:exit': endFunction,

      CatchClause: increaseComplexity,
      ConditionalExpression: increaseComplexity,
      LogicalExpression: increaseComplexity,
      ForStatement: increaseComplexity,
      ForInStatement: increaseComplexity,
      ForOfStatement: increaseComplexity,
      IfStatement: increaseComplexity,
      SwitchCase: increaseSwitchComplexity,
      WhileStatement: increaseComplexity,
      DoWhileStatement: increaseComplexity
    };
  })
};
