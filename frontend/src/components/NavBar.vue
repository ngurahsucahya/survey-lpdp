<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">
        <img src="@/assets/logo.png" alt="LPDP Logo" />
      </div>
      <button class="hamburger" @click="toggleMenu" aria-label="Toggle Menu">
        ☰
      </button>
      <div :class="['nav-links', { open: isMenuOpen }]">
        <router-link to="/" @click="closeMenu">Home</router-link>
        <router-link to="/faq" @click="closeMenu">FAQ</router-link>
        <router-link to="/guideline" @click="closeMenu">Guideline</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #e7e4dc;
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 1000; /* Pastikan navbar berada di atas konten lain */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Tambahan bayangan agar terlihat menonjol */
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
}

.logo img {
  height: 50px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
}

.hamburger {
  display: none;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-links a {
  text-decoration: none;
  color: #000000;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #ed722e;
}

/* Responsive styles */
@media (max-width: 768px) {
  .hamburger {
    display: block;
    color: #000;
  }

  .nav-links {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    background-color: #e7e4dc;
    display: none;
    margin-top: 15px;
    padding: 10px 0;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links a {
    padding: 10px 20px;
    width: 100%;
  }
}
</style>
