<template>
  <footer>Copyright @ The Anything Blog 2022. All rights reserved.</footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  min-height: 50px;
  background-color: #130f40;
  font-size: 10px;
  font-weight: 600;
  color: white;
}
@media screen and (max-width: 600px) {
  footer {
    min-height: 35px;
  }
}
</style>
