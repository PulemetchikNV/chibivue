import {baseParse} from "./parse";
import {generate} from "./codegen";

export function baseCompile(template: string) {
	const parseResult = baseParse(template.trim()) // Trim the template
	console.log(
		'🚀 ~ file: compile.ts:6 ~ baseCompile ~ parseResult:',
		parseResult,
	)
	
	const code = generate(parseResult)
	return code;
}