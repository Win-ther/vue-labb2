<script setup>

</script>

<template>
  <main>
    <header><h1>Work Schedule</h1></header>
    <article>
      <h2>This Is The Work Schedule For Unknown.</h2>
      <h3>Here you can view your tasks and add additional tasks for you to do.</h3>
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
article {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
h1{
  font-size: 50px;
  margin-top: 75px;
  border-bottom: 2px rgb(22 163 74) solid;
}
h2{
  margin-top: -10px;
}
h3{
  margin-top: -5px;
}
h1,h2,h3{
  color: rgb(22 101 52);
}
</style>