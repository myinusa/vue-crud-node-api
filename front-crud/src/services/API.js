import axios from "axios";

export const HTTP = axios.create({
  baseURL: "http://localhost:7070/api",
  headers: {
    "Content-type": "application/json"
  }
});

export default {
  getAllPosts() {
    //const url = `${API_URL}/api/posts/all`;
    return HTTP.get("/posts/all");
    //return axios.get(url);
  },

  get(id) {
    return HTTP.get(`/posts/${id}`);
  },

  create(data) {
    return HTTP.post("/posts/create", data);
  },

  update(id, data) {
    return HTTP.put(`/post/update/${id}`, data);
  },

  delete(id) {
    return HTTP.delete(`/post/delete/${id}`);
  },

  deleteAll() {
    return HTTP.delete(`/posts`);
  },

  findByTitle(title) {
    return HTTP.get(`/posts?title=${title}`);
  }
};
