import { ComponentOptions } from './componentOptions'
import {VNode, VNodeChild} from "./vnode";
import {ReactiveEffect} from "chibivue";
import {initProps, Props} from "./componentProps";
import {emit} from "./componentEmits";

export type Data = Record<string, unknown>

export interface ComponentInternalInstance {
  type: Component
  vnode: VNode
  subTree: VNode // old n1
  next: VNode | null // Old n2
  effect: ReactiveEffect
  render: InternalRenderFunction
  update: () => void // old updateComponent
  isMounted: boolean
  propsOptions: Props
  props: Data
  emit: (event: string, ...args: any[]) => void
	setupState: Data
}

export type InternalRenderFunction = {
  (ctx: Data): VNodeChild
}

export type Component = ComponentOptions

export function createComponentInstance(
  vnode: VNode
) {
  const type = vnode.type as Component
	
  // Everything is null because in original vue it is done so
  const instance: ComponentInternalInstance = {
    type,
    vnode,
    subTree: null!,
    next: null!,
    effect: null!,
    render: null!,
    update: null!,
    isMounted: false,
    propsOptions: type.props || {},
    props: {},
	  emit: null!,
	  setupState: {}
  }
	
	instance.emit = emit.bind(null, instance)

  return instance
}

// Compiler function registration
type CompileFunction = (template: string) => InternalRenderFunction
let compile: CompileFunction | undefined

export function registerRuntimeCompiler(_compile: any) {
	compile = _compile
}

// Component setup
export function setupComponent(instance: ComponentInternalInstance) {
	const {props} = instance.vnode
	initProps(instance, props)
	
	const component = instance.type as Component
	
	if (component.setup) {
		const setupResult = component.setup(
			instance.props,
			{
				emit: instance.emit,
			}
		) as InternalRenderFunction
		
		if(typeof setupResult === 'function') {
			instance.render = setupResult
		}else if(typeof setupResult === 'object' && setupResult !== null) {
			instance.setupState = setupResult
		}else{
		
		}
	}
	
	if(compile && !component.render) {
		const template = component.template ?? ''
		if(template) {
			instance.render = compile(template)
		}
	}
	
	// sfc
	const {render} = component
	if(render) {
		instance.render = render as InternalRenderFunction
	}
}