/* @flow */

import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
// 所谓modules就是为DOM节点的一些属性定义的钩子函数
const modules = platformModules.concat(baseModules)

// 不同平台都通过createPatchFunction函数生成__patch__方法
// 区别是引入的nodeOps（操作平台DOM的基本方法，比如说web的removeChild）、modules（不同平台的一些模块，用来触发不同阶段的钩子函数）的不同
export const patch: Function = createPatchFunction({ nodeOps, modules })
