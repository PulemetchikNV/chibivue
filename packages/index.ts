import {InternalRenderFunction, registerRuntimeCompiler} from "./runtime-core/component";
import * as runtimeDom from './runtime-dom'
import {compile} from "./compiler-dom";

function compileToFunction(template: string): InternalRenderFunction {
	const code = compile(template)
	return new Function('Chibivue', code)(runtimeDom)
}
registerRuntimeCompiler(compileToFunction)

export * from './reactivity'
export * from './runtime-dom'
export * from './runtime-core'