<template>
  <section class="home">
    <header class="home-header">
      <h1>The Anything Blog.</h1>
    </header>
    <div class="home-banner">
      <div class="mobile-banner-menu">
        <div class="menu">
          <div class="bar"></div>
        </div>
      </div>
    </div>
  </section>
  <div class="home-description">
    <h2>
      Welcome to The Anything Blog. A blogging platform built by young
      developers with a passion for the new age culture.
    </h2>
    <div class="featured">
      <header class="featured-header">
        <h2>Featured Blogs</h2>
      </header>
      <!-- Math.round(blogs.length*Math.random()) -->
      <div class="blog-posts">
        <div class="posts">
          <div v-if="games.length">
            <div
              v-for="game in games.slice(0, 1)"
              :key="game._id"
              class="justify-center"
            >
              <div class="card">
                <div class="card__header">
                  <img
                    :src="game.main_image"
                    alt="card__image"
                    class="card__image"
                    width="600"
                  />
                </div>
                <div class="card__footer">
                  <div class="user">
                    <img
                      :src="game.user_image"
                      alt="user__image"
                      class="user__image"
                    />
                    <div class="user__info">
                      <h5>{{ game.created_by }}</h5>
                    </div>
                    <router-link
                      :to="{
                        name: 'gamingblogs',
                      }"
                    >
                      <div class="make-button">
                        <button>View</button>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="posts">
          <div v-if="lifestyles.length">
            <div
              v-for="lifestyle in lifestyles.slice(0, 1)"
              :key="lifestyle._id"
              class="justify-center"
            >
              <div class="card">
                <div class="card__header">
                  <img
                    :src="lifestyle.main_image"
                    alt="card__image"
                    class="card__image"
                    width="600"
                  />
                </div>
                <div class="card__footer">
                  <div class="user">
                    <img
                      :src="lifestyle.user_image"
                      alt="user__image"
                      class="user__image"
                    />
                    <div class="user__info">
                      <h5>{{ lifestyle.created_by }}</h5>
                    </div>
                    <router-link
                      :to="{
                        name: 'lifestyleblogs',
                      }"
                    >
                      <div class="make-button">
                        <button>View</button>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="posts">
          <div v-if="music.length">
            <div
              v-for="musics in music.slice(0, 1)"
              :key="musics._id"
              class="justify-center"
            >
              <div class="card">
                <div class="card__header">
                  <img
                    :src="musics.main_image"
                    alt="card__image"
                    class="card__image"
                    width="600"
                  />
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
                    <router-link
                      :to="{
                        name: 'musicblogs',
                      }"
                    >
                      <div class="make-button">
                        <button>View</button>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="posts">
          <div v-if="tech.length">
            <div
              v-for="techs in tech.slice(0, 1)"
              :key="techs._id"
              class="justify-center"
            >
              <div class="card">
                <div class="card__header">
                  <img
                    :src="techs.main_image"
                    alt="card__image"
                    class="card__image"
                    width="600"
                  />
                </div>
                <div class="card__footer">
                  <div class="user">
                    <img
                      :src="techs.user_image"
                      alt="user__image"
                      class="user__image"
                    />
                    <div class="user__info">
                      <h5>{{ techs.created_by }}</h5>
                      <router-link
                        :to="{
                          name: 'techblogs',
                        }"
                      >
                        <div class="make-button">
                          <button>View</button>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="catergory">
      <header class="catergory-header">
        <h2>Catergory</h2>
      </header>
      <div class="catergory-container">
        <router-link
          :to="{
            name: 'gamingblogs',
          }"
        >
          <div class="item img1">
            <h3>GAMING</h3>
          </div>
        </router-link>
        <router-link
          :to="{
            name: 'lifestyleblogs',
          }"
        >
          <div class="item img2">
            <h3>LIFESTYLE</h3>
          </div>
        </router-link>
        <router-link
          :to="{
            name: 'musicblogs',
          }"
        >
          <div class="item img3">
            <h3>MUSIC</h3>
          </div>
        </router-link>
        <router-link
          :to="{
            name: 'techblogs',
          }"
        >
          <div class="item img4">
            <h3>TECH</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <Contact />
</template>

<script>
import Contact from "@/components/Contact.vue";
export default {
  name: "HomeView",
  components: {
    Contact,
  },
  data() {
    return {
      games: [],
      lifestyles: [],
      music: [],
      tech: [],
    };
  },

  mounted() {
    fetch("https://the-anything-blog1.herokuapp.com/games", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.games = json;
      });
    fetch("https://the-anything-blog1.herokuapp.com/lifestyles", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.lifestyles = json;
      });
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
    fetch("https://the-anything-blog1.herokuapp.com/tech", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.tech = json;
      });
  },
};
</script>
<style scoped>
.home {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 80vh;
  background-color: #cdcdcd;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("https://images.unsplash.com/photo-1540651810471-5699df74834f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.home-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
}
.home-header h1 {
  text-align: center;
  font-size: 64px;
  font-weight: 700;
  padding: 0;
  margin: 0;
  color: #ffffff;
}
.home-banner {
  position: absolute;
  bottom: 0;
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
.home-description {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 5rem;
}
.home-description h2 {
  width: 80%;
  margin-top: 2rem;
  margin-bottom: 0;
  font-size: 48px;
  font-weight: 700;
  padding: 0;
  color: #1f1f1f;
  text-align: center;
}
.featured,
.catergory {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 1.5rem;
}
.featured-header,
.catergory-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}
.featured-header h2,
.catergory-header h2 {
  width: 80%;
  font-size: 32px;
  font-weight: 700;
  padding: 0;
  margin: 0;
  color: #1f1f1f;
  text-align: center;
}
.blog-posts {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  gap: 1.5rem;
}

.posts {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: 250px;
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
  min-width: 10px;
  padding: 8px 10px;
  border: none;
  border-radius: 3px;
  font-weight: 600;
  font-size: 10px;
  background-color: #7ed6df;
  color: #130f40;
}

.container {
  border-radius: 1em;
  background: #ece9e6;
  background: linear-gradient(to right, #ffffff, #ece9e6);
}

img {
  border-radius: 1em;
  max-width: 100%;
  max-height: 150px;
  display: block;
  object-fit: cover;
}

.card {
  max-height: 50%;
  max-width: 110%;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.2);
  border-radius: 1em;
  background: #ece9e6;
  background: linear-gradient(to right, #ffffff, #ece9e6);
}

.card__footer {
  display: flex;
  padding: 1rem;
  margin-top: auto;
  max-width: 100%;
  max-height: 100px;
}

.user {
  display: flex;
  gap: 0.5rem;
}

.user__image {
  border-radius: 50%;
  max-height: 40px;
}

.user__info > small {
  color: #666;
}

.catergory-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 200px;
  gap: 1.5rem;
  width: 80%;
  margin-bottom: 5rem;
}
.item {
  background-color: #cdcdcd;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

/* .item > p {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  background: rgba(0, 0, 0, 10%);
  margin-top: -25px;
  font-size: 10px;
  font-weight: 700;
  color: white;
} */

.item > h3 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 19vh;
  width: 90%;
  background: rgba(0, 0, 0, 1%);
  font-size: 35px;
  font-weight: 700;
  color: white;
}

.img1 {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  background-image: url("https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.img2 {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  background-image: url("https://images.unsplash.com/photo-1443916568596-df5a58c445e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.img3 {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  background-image: url("https://images.unsplash.com/photo-1461784180009-21121b2f204c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.img4 {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  background-image: url("https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

@media screen and (max-width: 1100px) {
  .home-description h2 {
    text-align: center;
    font-size: 40px;
  }
  .home-description {
    gap: 1rem;
  }
}
@media screen and (max-width: 800px) {
  .featured-header h2,
  .catergory-header h2 {
    width: 100%;
    font-size: 32px;
    font-weight: 700;
    color: #1f1f1f;
    text-align: center;
    margin: 0;
  }
  .home-description h2 {
    width: 95%;
  }
  .blog-posts,
  .catergory-container {
    width: 95%;
  }
  .catergory-container {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  .blog-posts {
    flex-direction: column;
  }
  .posts {
    width: 100%;
    height: 400px;
  }
}
@media screen and (max-width: 600px) {
  .home-header h1 {
    font-size: 40px;
  }
  .home-description h2 {
    text-align: center;
    font-size: 28px;
    margin-top: 2rem;
    margin-bottom: 0;
    width: 95%;
  }
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
  .featured-header h2,
  .catergory-header h2 {
    margin: 0;
  }
}
</style>
