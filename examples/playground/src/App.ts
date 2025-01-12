import {h, reactive} from "chibivue";
import {CounterComponent} from "./Counter";
import {SomeText} from "./SomeText";
import {ComplexHTML} from "./ComplexHTML";

export const AppComponent = {
	setup() {
		const state = reactive({message: 'hello'})
		
		function changeMessage() {
			state.message += '!'
		}
		
		return ( ) => h('div', {class: 'app'}, [
			h(CounterComponent, {
					'message-string': state.message,
					'onChangeMessage': changeMessage,
				},
				[]
			),
			h(SomeText, {class: 'some-text'}, []),
			h(ComplexHTML, {}, [])
		])
	}
}