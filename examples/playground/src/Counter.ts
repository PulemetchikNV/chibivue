import { reactive} from "chibivue";

export const CounterComponent = {
	props: { messageString: { type: String } },
	setup(props: {messageString: string}, {emit}: any) {
		const state = reactive({count: 1})
		
		const increment = () => {
			state.count += 1
		}
		const decrement = () => {
			state.count -= 1
		}
		
		return {
			state,
			increment,
			decrement,
		}
	},
	template: `
	<div>
		<p>count is {{state.count}}</p>
		<button @click="increment">increment</button>
		<button v-on:click="decrement">decr</button>
	</div>
	`
}