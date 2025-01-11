import { ComponentOptions } from './componentOptions'
import {VNode, VNodeChild} from "./vnode";
import {ReactiveEffect} from "chibivue";
import {Props} from "./componentProps";
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
}

export type InternalRenderFunction = {
  (): VNodeChild
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
  }
	
	instance.emit = emit.bind(null, instance)

  return instance
}