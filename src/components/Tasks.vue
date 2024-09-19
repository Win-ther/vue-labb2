<script setup>
import {computed, defineProps, onMounted, reactive} from "vue";
import Task from "@/components/Task.vue";
import {RouterLink} from "vue-router";

const props = defineProps({
  limit: Number,
});
const state = reactive({
  tasks: [],
  showCompleted: false,
});

const showTasks = computed(() => {
  let filteredTasks = state.tasks.sort((a, b) => {

    const deadlineA = a.completedBy;
    const deadlineB = b.completedBy;
    if (deadlineA < deadlineB) {
      return -1;
    }
    if (deadlineA > deadlineB) {
      return 1;
    }
    return 0;
  });
  if (state.showCompleted === false) {
    filteredTasks = state.tasks.filter(task => task.done === false);
  }
  return filteredTasks.slice(0, props.limit || state.tasks.length)
})
onMounted(async () => {
  await fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(function (data) {
        state.tasks = data;
      }).catch(error => console.log('Error fetching data',error));

})
</script>

<template>
  <main>
    <h1>Browse Current Tasks</h1>
    <label class="switch">
      <input type="checkbox" v-model="state.showCompleted"/>
      <span class="slider round"></span>
    </label>
    <div class="grid">
      <Task v-for="task in showTasks" :key=task :task="task"/>
    </div>
    <RouterLink v-if="props.limit" to="/work">See All Tasks</RouterLink>
  </main>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

main {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  min-height: 733px;
  background-color: rgb(255 237 213);
}

h1 {
  font-size: 50px;
  margin-top: 75px;
  border-bottom: 2px rgb(124 45 18) solid;
  color: rgb(124 45 18);
}

a, a:visited {
  text-decoration: none;
  color: rgb(124 45 18);
  border: 2px rgb(124 45 18) solid;
  padding: 10px;
  margin-top: 50px;
}

a:hover {
  background-color: rgb(254 215 170);
}

/*Slider and switch styling*/
.switch {
  position: relative;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(124 45 18);
  -webkit-transition: 0.8s;
  transition: 0.8s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: rgb(255 247 237);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: rgb(22 101 52);
}

input:focus + .slider {
  box-shadow: 0 0 3px black;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 15px;
}

.slider.round:before {
  border-radius: 40%;
}
@media (max-width: 700px) {
  .grid{
    display: flex;
    flex-direction: column;
  }
  h1{
    font-size: 40px;
  }
}
@media (max-width: 420px) {
  h1{
    font-size: 30px;
  }
}
</style>