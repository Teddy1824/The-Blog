import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");

const menu_btn = document.querySelector(".menu");
const mobile = document.querySelector(".mobile-nav-items");
menu_btn.addEventListener("click", () => {
  menu_btn.classList.toggle("active");
  mobile.classList.toggle("active");
});

const collapse = document.querySelectorAll(".mobile");
collapse.forEach((element) => {
  element.addEventListener("click", () => {
    mobile.classList.toggle("active");
    menu_btn.classList.remove("active");
  });
});
