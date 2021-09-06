// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    nw: 'nw',
    // require: global.require,
    process: 'process',
    Buffer: 'Buffer'
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0,
    "no-cond-assign": 2, // 禁止条件表达式中出现赋值操作符
    "no-constant-condition": 2, // 禁止在条件中使用常量表达式
    "semi": [2, "never"], // 语句强制分号结尾
    "comma-dangle": [2, "always-multiline"], // 对象字面量项尾不能有逗号
    "indent": [2, 2], // 缩进风格
    "no-empty": 2, // 禁止空语句块
    "no-dupe-keys": 2, // 禁止对象字面量中出现重复的 key
    "no-extra-parens": 0, //  禁止不必要的括号 //(a * b) + c;//报错
    "no-inner-declarations": [2, "functions"], // 禁止在嵌套的块中出现 function 或 var 声明
    "no-empty-function":2, // 禁止出现空函数.如果一个函数包含了一条注释，它将不会被认为有问题。
    "no-else-return": 0, // 禁止 if 语句中有 return 之后有 else
    "no-eval": 2, // 禁用 eval()
    "no-extend-native": 2, // 禁止扩展原生类型
    "no-extra-bind": 2, // 禁止不必要的 .bind() 调用
    "no-implicit-coercion":0, // 禁止使用短符号进行类型转换(!!fOO)
    "array-bracket-spacing": [2, "never"], // 禁止数组元素首尾有空格
  }
}
