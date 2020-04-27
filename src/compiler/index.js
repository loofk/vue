/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
// 这里处理的优秀之处在于Vue的编译过程在不同平台baseOptions是不一样的，使用函数柯里化的技巧让我们得以保存baseOptions并在同一平台时不需要每次都传入
// 真正执行编译template的函数baseCompile，一共干了三件事parse、optimize、generate
// parse函数将模板解析成AST（抽象语法树）
// optimize函数将AST进行优化
// generate函数将AST转化成render函数代码
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
