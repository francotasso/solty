<template>
  <div class="loading-wrapper">
    <div :id="'loading-'+ _uid" class="loading"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Loading",
  data() {
    return {
    };
  },
  methods: {
    checkIfLoggedIn() {
      axios.get('auth/check', { withCredentials: true }).then(response => {
        const user = response.data.user;
        localStorage.setItem("googleUp", true);
      });
    }
  }
};
</script>
