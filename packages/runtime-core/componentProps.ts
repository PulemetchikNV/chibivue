import {ComponentInternalInstance, Data} from "./component";
import {reactive} from "chibivue";
import {camelize, hasOwn} from "../shared/general";

export type Props = Record<string, PropOptions | null>

export type PropOptions<T = any> = {
	type?: PropType<T> | true | null
	required?: boolean
	default?: null | undefined | object
}

export type PropType<T> = {new (...args: any[]): T & {}}

export function initProps(
	instance: ComponentInternalInstance,
	rawProps: Data | null,
) {
	const props: Data = {}
	
	setFullProps(instance, rawProps, props)
	
	instance.props = reactive(props)
}

function setFullProps(
	instance: ComponentInternalInstance,
	rawProps: Data | null,
	props: Data,
){
	const options = instance.propsOptions
	
	if(rawProps) {
		for(let key in rawProps) {
			const value = rawProps[key]
			
			let camelKey
			if(options && hasOwn(options, (camelKey = camelize(key)))) {
				props[camelKey] = value
			}
		}
	}
}

export function updateProps(instance: ComponentInternalInstance, rawProps: Data | null) {
	const {props} = instance
	
	Object.entries(rawProps ?? {}).forEach(([key, value]) => {
		props[camelize(key)] = value
	})
}