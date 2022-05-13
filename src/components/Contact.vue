<template>
  <section class="footer">
    <div class="contact-wrapper">
      <header class="contact-header">
        <h2>Have something on your mind? Don't be shy, contact us.</h2>
      </header>
      <div class="form-wrapper">
        <form @submit.prevent="handleSubmit()" class="contact-form">
          <div class="form-control">
            <label for="email">Email</label>
            <input type="email" v-model="email" name="email" />
          </div>
          <div class="form-control">
            <label for="message">Message</label>
            <textarea name="message" v-model="message"></textarea>
          </div>
          <div class="form-button">
            <button type="submit" class="submit-btn">Send</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      email: "",
      message: "",
    };
  },

  methods: {
    handleSubmit() {
      fetch("https://the-anything-blog.herokuapp.com/contact", {
        method: "POST",
        body: JSON.stringify({
          email: this.email,
          message: this.message,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.contact = data;
          alert("Message sent!");
          this.$router.push({ name: "home" });
          location.reload();
        })
        .catch((err) => {
          alert("Message not sent!");
        });
    },
  },
};
</script>

<style scoped>
.footer {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 65vh;
  background-color: #130f40;
}
.contact-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 1.5rem;
  width: 80%;
}
.contact-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin: 0;
  flex-shrink: 1;
}
.contact-header h2 {
  font-size: 64px;
  font-weight: 700;
  padding: 0;
  margin: 0;
  color: white;
}
.form-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  width: 40%;
}
.contact-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  min-width: 250px;
  background-color: #130f40;
  padding: 20px 30px;
}
.form-control {
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
.form-button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.contact-form input,
textarea {
  border: none;
  outline: none;
  width: 100%;
}
textarea {
  min-height: 150px;
}
input {
  min-height: 30px;
}
label {
  font-size: 12px;
  font-weight: 600;
  color: white;
  margin: 0;
}
button {
  min-width: 100px;
  padding: 8px 10px;
  border: none;
  border-radius: 3px;
  font-weight: 700;
  font-size: 10px;
  background-color: #7ed6df;
  color: #130f40;
}
@media screen and (max-width: 1100px) {
  .contact-wrapper {
    flex-direction: column;
    margin: 2rem 0;
    gap: 2rem;
  }
  .contact-header {
    width: 100%;
    justify-content: center;
  }
  .contact-header h2 {
    font-size: 40px;
    text-align: center;
  }
  .form-wrapper {
    width: 100%;
    justify-content: center;
  }
  .contact-form {
    min-width: 400px;
  }
}
@media screen and (max-width: 600px) {
  .contact-wrapper {
    width: 100%;
    flex-direction: column;
    margin: 2rem 0;
    gap: 1rem;
  }
  .contact-header {
    width: 90%;
    justify-content: center;
  }
  .contact-header h2 {
    font-size: 28px;
    text-align: center;
  }
  .form-wrapper {
    width: 100%;
    justify-content: center;
  }
  .contact-form {
    min-width: 80%;
    padding: 10px 20px;
  }
  textarea {
    min-height: 100px;
  }
}
</style>
