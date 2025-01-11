import {h, reactive} from "chibivue";
import {CounterComponent} from "./Counter";

export const AppComponent = {
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
}