import fs from 'node:fs'
import {createFilter, Plugin, PluginOption} from "vite";
import {parse} from "../../compiler-sfc/parse";
import {compile} from "../../compiler-dom";
import {rewriteDefault} from "../../compiler-sfc/rewriteDefault";

export default function vitePluginChibivue(): PluginOption {
	const filter = createFilter(/\.vue$/)
	const isCss = (id: string) => id.match(/\.vue\.css$/)
	
	return {
		name: 'vite:chibivue',
		
		resolveId(id) {
	    if(isCss(id)) return id
		},
		load(id ) {
			if(isCss(id)) {
				const filename = id.replace(/\.css$/, '')
				const content = fs.readFileSync(filename, 'utf-8')
				const { descriptor } = parse(content, {filename})
				
				const styles = descriptor.styles.map(it => it.content).join('\n')
				return {code: styles}
			}
		},
		
		transform(code, id) {
			if (!filter(id)) return
			
			const outputs = []
			outputs.push("import * as Chibivue from 'chibivue'\n")
			outputs.push(`import '${id}.css'`)
			
			const { descriptor } = parse(code, { filename: id })
			
			const SFC_MAIN = '_sfc_main'
			const scriptCode = rewriteDefault(
				descriptor.script?.content ?? '',
				SFC_MAIN
			)
			outputs.push(scriptCode)
			
			const templateCode = compile(descriptor.template?.content ?? '', {
				isBrowser: false,
			})
			outputs.push(templateCode)
			
			outputs.push('\n')
			outputs.push(`export default { ...${SFC_MAIN}, render }`)
			
			return {code: outputs.join('\n')}
		}
	}
}