import {createApp, h, reactive} from "chibivue";

const app = createApp({
    setup() {
        const state = reactive({ count: 0 })
        const increment = () => {
            state.count++
        }

        const decrement = () => {
            state.count--
        }

        return function render( ) {
                return h('div', {}, [
                h('p', [], `Date1 is ${new Date().toString()}`),
                h('p', {style: 'color: red'}, [`count is: ${state.count}, and Date2 is ${String(new Date())}`]),
                h('button', {
                    onCLick: increment
                }, ['knopk0 dasdsa asd']),
                h('button', {
                    onClick: decrement
                }, ['decr'])
            ])
        }

    }

})

app.mount('#app')
