import { RendererOptions } from "../runtime-core";
import { patchEvent } from "./modules/events";
import { patchAttr } from "./modules/attrs";
type DOMRendererOptions = RendererOptions<Node, Element>

const onRe = /^on[^a-z]/
export const isOn = (key: string) => onRe.test(key);

export const patchProp: DOMRendererOptions['patchProp'] = (el, key, value) => {
    if(isOn(key)) {
        patchEvent(el, key, value)
    } else {
       patchAttr(el, key, value)  
    }
}

