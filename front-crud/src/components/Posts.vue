<template>
  <div v-if="currentPost" class="edit-form">
    <h4>Post</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentPost.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentPost.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentPost.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentPost.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deletePost">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updatePost">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Post...</p>
  </div>
</template>

<script>
import API from "../services/API";

export default {
  name: "post",
  data() {
    return {
      currentPost: null,
      message: ""
    };
  },
  methods: {
    getPost(id) {
      API.get(id)
        .then(response => {
          this.currentPost = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentPost.id,
        title: this.currentPost.title,
        description: this.currentPost.description,
        published: status
      };

      API.update(this.currentPost.id, data)
        .then(response => {
          this.currentPost.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePost() {
      API.update(this.currentPost.id, this.currentPost)
        .then(response => {
          console.log(response.data);
          this.message = "The post was updated successfully!";
        })
        .catch(e => {
          console.log(e);
        });
    },

    deletePost() {
      API.delete(this.currentPost.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "posts" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = "";
    this.getPost(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
