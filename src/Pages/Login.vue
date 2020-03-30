<template>
  <div class="background">
    <div class="login-card">
      <h2 class="login-card__title">Inicio de sesión</h2>
      <div
        v-if="errorMessageLogin"
        class="login-card__alert"
        role="alert"
      >{{errorMessageLogin.text}}</div>
      <form @submit.prevent="handleSubmit" method="GET">
        <fieldset>
          <p>
            <input v-model="email" class="form-input" type="text" placeholder="Ingrese su email" />
          </p>
          <p>
            <input
              v-model="password"
              class="form-input"
              type="password"
              placeholder="Ingrese su contraseña"
            />
          </p>
          <p>
            <button
              class="login-card__button"
              :class="isLoading"
              type="submit"
              :disabled="submitted"
            >
              <div v-if="!submitted">Ingresar</div>
              <div v-else class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </button>
          </p>

          <p class="not-registered">
            <router-link
              to="/register"
              class="not-registered__message"
            >¿Aún no tienes cuenta? Regístrate aquí</router-link>
          </p>
        </fieldset>
      </form>
      <hr />
      <p class="not-registered__message">O inicia sesión con</p>
      <div class="social">
        <a class="social__logo" :href="linkFacebookAuth">
          <i class="fab fa-facebook-f" style="color: #0d47a1;"></i>
        </a>
        <a class="social__logo" :href="linkGoogleAuth">
          <i class="fab fa-google" style="color: #ef5350;"></i>
        </a>
      </div>
    </div>
    <vue-snotify></vue-snotify>
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
    ...mapState("user", ["errorMessageLogin", "successMessageRegister"]),
    isLoading() {
      return this.submitted ? "disabled" : "";
    }
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
.background {
  color: #5a5656;
  font: 100%/1.5em "Open Sans", sans-serif;
  margin: 0;
  background-image: url("https://images.pexels.com/photos/917494/pexels-photo-917494.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=1920&w=1080");
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login-card {
  width: 300px;
}
.login-card__title {
  font-family: "Pacifico", cursive;
  color: #1984c1;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}
.login-card__alert {
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 0.75rem 1.25rem;
  color: #856405;
  background-color: #fff3ce;
  margin-bottom: 0.75rem;
}
.form-input {
  background: #f5f0ef;
  border: none;
  border-radius: 10px;
  color: #423d3d;
  font-family: inherit;
  font-size: 14px;
  height: 50px;
  outline: none;
  padding: 0px 10px;
  width: 300px;
  -webkit-appearance: none;
}
.login-card__button {
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
  font-family: "Nanum Pen Script";
}
.disabled {
  background-color: #c3c2c2 !important;
}
.not-registered {
  text-align: center;
}
.not-registered__message {
  font-size: 13px;
  color: #008dde;
  text-align: center;
}
.not-registered__message:hover {
  text-decoration: none;
  color: #077bbe;
}
.social {
  display: flex;
  justify-content: center;
}
.social__logo {
  background-color: #f5f0ef;
  border-radius: 50%;
  padding: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  text-decoration: none;
  -webkit-transition: transform 0.3s ease-in-out;
  -moz-transition: transform 0.3s ease-in-out;
  -ms-transition: transform 0.3s ease-in-out;
}
.social__logo:hover {
  background-color: #f9f6f5;
  transform: scale(1.05);
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
  .not-registered__message {
    color: #fff;
  }
}
</style>