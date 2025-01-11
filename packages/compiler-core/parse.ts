export const baseParse = (
	content: string
): {tag: string; props: Record<string, string>;textContent: string} => {
	console.log({content})
	const matched = content.match(/<(\w+)\s+([^>]*)>([^<]*)<\/\1>/)
	console.log({matched})
	if(!matched) return {tag: '', props: {}, textContent: ''}
	
	const [_, tag, attrs, textContent] = matched
	
	const props: Record<string, string> = {}
	attrs.replace(/(\w+)=["']([^"']*)["']/g, (_, key: string, value: string) => {
		props[key] = value
		return ''
	})
	
	return {tag, props, textContent}
}