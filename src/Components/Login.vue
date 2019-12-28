<template>
  <div class="body vh-100 d-flex align-items-center flex-column">
    <div id="login">
      <h2 class="mb-4 text-center mt-4 login-title">Inicio de sesión</h2>
      <div
        v-if="errorMessageLogin"
        class="alert alert-warning"
        role="alert"
      >{{errorMessageLogin.text}}</div>
      <form @submit.prevent="handleSubmit" method="GET">
        <fieldset>
          <p>
            <input
              type="text"
              placeholder="Ingrese su email"
              v-model="email"
            />
          </p>
          <!-- JS because of IE support; better: placeholder="Username" -->
          <p>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              v-model="password"
            />
          </p>
          <!-- JS because of IE support; better: placeholder="Password" -->
          <p>
            <button type="submit">
              <div v-if="!submitted">Ingresar</div>
              <div v-else class="spinner-border" role="status"> 
                <span class="sr-only">Loading...</span>
              </div>
            </button>
          </p>
          
          <p class="text-center">
            <router-link to="/register" class="register-message">¿Aún no tienes cuenta? Regístrate aquí</router-link>
          </p>
        </fieldset>
      </form>
      <hr>
      <p class="text-center register-message">
        O inicia sesión con
      </p>
      <div class="d-flex justify-content-center">
        <a class="social-logo" :href="linkFacebookAuth">
          <i class="fab fa-facebook-f" style="color: #0d47a1;"></i>
        </a>
        <a class="social-logo" :href="linkGoogleAuth">
          <i class="fab fa-google" style="color: #ef5350;"></i>
        </a>
      </div>
    </div>
    <vue-snotify></vue-snotify>
    <!-- end login -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import API from "../API/API";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
      linkGoogleAuth: `${API.url}/auth/google`,
      linkFacebookAuth: `${API.url}/auth/facebook`
    };
  },
  computed: {
    ...mapState("user", ["errorMessageLogin", "successMessageRegister"])
  },
  methods: {
    ...mapActions("user", [
      "login",
      "removeErrorMessageLogin",
      "removeSuccessMessageRegister"
    ]),
    async handleSubmit() {
      this.submitted = true;
      const { email, password } = this;
      await this.login({ email, password });
      this.submitted = false;
    },
    displayNotification(body, title) {
      this.$snotify.success(body, title);
    }
  },
  mounted() {
    if (this.successMessageRegister) {
      this.displayNotification(
        this.successMessageRegister.body,
        this.successMessageRegister.title
      );
    }
  },
  beforeDestroy() {
    if (this.errorMessageLogin) {
      this.removeErrorMessageLogin();
      this.submitted = false;
    }
    if (this.successMessageRegister) {
      this.removeSuccessMessageRegister();
    }
  }
};
</script>

<style scoped>
.body {
  color: #5a5656;
  font: 100%/1.5em "Open Sans", sans-serif;
  margin: 0;
  background-image: url("https://desktopwallpaper.live/wp-content/uploads/2019/06/soft-color-wallpapers-7.jpg");
  background-size: cover;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
a {
  text-decoration: none;
}
h1 {
  font-size: 1em;
}
h1,
p {
  margin-bottom: 10px;
}
strong {
  font-weight: bold;
}
.uppercase {
  text-transform: uppercase;
}
/* ---------- LOGIN ---------- */
#login {
  margin: auto;
  width: 300px;
}
.login-title{
  font-family: 'Pacifico', cursive;
  color: #1984C1;
}
.register-message{
  font-size: 13px;
  color: #008dde;
}
.register-message:hover{
  text-decoration: none;
  color: #077BBE;
}
.social-logo {
  background-color: #F5F0EF;
  border-radius: 50%;
  padding: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  -webkit-transition: transform .3s ease-in-out;
  -moz-transition:transform .3s ease-in-out;
  -ms-transition:transform .3s ease-in-out;
}
.social-logo:hover {
  background-color: #F9F6F5;
  transform: scale(1.05);
}
form fieldset input[type="text"],
input[type="password"] {
  background: #F5F0EF;
  border: none;
  border-radius: 10px;
  color: #423D3D;
  font-family: inherit;
  font-size: 14px;
  height: 50px;
  outline: none;
  padding: 0px 10px;
  width: 300px;
  -webkit-appearance: none;
}
form fieldset button[type="submit"] {
  background-color: #008dde;
  border: none;
  border-radius: 10px;
  color: #f4f4f4;
  cursor: pointer;
  font-family: inherit;
  height: 50px;
  text-transform: uppercase;
  width: 300px;
  -webkit-appearance: none;
  font-family: 'Nanum Pen Script';
}
form fieldset a:hover {
  text-decoration: underline;
}
.btn-round {
  background: #5a5656;
  border-radius: 50%;
  color: #f4f4f4;
  display: block;
  font-size: 12px;
  height: 50px;
  line-height: 50px;
  margin: 30px 125px;
  text-align: center;
  text-transform: uppercase;
  width: 50px;
}

.facebook-before {
  background: #0064ab;
  border-radius: 3px 0px 0px 3px;
  color: #f4f4f4;
  display: block;
  float: left;
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 50px;
}

.facebook {
  background: #0079ce;
  border: none;
  border-radius: 0px 3px 3px 0px;
  color: #f4f4f4;
  cursor: pointer;
  height: 50px;
  text-transform: uppercase;
  width: 250px;
}
@media (max-width: 425px) {
  .body {
    background: none;
  }
}
</style>