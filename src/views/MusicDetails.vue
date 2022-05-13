<template>
  <div class="container">
    <div v-if="musics" class="row d-flex justify-content-center">
      <div class="container">
        <div class="card">
          <div class="card__header">
            <img
              :src="musics.main_image"
              alt="card__image"
              class="card__image"
              width="600"
            />
          </div>
          <div class="card__body">
            <span class="tag tag-blue">{{ musics.category }}</span>
            <h1>{{ musics.title }}</h1>
            <h3>{{ musics.subtitle }}</h3>
            <p>
              {{ musics.desc }}
            </p>
          </div>

          <div class="card__footer">
            <div class="user">
              <img
                :src="musics.user_image"
                alt="user__image"
                class="user__image"
              />
              <div class="user__info">
                <h5>{{ musics.created_by }}</h5>
              </div>
            </div>
          </div>
          <div class="make-button">
            <button
              color="black"
              aria-controls="exampleModal1"
              @click="exampleModal1 = true"
            >
              Update
            </button>
            <router-link
              :to="{
                name: 'musicblogs',
              }"
            >
              <button
                tag="a"
                href="#!"
                color="danger"
                @click.prevent="deleteBlog(musics._id)"
              >
                Delete
              </button>
            </router-link>
            <button
              color="black"
              onclick="history.back(-1)"
              class="link-button link-back-button"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="m-5">Loading musics...</p>
      <div class="orbit-spinner">
        <div class="orbit"></div>
        <div class="orbit"></div>
        <div class="orbit"></div>
      </div>
    </div>
  </div>

  <MDBModal
    id="exampleModal1"
    tabindex="-1"
    labelledby="exampleModalLabel1"
    v-model="exampleModal1"
  >
    <MDBModalHeader>
      <MDBModalTitle id="exampleModalLabel1">Update Blog</MDBModalTitle>
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
          <option value="music">music</option>
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
      <MDBBtn color="secondary" @click="exampleModal1 = false">Close</MDBBtn>
      <MDBBtn color="primary" @click="updateBlog()">Update</MDBBtn>
    </MDBModalFooter>
  </MDBModal>
</template>

<script>
import axios from "axios";
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
  props: ["id"],
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
      musics: null,
      main_image: "",
      title: "",
      subtitle: "",
      category: "",
      desc: "",
    };
  },

  mounted() {
    fetch("https://the-anything-blog1.herokuapp.com/music/" + this.id, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.musics = json;
      })
      .catch((err) => {
        alert(console.log(err));
      });
  },

  setup() {
    const exampleModal1 = ref(false);
    return {
      exampleModal1,
    };
  },

  methods: {
    updateBlog() {
      if (!localStorage.getItem("access")) {
        alert("User not logged in");
        return this.$router.push({ name: "signin" });
      }
      fetch("https://the-anything-blog1.herokuapp.com/music/" + this.id, {
        method: "PUT",
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
        .then((response) => response.json())
        .then((json) => {
          this.musics = json;
          alert("Blog Updated!");
          this.$router.push({ name: "musicblogs" });
          location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    },

    deleteBlog(id) {
      const config = {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      };
      let apiURL = `https://the-anything-blog1.herokuapp.com/music/${id}`;

      if (window.confirm("Do you really want to delete?")) {
        axios
          .delete(apiURL, config)
          .then(() => {
            alert("Blog Deleted!");
            this.$router.push({ name: "musicblogs" });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped>
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
  width: clamp(20rem, calc(20rem + 2vw), 22rem);
  overflow: hidden;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  background: #ece9e6;
  background: linear-gradient(to right, #ffffff, #ece9e6);
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

.make-button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
