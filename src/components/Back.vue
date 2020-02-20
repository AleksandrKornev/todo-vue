<template>
  <router-link
    :to="correctPath"
    class="back"
  >
    Назад
  </router-link>
</template>

<script>
export default {
  name: "Back",
  props: {
    path: {
      type: String
    }
  },
  computed: {
    correctPath() {
      const defaultRoute = "/";
      if (!this.path) return defaultRoute;

      return this.path;
    }
  }
}
</script>

<style lang="scss">
.back {
  position: absolute;
  left: 5%;
  top: 5%;
  padding: 15px 20px;
  border-radius: 10px;
  background: $back-background;
  text-decoration: none;
  transition: .4s;
  cursor: pointer;
  user-select: none;

  &:visited {
    color: inherit;
  }

  &:hover {
    background: $back-hover-background;
  }
}
  
</style>