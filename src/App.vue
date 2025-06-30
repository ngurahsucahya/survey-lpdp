<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/survey">User Survey</router-link>
      <router-link to="/admin">Admin Survey</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

html,
body {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: #f4f6f8;
  min-height: 100vh;
  color: #2c3e50;
}

nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #e3fcef;
      color: #ed7020;
    }

    &.router-link-exact-active {
      background-color: #ed7020;
      color: #fff;
    }
  }
}
</style>
