<template>
  <div id="app">
    <NavBar />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import FooterComponent from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    NavBar,
    FooterComponent,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  background-color: #fffcf4;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.router-view {
  flex: 1;
}
</style>
