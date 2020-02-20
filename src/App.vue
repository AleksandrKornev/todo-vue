<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "App",
  created() {
    this.INIT();
  },
  methods: {
    ...mapMutations({
      INIT: "INIT"
    })
  }
}
</script>

<style lang="scss">
body {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  margin: 0;
}

#app {
  position: absolute;
  width: 100%;
  height: 100%;
  font-family: sans-serif;
  text-align: center;
  background: $app-background;
  color: $app-color;
}
</style>
