<script setup>
import {RouterLink} from 'vue-router';
</script>

<template>
  <main>
    <h3>Created by Emil Winther &copy; 2024</h3>
    <div class="links">
      <p><RouterLink to="/">Home</RouterLink></p>
      <p><RouterLink to="/work">Work</RouterLink></p>
      <p><RouterLink to="/work/add">Add Work</RouterLink></p>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-top: 2px rgb(22 163 74) solid;
  background-color: rgb(74 222 128);
}
.links {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  gap:10px;
}
a, a:visited {
  text-decoration: none;
  color: rgb(22 101 52);
}
p{
  margin:0;
}

</style>