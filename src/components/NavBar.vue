<script setup>
import {RouterLink} from 'vue-router';
</script>

<template>
  <main>
    <h1><RouterLink to="/">Work Schedule</RouterLink></h1>
    <div class="links">
      <h3><RouterLink to="/">Home</RouterLink></h3>
      <h3><RouterLink to="/work">Work</RouterLink></h3>
      <h3><RouterLink to="/work/add">Add Work</RouterLink></h3>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 2px rgb(22 163 74) solid;
  background-color: rgb(74 222 128);
}
main{

}
.links {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
  margin-right: 20px;
}

h1 {
  padding-left: 20px;
}

h3 a {
  padding: 10px;
  border: 2px rgb(22 163 74) solid;
  border-radius: 7px;
}

h3 a:hover {
  background-color: rgb(34 197 94);
}

a, a:visited {
  text-decoration: none;
  color: rgb(22 101 52);
}

</style>