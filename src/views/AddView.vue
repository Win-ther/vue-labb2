<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const form = reactive({
  name: '',
  description: '',
  completedBy: '',
  done: false
});
const validate = () => {
  let date = form.completedBy.split("-");
  let today = new Date();

  if (form.name.trim() === '') {
    alert("Title cannot be set as empty");
    return false;
  }
  if (form.description.trim() === '') {
    alert("Description cannot be set as empty");
    return false;
  }
  if (date[0] < today.getFullYear() ||
      (date[1] <= today.getMonth() && date[0] <= today.getFullYear()) ||
      (date[2] < today.getDate()) && date[0] <= today.getFullYear()) {
    alert("Deadline cannot be set before todays date!");
    return false;
  }
  return true;
}
const addTask = async () => {
  if (validate()) {
      await fetch(`http://localhost:5000/tasks/`, {
      method: 'POST',
      body: JSON.stringify(form)
    })    .then((response) => response.json())
          .then(data => router.push('/work/' + data.id))
          .catch(error => console.log('Error updating task', error));
  }
}
</script>

<template>
  <main>
    <section>
      <h2>Add Task</h2>

      <label for="name"><strong>Title:</strong></label>
      <input id="name" name="name" type="text" maxlength="30" v-model="form.name"/>

      <label for="description"><strong>Description:</strong></label>
      <textarea id="description" name="description" maxlength="3000" v-model="form.description"
                rows="5" cols="50"/>
      <label for="description"><strong>Deadline:</strong></label>
      <input type="date" v-model="form.completedBy"/>

      <button @click="addTask">Submit Task!</button>
    </section>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  min-height: 733px;
  background-color: rgb(255 237 213);
  align-items: center;
}

h2 {
  align-self: center;
}

section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 25px;
  padding: 20px 20px 20px 20px;
  align-self: center;
  align-items: stretch;

  box-shadow: 0 4px 4px 0 rgb(254 215 170), 0 6px 10px 0 rgb(254 215 170);
  border-radius: 7px;
  border: 1px solid rgb(124 45 18);

  color: rgb(124 45 18);
  background-color: rgb(255 247 237);
}

input {
  padding: 5px 10px 5px 10px;
  border-radius: 7px;
  border: 1px solid rgb(124 45 18);
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

button {
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 7px;
  border: 1px black solid;
  background-color: rgb(134 239 172);
}

button:hover {
  background-color: rgb(74 222 128);
}
</style>