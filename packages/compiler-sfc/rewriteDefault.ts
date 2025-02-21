import {parse} from '@babel/parser'
import MagicString from "magic-string";

const defaultExportRE = /((?:^|\n|;)\s*)export(\s*)default/
const namedDefaultExportRE = /((?:^|\n|;)\s*)export(.+)(?:as)?(\s*)default/s

export function rewriteDefault(input: string, as: string): string {
	if(!hasDefaultExport(input)) {
		return input + `\nconst ${as} = {}`
	}
	
	const s = new MagicString(input)
	const ast = parse(input, {
		sourceType: 'module'
	}).program.body
	
	ast.forEach(node => {
		if(node.type === 'ExportDefaultDeclaration') {
			// избавляемся от export default
			if(node.declaration.type === 'ClassDeclaration') {
				s.overwrite(node.start!, node.declaration!.id!.start!, `class `)
				s.append(`\nconst ${as} = ${node.declaration!.id!.name}`)
			}else {
				// `export default { setup() {}, }`  ->  `const ${as} = { setup() {}, }`
				s.overwrite(node.start!, node.declaration.start!, `const ${as} = `)
			}
		}
		if(node.type === 'ExportNamedDeclaration') {
			for(const specifier of node.specifiers) {
				if(
					specifier.type === 'ExportSpecifier' &&
					specifier.exported.type === 'Identifier' &&
					specifier.exported.name === 'default'
				) {
					if(node.source) {
						// `export { default } from "source";`  ->  `import { default as __VUE_DEFAULT__ } from 'source'; const ${as} = __VUE_DEFAULT__`
						if(specifier.local.name ==='default') {
							const end = specifierEnd(input, specifier.local.end!, node.end!)
							s.prepend(
								`import {default as __VUE_DEFAULT__} from '${node.source.value}'\n`
							)
							s.overwrite(specifier.start!, end, ``)
							s.append(`\nconst ${as} = __VUE_DEFAULT__`)
							continue
						}
						// export { hoge as default } from "source";`  ->  `import { hoge } from 'source'; const ${as} = hoge
						else{
							const end = specifierEnd(
								input,
								specifier.exported.end!,
								node.end!,
							)
							s.prepend(
								`import { ${ input.slice(
									specifier.local.start!,
									specifier.local.end!
								)} } from '${node.source.value}'\n`
							)
							
							s.overwrite(specifier.start!, end, ``)
							s.append(`\nconst ${as} = ${specifier.local.name}`)
							continue
						}
					}
					const end = specifierEnd(input, specifier.end!, node.end!)
					s.overwrite(specifier.start!, end, ``)
					s.append(`\nconst ${as} = ${specifier.local.name}`)
				}
			}
		}
	})
	
	return s.toString()
}

// Calculate the end of the declaration statement
function specifierEnd(input: string, end: number, nodeEnd: number | null) {
	// export { default   , foo } ...
	let hasCommas = false
	let oldEnd = end
	while (end < nodeEnd!) {
		if (/\s/.test(input.charAt(end))) {
			end++
		} else if (input.charAt(end) === ',') {
			end++
			hasCommas = true
			break
		} else if (input.charAt(end) === '}') {
			break
		}
	}
	return hasCommas ? end : oldEnd
}

export function hasDefaultExport(input: string): boolean {
	return defaultExportRE.test(input) || namedDefaultExportRE.test(input)
}