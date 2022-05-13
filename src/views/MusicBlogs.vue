<template>
  <section class="banner-section">
    <header class="text-banner">
      <h3>MUSIC</h3>
    </header>
  </section>
  <MDBModal
    id="exampleModal2"
    tabindex="-1"
    labelledby="exampleModalLabel2"
    v-model="exampleModal2"
  >
    <MDBModalHeader>
      <MDBModalTitle id="exampleModalLabel2"> Create Blog </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          class="form-control"
          type="text"
          name="title"
          id="title"
          v-model="title"
        />
      </div>
      <div class="mb-3">
        <label for="subtitle" class="form-label">Subtitle</label>
        <input
          class="form-control"
          type="text"
          name="subtitle"
          id="subtitle"
          v-model="subtitle"
        />
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <select
          class="form-select"
          name="category"
          id="category"
          v-model="category"
        >
          <option value="Music">Music</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Image URL</label>
        <input
          class="form-control"
          type="text"
          name="image"
          id="image"
          v-model="main_image"
        />
      </div>
      <div class="mb-3">
        <label for="desc" class="form-label">Description</label>
        <input
          class="form-control"
          type="text"
          name="desc"
          id="desc"
          v-model="desc"
        />
      </div>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="exampleModal2 = false">Close</MDBBtn>
      <MDBBtn color="primary" @click="createBlog()">Create</MDBBtn>
    </MDBModalFooter>
  </MDBModal>
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
        name="search"
        v-model="search"
        placeholder="Search posts"
      />
    </div>

    <div class="banner-search make-button">
      <button
        color="black"
        aria-controls="exampleModal2"
        @click="exampleModal2 = true"
      >
        Create Blog
      </button>
    </div>
  </div>
  <div class="container flex">
    <div v-if="music.length">
      <div
        v-for="musics in filtermusic"
        :key="musics._id"
        class="grid grid-cols-3 grid-rows-3 md:grid-cols-6 sm:grid-cols-12 grid-flow-row justify-center"
      >
        <div class="container"></div>
        <div class="card center">
          <div
            class="img-container"
            :style="{
              background: `url(${musics.main_image})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }"
          ></div>
          <div class="card-content">
            <h1>{{ musics.title }}</h1>
            <h2>{{ musics.subtitle }}</h2>
            <p class="excerpt">{{ musics.desc }}</p>
            <p class="author">
              <img
                :src="musics.user_image"
                alt="user__image"
                class="user__image"
              />{{ musics.created_by }}
              <router-link
                :to="{
                  name: 'musicdetails',
                  params: {
                    id: musics._id,
                  },
                }"
              >
                <div class="make-button">
                  <button>View Blog</button>
                </div>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="m-5 center">Loading music...</p>
      <div class="orbit-spinner">
        <div class="orbit"></div>
        <div class="orbit"></div>
        <div class="orbit"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
} from "mdb-vue-ui-kit";
import { ref } from "vue";
export default {
  components: {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
  },
  data() {
    return {
      music: [],
      title: "",
      subtitle: "",
      desc: "",
      category: "",
      main_image: "",
      search: "",
      exampleModal2: "",
    };
  },

  mounted() {
    console.log("Mounting");
    fetch("https://the-anything-blog1.herokuapp.com/music", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.music = json;
      });
  },

  setup() {
    const exampleModal2 = ref(false);
    return {
      exampleModal2,
    };
  },

  computed: {
    filtermusic() {
      return this.music.filter((musics) => {
        return musics.title.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },

  methods: {
    // Create Product
    createBlog() {
      if (!localStorage.getItem("access")) {
        alert("User not logged in");
        return this.$router.push({ name: "signin" });
      }
      fetch("https://the-anything-blog1.herokuapp.com/music/music", {
        method: "POST",
        body: JSON.stringify({
          main_image: this.main_image,
          title: this.title,
          subtitle: this.subtitle,
          desc: this.desc,
          category: this.category,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          alert("Blog created!");
          location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>

<style scoped>
.banner-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  margin: 0;
  padding: 0;
  background-image: url("https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.text-banner {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 50vh;
  background: rgba(0, 0, 0, 10%);
}

.text-banner h3 {
  font-size: 60px;
  font-weight: 700;
  color: white;
}

.home-banner {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: row;
  gap: 1.5rem;
  min-height: 50px;
  background-color: #130f40;
}

.banner-search {
  justify-content: center;
  margin-right: 1.5rem;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
}

.banner-search {
  font-size: 10px;
  font-weight: 400;
  color: #1f1f1f;
}

.banner-search input {
  border: none;
  outline: none;
  border-radius: 3px;
  min-width: 200px;
  padding: 5px;
  color: #1f1f1f;
  text-align: center;
  box-shadow: 0px 4px 4px 0px #130f40;
}

.banner-search input::placeholder {
  font-weight: 700;
  font-size: 12px;
}

.banner-search h2 {
  color: #fff;
}

.make-button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  gap: 1rem;
}

button {
  min-width: 100px;
  padding: 8px 10px;
  border: none;
  border-radius: 3px;
  font-weight: 600;
  font-size: 10px;
  background-color: #7ed6df;
  color: #130f40;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin-block: 2rem;
  gap: 2rem;
  padding-left: 340px;
}

/* img {
  max-width: 100%;
  display: block;
  object-fit: cover;
}

.card {
  display: flex;
  flex-direction: column;
  width: clamp(20rem, calc(20rem + 2vw), 22rem);
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
} */

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

.orbit-spinner,
.orbit-spinner * {
  box-sizing: border-box;
  margin: auto;
  width: 50%;
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

@media screen and (max-width: 600px) {
  .banner-search {
    width: 100%;
    justify-content: center;
  }
  .banner-search input {
    min-width: 100px;
    gap: 1.5rem;
  }
  .banner-search h2 {
    font-size: 12px;
  }
}

/* .container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
} */
.card {
  background-color: #fff;
  max-width: 800px;
  box-shadow: 2px 2px 5px #9e9e9e, -1px -1px 5px #9e9e9e;
  border-radius: 3px;
  display: grid;
  grid-template-column: repeat(5, 1fr);
}
.card .img-container {
  width: 230px;
  /* height: 300px; */
  grid-column: 2;

  /* background-image: url('https://www.dropbox.com/s/7d5qt5wb2xpqeww/city-street.jpg?raw=1');
  background-size: cover;
  background-position: center center; */
}
/* .card .img{
  height: 600px;
} */
.card-content {
  grid-column: 3 / 5;
  padding: 10px 30px;
  border-left: 1px solid #ccc;
}
h2 {
  text-transform: uppercase;
  color: #555;
}
h1 {
  margin-bottom: 0;
}
/* .card-content .author {
  border-top: 1px solid #cdcdcd;
  font-weight: 700;
  margin-top: 25px;
  padding: 25px 0 10px 0;
  color: #555;
} */
@media only screen and (max-width: 600px) {
  .card {
    display: block;
  }
  .card .img-container {
    height: 250px;
    width: 100%;
  }
  .card-content {
    border: 0;
    border-top: 1px solid #ccc;
  }
}
</style>
