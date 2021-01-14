# eslint-plugin-react-conventions

Some recommended conventions to enforce in react projects.

This borrows heavily from the work of the original [ESLint Complexity rule](https://eslint.org/docs/rules/complexity), as well as the component detection routines in [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react). This synthesizes their work.

Big thanks to them!

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-react-conventions`:

```
$ npm install eslint-plugin-react-conventions --save-dev
```


## Usage

Add `react-conventions` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "react-conventions"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "react-conventions/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





