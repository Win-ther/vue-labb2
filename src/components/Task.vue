<script setup>
import {defineProps, ref, computed} from 'vue'

const props = defineProps({
  task: Object
});

const toggleDone = () =>{
  props.task.done = props.task.done !== true;
}
</script>

<template>
  <section :class="{done: props.task.done === true}" @click="toggleDone">
      <h3> {{ props.task.name }}</h3>
      <p> {{ props.task.description }}</p>
      <p>DEADLINE: {{props.task.completedBy }}</p>
      <h4 v-if="props.task.done === true" :class="{completed: props.task.done === true}">Completed!</h4>
  </section>
</template>

<style scoped>
.done{
  background-color: rgb(220 252 231);
}
.done h3, .done p{
  text-decoration: line-through;
}
section {
  display: flex;
  flex-direction: column;
  width: 1fr;
  height: 300px;
  background-color: rgb(255 247 237);
  box-shadow: 0 4px 4px 0 rgb(254 215 170), 0 6px 10px 0 rgb(254 215 170);
  margin: 25px;
  border-radius: 7px;
  color: rgb(124 45 18);
  border: 1px solid rgb(124 45 18);
}
h3{
  align-self: center;
  margin: 15px;
  font-size: 25px;
  border-bottom: 1px solid rgb(124 45 18);
}
p, h4{
  align-self: center;
  font-size: 18px;
  font-weight: bold;
  margin: 15px;
}
input{
  padding: 5px;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>