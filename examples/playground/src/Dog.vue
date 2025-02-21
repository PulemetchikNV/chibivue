<script>
import {reactive} from "chibivue";

export default {
  setup() {
    const dog = reactive({
      name: 'spike',
      age: 4,
      color: 'black',
      barks: []
    })

    function bark() {
      dog.barks = [...dog.barks, 'GAAAV']
      setTimeout(() => {
        dog.barks.shift()
      }, 2500)
    }

    return {dog, bark}
  }
}
</script>

<template>
  <div class="dog-card">
    <h2>Dog card</h2>
    <ul>
      <li>name: {{dog.name}}</li>
      <li>age: {{dog.age}}</li>
      <li>color: {{dog.color}}</li>
      <li>{{dog.barks.join(', ')}}</li>
    </ul>
    <button @click="bark">
      bark
    </button>
  </div>
</template>

<style>
.dog-card {
  padding: 10px;
  border-radius: 5px;
  background: rgba(241, 74, 160, 0.49);
  margin-bottom: 20px;
}
</style>