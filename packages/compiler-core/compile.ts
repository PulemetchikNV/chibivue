import {baseParse} from "./parse";
import {generate} from "./codegen";

export function baseCompile(template: string) {
	const parseResult = baseParse(template)
	const code = generate(parseResult)
	return code;
}