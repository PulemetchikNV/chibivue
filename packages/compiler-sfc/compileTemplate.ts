import {TemplateChildNode} from "../compiler-core/ast";

export interface TemplateCompiler {
	compile(template: string): string;
	parse(template: string): {children: TemplateChildNode[]};
}