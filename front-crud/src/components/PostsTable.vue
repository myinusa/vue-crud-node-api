<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-sm-10">
        <h2>Manage Posts</h2>
      </div>

      <div class="ml-md-5">
        <b-button
          size="lg"
          variant=""
          class="mb-2"
          @click.prevent="populatePostToEdit(post)"
        >
          <b-icon icon="plus-circle" aria-hidden="true"></b-icon>
        </b-button>
      </div>

      <!-- -->
      <b-modal
        ref="my-modal-create"
        hide-footer
        :header-bg-variant="headerBgVariant"
        :header-text-variant="headerTextVariant"
      >
        <form @submit.prevent="savePost">
          <b-form-group label="Title">
            <b-form-input type="text" v-model="model.title"></b-form-input>
          </b-form-group>
          <b-form-group label="Body">
            <b-form-textarea
              rows="4"
              v-model="model.description"
            ></b-form-textarea>
          </b-form-group>
          <div>
            <b-btn size="lg" type="submit" variant="success">
              <b-icon icon="check" aria-hidden="true"></b-icon>
            </b-btn>
          </div>
        </form>
      </b-modal>
      <!-- -->
    </div>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.description }}</td>
              <td>
                <b-button
                  size="lg"
                  variant="primary"
                  @click.prevent="populatePostToEdit(post)"
                >
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                </b-button>
              </td>
              <td>
                <b-button
                  size="lg"
                  variant="danger"
                  @click.prevent="deletePost(post.id)"
                >
                  <b-icon icon="x-circle" aria-hidden="true"></b-icon>
                  <span class="sr-only">Help</span>
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>

      <!-- -->
      <b-modal
        ref="my-modal"
        hide-footer
        :title="model.id ? 'Edit Post ID #' + model.id : 'New Post'"
        :header-bg-variant="headerBgVariant"
        :header-text-variant="headerTextVariant"
      >
        <form @submit.prevent="savePost">
          <b-form-group label="Title">
            <b-form-input type="text" v-model="model.title"></b-form-input>
          </b-form-group>
          <b-form-group label="Body">
            <b-form-textarea
              rows="4"
              v-model="model.description"
            ></b-form-textarea>
          </b-form-group>
          <div>
            <b-btn size="lg" type="submit" variant="success">
              <b-icon icon="check" aria-hidden="true"></b-icon>
            </b-btn>
          </div>
        </form>
      </b-modal>
      <!-- -->
    </b-row>
  </div>
</template>

<script>
import API from "../services/API";
export default {
  name: "posts-table",
  data() {
    return {
      headerBgVariant: "dark",
      headerTextVariant: "light",
      posts: [],
      model: {},
    };
  },

  async mounted() {
    this.refreshPosts();
  },
  methods: {
    retrievePosts() {
      API.getAllPosts()
        .then((response) => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    showModal() {
      this.$refs["my-modal"].show();
    },
    showModalCreate() {
      this.$refs["my-modal-create"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },

    async refreshPosts() {
      this.retrievePosts();
    },
    async populatePostToEdit(post) {
      this.showModal();
      this.model = Object.assign({}, post);
    },
    async savePost() {
      if (this.model.id) {
        await API.update(this.model.id, this.model);
      } else {
        await API.create(this.model);
      }
      this.model = {}; // reset form
      this.$refs["my-modal"].hide();

      await this.refreshPosts();
    },
    async deletePost(id) {
      if (confirm("Are you sure you want to delete this post?")) {
        // if we are editing a post we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {};
        }
        await API.delete(id);
        await this.refreshPosts();
      }
    },
  },
};
</script>
