<template>
  <div class="background">
    <div class="login-card">
      <h2 class="login-card__title">Inicio de sesión</h2>
      <div
        v-if="errorMessageLogin"
        class="login-card__alert"
        role="alert"
      >{{errorMessageLogin.message}}</div>
      <form @submit.prevent="handleSubmit" method="GET" class="form-container" autocomplete="off">
        <fieldset>
          <p class="username-container">
            <input
              id="username"
              v-model="email"
              class="form-input"
              type="email"
              autocomplete="false"
            />
            <label for="username" :class="checkEmptyEmail">Ingrese su email</label>
          </p>
          <p class="password-container">
            <input
              id="password"
              v-model="password"
              class="form-input"
              :type="!showPassword ? 'password' : 'text'"
              autocomplete="false"
            />
            <label for="password" :class="checkEmptyPassword">Ingrese su contraseña</label>
            <span class="show-password" @click="showPassword = !showPassword">
              <i class="fas fa-eye-slash" v-if="!showPassword"></i>
              <i class="fas fa-eye" v-else></i>
            </span>
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
      <!-- <div class="third-party-login">
        <p class="not-registered__message">O inicia sesión con</p>
        <div class="social">
          <a class="social__logo" :href="linkFacebookAuth">
            <i class="fab fa-facebook-f" style="color: #0d47a1;"></i>
          </a>
          <a class="social__logo" :href="linkGoogleAuth">
            <i class="fab fa-google" style="color: #ef5350;"></i>
          </a>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
//import API from "../API/API";
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
      /* linkGoogleAuth: `${API.url}/auth/google`,
      linkFacebookAuth: `${API.url}/auth/facebook`, */
      showPassword: false,
    };
  },
  computed: {
    ...mapState("user", ["errorMessageLogin", "successMessageRegister"]),
    isLoading() {
      return this.submitted ? "disabled" : "";
    },
    checkEmptyEmail() {
      return {
        "input-focus": this.email.trim(),
      };
    },
    checkEmptyPassword() {
      return {
        "input-focus": this.password.trim(),
      };
    },
  },
  methods: {
    ...mapActions("user", ["login", "removeSuccessMessageRegister"]),
    async handleSubmit() {
      this.submitted = true;
      const { email, password } = this;
      await this.login({ email, password });
      this.submitted = false;
      const redirect = this.$route.query.redirect || "";
      if (redirect) this.$router.push({ path: `${redirect}` });
      else this.$router.push({ name: "HomePage" });
    },
    displayNotification(body, title) {
      this.$snotify.success(body, title);
    },
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
    if (this.successMessageRegister) {
      this.removeSuccessMessageRegister();
    }
  },
};
</script>