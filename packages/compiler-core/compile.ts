import {baseParse} from "./parse";
import {generate} from "./codegen";
import {CompilerOptions} from "./options";

export function baseCompile(template: string, option: Required<CompilerOptions>) {
	const parseResult = baseParse(template.trim()) // Trim the template
	
	const code = generate(parseResult, option)
	return code;
}