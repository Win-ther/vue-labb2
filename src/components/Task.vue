<script setup>
import {computed, defineProps} from 'vue'
import {RouterLink} from "vue-router";

const props = defineProps({
  task: Object
});
const classObject = computed(() => ({
  done: props.task.done === true,
  // red: props.task.done === false,
}));

const toggleDone = async () => {
  props.task.done = props.task.done !== true;
  await fetch(`http://localhost:5000/tasks/${props.task.id}`, {
    method: 'PUT',
    body: JSON.stringify(props.task)
  }).catch(error => console.log('Error toggling done', error));
}

</script>

<template>
  <section :class="classObject" @click="toggleDone">
    <h3> {{ props.task.name }}</h3>
    <p v-if="props.task.description.length > 60"> {{ props.task.description.substring(0, 60) }}...</p>
    <p v-else> {{ props.task.description }}</p>
    <p>DEADLINE: {{ props.task.completedBy }}</p>
    <h4 v-if="props.task.done === true" >Completed!</h4>
    <RouterLink class="link" :to="'/work/'+props.task.id" @click.stop="">Read More</RouterLink>
  </section>
</template>

<style scoped>
.red{
  border: 1px solid red;
}
.done {
  background-color: rgb(220 252 231);
}

.done h3, .done p {
  text-decoration: line-through;
}

section {
  display: flex;
  flex-direction: column;
  width: 1fr;
  height: 270px;
  background-color: rgb(255 247 237);
  box-shadow: 0 4px 4px 0 rgb(254 215 170), 0 6px 10px 0 rgb(254 215 170);
  margin: 25px;
  border-radius: 7px;
  color: rgb(124 45 18);
  border: 1px solid rgb(124 45 18);
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}

h3 {
  align-self: center;
  margin: 15px;
  font-size: 25px;
  border-bottom: 1px solid rgb(124 45 18);
}

p, h4 {
  align-self: center;
  font-size: 18px;
  font-weight: bold;
  margin: 15px;
}

a, a:visited {
  text-decoration: none;
  color: rgb(124 45 18);
  align-self: center;
  margin-bottom: 10px;
  border: 1px rgb(124 45 18) solid;
  padding: 2px;
}

a:hover, a:active {
  background-color: rgb(254 215 170);
}

@media (max-width: 1600px) {
  section {
    height: 300px;
  }
}

@media (max-width: 1125px) {
  section {
    height: 325px;
  }

  h3 {
    font-size: 20px;
  }

  p, h4 {
    font-size: 18px;
  }
}

@media (max-width: 840px) {
  section {
    height: 360px;
  }
}

@media (max-width: 720px) {
  section {
    height: 450px;
  }
}
</style>