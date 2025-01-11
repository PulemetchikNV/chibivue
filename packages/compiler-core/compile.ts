import {baseParse} from "./parse";
import {generate} from "./codegen";

export function baseCompile(template: string) {
	console.log({template})
	const parseResult = baseParse(template)
	const code = generate(parseResult)
	return code;
}