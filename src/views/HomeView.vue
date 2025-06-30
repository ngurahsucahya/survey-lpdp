<template>
  <div class="home">
    <img alt="Logo LPDP" src="@/assets/logo_lpdp.png" class="logo" />
    <img alt="Logo IPB" src="@/assets/logo_ipb.jpg" class="logo" />
    <h1>Selamat Datang di Website Survei LPDP 2025</h1>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 0px 15px;
}

.logo {
  max-width: 400px;
  margin: 20px;
  height: 100px;
}

h1 {
  color: #333;
  margin-top: 20px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
}

p {
  color: #666;
  font-size: 18px;
  margin-top: 10px;
}
</style>
