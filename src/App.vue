<template>
  <div id="app">
      <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <router-link to="/"><b-navbar-brand>Listing Website</b-navbar-brand></router-link>
      </b-navbar>
      <br><br>
      <router-view ></router-view>

  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
