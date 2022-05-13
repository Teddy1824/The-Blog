<template>
  <nav>
    <div class="nav-icon">
      <h2>Icon</h2>
    </div>
    <div class="nav-items">
      <a href="">
        <router-link :to="{ path: '/' }">Home</router-link>
      </a>
      <a href="">
        <router-link :to="{ path: '/signup' }">Sign Up</router-link>
      </a>
      <a href="" @click="logout()">
        <router-link :to="{ path: '/' }">Sign Out</router-link>
      </a>
    </div>
    <div class="mobile-nav">
      <button class="menu">
        <div class="bar"></div>
      </button>
    </div>
    <div class="mobile-nav-items">
      <a href="">
        <router-link :to="{ path: '/' }" class="mobile">Home</router-link>
      </a>

      <a href="">
        <router-link :to="{ path: '/signup' }" class="mobile"
          >Sign Up</router-link
        >
      </a>
      <a href="" @click="logout()">
        <router-link :to="{ path: '/' }" class="mobile">Sign Out</router-link>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      localStorage.clear();
      alert("User logged out");
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  min-height: 50px;
  background-color: #130f40;
  position: fixed;
  top: 0;
  z-index: 1;
}
.nav-icon {
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  gap: 1.5rem;
  margin-left: 1.5rem;
}
.nav-icon h2,
.nav-items a {
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  color: white;
}
.nav-items {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  gap: 1.5rem;
  margin-right: 1.5rem;
}
.menu,
.mobile-nav-items {
  display: none;
}
@media screen and (max-width: 600px) {
  nav {
    min-height: 35px;
  }
  .nav-items {
    display: none;
  }
  .nav-icon {
    display: none;
  }
  .mobile-nav {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    gap: 1.5rem;
    margin-right: 0.5rem;
  }
  .menu {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 25px;
    cursor: pointer;
    outline: none;
    appearance: none;
    background: none;
    border: none;
    z-index: 3;
    padding: 0;
    gap: 5px;
  }
  .mobile-nav-items {
    position: fixed;
    top: 0;
    right: -100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: 100%;
    background-color: #130f40;
    z-index: 2;
    transition: all 0.2s;
  }
  .mobile-nav-items a {
    text-decoration: none;
    font-size: 15px;
    font-weight: 700;
    color: white;
  }
  .mobile-nav-items.active {
    right: 0;
  }
  .menu .bar,
  .menu:before,
  .menu:after {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    background-color: white;
    transition: all 0.2s;
  }

  .menu.active:before {
    transform: rotate(45deg) translate(5.5px, 6px);
  }

  .menu.active:after {
    transform: rotate(-45deg) translate(5.5px, -6px);
  }

  .menu.active .bar {
    transform: translate(-25px, 0px);
    opacity: 0;
  }
}
</style>
