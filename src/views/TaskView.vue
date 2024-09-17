<script setup>
import {reactive, onMounted} from "vue";
import {useRoute, RouterLink, useRouter} from "vue-router";

const taskId = useRoute().params.id;
const router = useRouter();

const state = reactive({
  task: {}
});
const toggleDone = async () => {
  state.task.done = state.task.done !== true;
  await fetch(`http://localhost:5000/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(state.task)
  }).catch(error => console.log('Error toggling done', error));
}
const deleteTask = async () => {
  const confirm = window.confirm("Are you 100% sure you want to delete this task?");
  if (confirm) {
    await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: 'DELETE'
    }).catch(error => console.log('Error deleting task', error))
        .finally(() => {
          router.push('/work');
        });
  }
}
onMounted(async () => {
  await fetch(`http://localhost:5000/tasks/${taskId}`)
      .then(response => response.json())
      .then(function (data) {
        state.task = data;
      }).catch(error => console.log('Error fetching data', error));
})
</script>

<template>
  <main>
    <header class="box" :class="{completed:state.task.done}">
      <h1>{{ state.task.name }}</h1>
    </header>
    <article class="box" :class="{completed:state.task.done}">
      <p>{{ state.task.description }}</p>
    </article>
    <aside class="box" :class="{completed: state.task.done}">
      <h3>Deadline: {{ state.task.completedBy }}</h3>
      <div><h2 v-if="state.task.done">Completed!</h2></div>
      <div class="buttons">
        <button class="updateButton" @click="toggleDone">Completed</button>
        <RouterLink :to="`/work/edit/${taskId}`" class="editButton" >Edit Task</RouterLink>
        <button class="deleteButton" @click="deleteTask">Delete Task</button>
      </div>
    </aside>
  </main>
</template>

<style scoped>
.completed {
  background-color: rgb(220 252 231);
}

.completed h3, .completed p, .completed h1 {
  text-decoration: line-through;
}

main {
  display: grid;
  grid-template-areas:
      "header header header header header header header header aside"
      "article article article article article article article article aside"
      "article article article article article article article article aside"
      "article article article article article article article article aside";
  flex-direction: column;
  min-height: 733px;
  background-color: rgb(255 237 213);
  align-items: center;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}

h1 {
  font-size: 50px;
  color: rgb(124 45 18);
}

p {
  font-size: 20px;
  font-weight: bold;
  color: rgb(124 45 18);
}

.box {
  display: flex;
  box-shadow: 0 4px 4px 0 rgb(254 215 170), 0 6px 10px 0 rgb(254 215 170);
  margin: 25px;
  padding: 0 20px 20px 20px;;
  border-radius: 7px;
  color: rgb(124 45 18);
  border: 1px solid rgb(124 45 18);
}

header {
  grid-area: header;
  align-self: start;
  align-items: center;
  justify-content: center;
  background-color: rgb(255 247 237);
}

article {
  grid-area: article;
  align-self: stretch;
  justify-self: stretch;
  align-items: start;
  justify-content: center;
  background-color: rgb(255 247 237);
}

aside {
  grid-area: aside;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  justify-self: center;
  background-color: rgb(255 247 237);
}

button {
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 7px;
  border: 1px black solid;
}
a, a:visited{
  text-decoration: none;
  border-radius: 7px;
  border: 1px black solid;
  font-size: 16px;
  font-weight: bold;
  padding: 12px;
  color: black
}
.buttons {
  display: grid;
  justify-self: end;
  grid-template-areas:
      "compButton editButton"
      "deleteButton deleteButton";
  gap: 10px;
}

.updateButton {
  grid-area: compButton;
  background-color: rgb(134 239 172);
}

.editButton {
  grid-area: editButton;
  background-color: rgb(254 240 138);
}

.deleteButton {
  grid-area: deleteButton;
  background-color: rgb(248 113 113);
}

.deleteButton:hover {
  background-color: rgb(239 68 68);
}

.editButton:hover {
  background-color: rgb(253 224 71);
}

.updateButton:hover {
  background-color: rgb(74 222 128);
}
</style>