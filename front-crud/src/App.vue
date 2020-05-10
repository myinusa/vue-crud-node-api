<template>
  <div id="app">
    <b-navbar type="dark" variant="primary">
      <a href="#" class="navbar-brand">CRUD TABLE</a>
      <div class="navbar-nav mr-auto">
        <!-- <li class="nav-item">
          <a href="/posts-table" class="nav-link">Posts</a>
        </li> -->
      </div>
    </b-navbar>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
