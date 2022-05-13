<template>
  <div class="home-banner">
    <div class="mobile-banner-menu">
      <div class="menu">
        <div class="bar"></div>
      </div>
    </div>
    <div class="banner-search">
      <h2>Search</h2>
      <input
        type="text"
        v-model="search"
        name="search"
        placeholder="Search posts"
      />
    </div>

    <div class="banner-search make-button">
      <div class="banner-search">
        <h2>Search</h2>
        <input
          type="text"
          v-model="search"
          name="search"
          placeholder="Search posts"
        />
      </div>
    </div>
  </div>
  <div class="container">
    <div v-if="users.length">
      <div v-for="user in filterUsers" :key="user._id">
        <div class="container">
          <div class="card">
            <div class="card__header">
              <img
                :src="user.profile.default"
                alt="card__image"
                class="card__image"
                width="600"
              />
            </div>
            <div class="card__body">
              <h1>{{ user.username }}</h1>
              <h3>{{ user.email }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="m-5 center">Loading Users...</p>
      <div class="orbit-spinner">
        <div class="orbit"></div>
        <div class="orbit"></div>
        <div class="orbit"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      search: "",
    };
  },
  mounted() {
    fetch("https://the-anything-blog1.herokuapp.com/users", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.users = json;
      })
      .catch((err) => {
        alert(console.log(err));
      });
  },

  computed: {
    filterUsers() {
      return this.users.filter((user) => {
        return user.username.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.banner-search {
  justify-content: center;
  margin-right: 1.5rem;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin-block: 2rem;
  gap: 2rem;
}

img {
  max-width: 100%;
  display: block;
  object-fit: cover;
}

.card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.2);
  border-radius: 1em;
  background: #ece9e6;
  background: linear-gradient(to right, #ffffff, #ece9e6);
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
}

.card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tag {
  align-self: flex-start;
  padding: 0.25em 0.75em;
  border-radius: 1em;
  font-size: 0.75rem;
}

.tag + .tag {
  margin-left: 0.5em;
}

.tag-blue {
  background: #56ccf2;
  background: linear-gradient(to bottom, #2f80ed, #56ccf2);
  color: #fafafa;
}

.tag-brown {
  background: #d1913c;
  background: linear-gradient(to bottom, #ffd194, #d1913c);
  color: #fafafa;
}

.tag-red {
  background: #cb2d3e;
  background: linear-gradient(to bottom, #ef473a, #cb2d3e);
  color: #fafafa;
}

h3 {
  margin: 0 0 0.5rem 0;
  color: #999;
  font-size: 1.5rem;
  text-transform: capitalize;
}

h1 {
  font-size: 2.5rem;
  letter-spacing: 0.5px;
  color: #333;
}

p {
  font-size: 1rem;
  color: #333;
}

.card__footer {
  display: flex;
  padding: 1rem;
  margin-top: auto;
}

.user {
  display: flex;
  gap: 0.5rem;
}

.user__image {
  border-radius: 50%;
  max-height: 50px;
}

.user__info > small {
  color: #666;
}

.center {
  display: flex;
  justify-content: center;
}

.orbit-spinner {
  height: 55px;
  width: 55px;
  border-radius: 50%;
  perspective: 800px;
}

.orbit-spinner .orbit {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.orbit-spinner .orbit:nth-child(1) {
  left: 0%;
  top: 0%;
  animation: orbit-spinner-orbit-one-animation 1200ms linear infinite;
  border-bottom: 3px solid #130f40;
}

.orbit-spinner .orbit:nth-child(2) {
  right: 0%;
  top: 0%;
  animation: orbit-spinner-orbit-two-animation 1200ms linear infinite;
  border-right: 3px solid #130f40;
}

.orbit-spinner .orbit:nth-child(3) {
  right: 0%;
  bottom: 0%;
  animation: orbit-spinner-orbit-three-animation 1200ms linear infinite;
  border-top: 3px solid #130f40;
}

@keyframes orbit-spinner-orbit-one-animation {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-two-animation {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-three-animation {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>
