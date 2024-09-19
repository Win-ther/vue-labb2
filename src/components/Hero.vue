<script setup>
import {computed, onMounted, reactive} from "vue";

const state = reactive({
  user: {},
})
const isDefaultName = (computed(() => {
  const name = ""+state.user.name;
  return name.toLowerCase() === "default" || name.trim() === "" || name.toLowerCase() === "unknown";
}))
const changeName = () =>{
  let name = prompt("Enter your name", state.user.name);
  if (validateName(name)) {
    state.user.name = name.trim();
    handleNamechange();
  }
}
const validateName = (name) => {
  if (name === null || name === state.user.name) {
    alert("Name change cancelled.");
    return false;
  }else if(!name.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)
      || name.trim()===""){
    alert("Please enter a valid name.")
    return false;
  }
  return true;
}
const handleNamechange = async() => {
  await fetch('http://localhost:5000/user',{
    method: 'PUT',
    body: JSON.stringify(state.user)
  })
}
onMounted(async () => {
  await fetch('http://localhost:5000/user')
      .then(response => response.json())
      .then(function (data) {
        state.user = data;
      }).catch(error => console.log('Error fetching user data', error));
})
</script>

<template>
  <main>
    <header><h1>Work Schedule</h1></header>
    <article>
      <div class="subheader">
        <h2>Welcome&nbsp;</h2>
        <h2 class=name :class="{noname:isDefaultName}" @click="changeName"> {{ state.user.name }} </h2>
        <div>&nbsp;&nbsp;&nbsp;</div>
        <p v-if="isDefaultName"><i class="pi pi-arrow-left"></i>&nbsp;Click on {{state.user.name}} to change name</p>
      </div>
      <h3>Here you can view your tasks and add additional tasks for you to keep track of.</h3>
    </article>
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  height: 300px;
  background-color: rgb(74 222 128);
}
.subheader {
  display: flex;
  flex-wrap: wrap;
}

article {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 50px;
  margin-top: 75px;
  border-bottom: 2px rgb(22 163 74) solid;
}

h2{
  margin-top: -10px;
}
p{
  margin-top: -5px;
  text-decoration: underline;
  font-weight: bold;
  color: rgb(153 27 27);
}
h3 {
  margin-top: -5px;
}

h1, h2, h3 {
  color: rgb(22 101 52);
}
.subheader {
  display: flex;
}
.noname {
  color: rgb(153 27 27);
}
.name{
  cursor: pointer;
}
@media (max-width: 700px) {
  h1{
    font-size: 40px;
  }
  h2{
    font-size: 20px;
  }
  h3{
    font-size: 17px;
    justify-content: center;
    align-items: center;
  }
  article{
    margin: 10px;
  }
  .subheader {
    justify-content: center;
  }
}
@media (max-width: 420px) {
  h2{
    font-size: 17px;
  }
  h3{
    font-size:15px;
  }
  p{
    font-size: 13px;
  }
}
</style>