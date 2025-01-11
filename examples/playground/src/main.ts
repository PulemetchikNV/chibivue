import {createApp, h, reactive} from "chibivue";

const CounterComponent = {
	props: { messageString: { type: String } },
	setup(props: {messageString: string}, {emit}: any) {
		return () => h('div', {}, [
			h('p', [], [`message is ${props.messageString}`]),
			h('button', {onClick: () => emit('changeMessage')}, ['123']),
		])
	}
}

const app = createApp({
	setup() {
		const state = reactive({message: 'hello'})
		
		function changeMessage() {
			state.message += '!'
		}
		
		return ( ) => h('div', {}, [
			h(CounterComponent, {
				'message-string': state.message,
				'onChangeMessage': changeMessage,
			},
			[]
			),
		])
	}
})

app.mount('#app')
