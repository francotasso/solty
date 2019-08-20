<template>
  <div class="body vh-100 d-flex align-items-center flex-column">
    <div id="login">
      <h2 class="mb-4 text-center">Inicio de sesión</h2>
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
              value="Username"
              onBlur="if(this.value=='')this.value='Username'"
              onFocus="if(this.value=='Username')this.value='' "
              placeholder="Ingrese su email"
              v-model="email"
            />
          </p>
          <!-- JS because of IE support; better: placeholder="Username" -->
          <p>
            <input
              type="password"
              value="Password"
              onBlur="if(this.value=='')this.value='Password'"
              onFocus="if(this.value=='Password')this.value='' "
              placeholder="Ingrese su contraseña"
              v-model="password"
            />
          </p>
          <!-- JS because of IE support; better: placeholder="Password" -->
          <p>
            <input type="submit" value="Ingresar" />
          </p>
          <p>
            <router-link to="/register">Regístrate</router-link>
          </p>
        </fieldset>
      </form>
      <p>
        <span class="btn-round">or</span>
      </p>
      <p>
        <a class="facebook-before">
          <span class="fontawesome-facebook"></span>
        </a>
        <button class="facebook">Login Using Facebook</button>
      </p>
    </div>
    <footer class="text-white">
      <p>By Franco Tasso © - 2019 - Lima Perú</p>
    </footer>
    <vue-snotify></vue-snotify>
    <!-- end login -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      submitted: false
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
    handleSubmit() {
      this.submitted = true;
      const { email, password } = this;
      this.login({ email, password });
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
  background-image: url("https://wallpapercart.com/wp-content/uploads/2019/05/Movie-Toy-Story-4-Woody-HD-Wallpaper.jpg");
  background-size: cover;
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
form fieldset input[type="text"],
input[type="password"] {
  background: #e5e5e5;
  border: none;
  border-radius: 3px;
  color: #5a5656;
  font-family: inherit;
  font-size: 14px;
  height: 50px;
  outline: none;
  padding: 0px 10px;
  width: 300px;
  -webkit-appearance: none;
}
form fieldset input[type="submit"] {
  background-color: #008dde;
  border: none;
  border-radius: 3px;
  color: #f4f4f4;
  cursor: pointer;
  font-family: inherit;
  height: 50px;
  text-transform: uppercase;
  width: 300px;
  -webkit-appearance: none;
}
form fieldset a {
  color: #5a5656;
  font-size: 10px;
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
