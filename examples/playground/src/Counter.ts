import {h} from "chibivue";

export const CounterComponent = {
	props: { messageString: { type: String } },
	setup(props: {messageString: string}, {emit}: any) {
		return () => h('div', {class: 'counter'}, [
			h('p', [], [`message is ${props.messageString}`]),
			h('button', {onClick: () => emit('changeMessage')}, ['1231']),
		])
	}
}