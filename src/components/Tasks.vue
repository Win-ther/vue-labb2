<script setup>
import {onMounted, reactive} from "vue";
import tasks from '@/tasks.json';
import Task from "@/components/Task.vue";
const state = reactive({
  tasks: tasks,
})
</script>

<template>
  <main>
    <h1>Browse Current Tasks</h1>
    <div class="grid">
    <Task v-for="task in state.tasks" :key=task :task="task"/>
    </div>
  </main>
</template>

<style scoped>
.grid{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
main {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  height: auto;
  background-color: rgb(255 237 213);
}

article {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

h1 {
  font-size: 50px;
  margin-top: 75px;
  border-bottom: 2px rgb(124 45 18) solid;
  color: rgb(124 45 18);
}

h2 {
  margin-top: -10px;
}

h3 {
  margin-top: -5px;
}

h2, h3 {
  color: rgb(22 101 52);
}
</style>