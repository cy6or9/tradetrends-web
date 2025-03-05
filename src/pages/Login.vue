<template>
    <div class="container mt-4">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" v-model="email" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { auth } from "../firebase-config";
  import { signInWithEmailAndPassword } from "firebase/auth";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      login() {
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            this.$router.push("/");
          })
          .catch((error) => {
            alert(error.message);
          });
      },
    },
  };
  </script>
  